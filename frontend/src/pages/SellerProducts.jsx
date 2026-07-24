import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import api from "../services/api";

import Loader from "../components/common/Loader";
import ConfirmModal from "../components/common/ConfirmModal";

function SellerProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await api.get("/services/my-products");

      setProducts(res.data.products);

    } catch (err) {
      console.error(err);

      toast.error("Failed to load products.");

    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedProduct) return;

    try {
      setDeleting(true);

      const res = await api.delete(
        `/services/${selectedProduct}`
      );

      toast.success(res.data.message);

      fetchProducts();

      setIsModalOpen(false);
      setSelectedProduct(null);

    } catch (err) {
      console.error(err);

      toast.error(
        err.response?.data?.message ||
          "Delete failed."
      );

    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <div>

        <div className="mb-8 flex items-center justify-between">

          <div>

            <h1 className="text-4xl font-bold">
              My Products
            </h1>

            <p className="mt-2 text-slate-500">
              Manage all your uploaded products.
            </p>

          </div>

          <Link
            to="/seller/add-product"
            className="rounded-lg bg-blue-600 px-5 py-3 text-white transition hover:bg-blue-700"
          >
            + Add Product
          </Link>

        </div>

        {products.length === 0 ? (

          <div className="rounded-3xl bg-white py-20 text-center shadow">

            <div className="text-7xl">
              📦
            </div>

            <h2 className="mt-6 text-4xl font-bold">
              No Products Yet
            </h2>

            <p className="mt-3 text-slate-500">
              Start by adding your first digital product.
            </p>

            <Link
              to="/seller/add-product"
              className="mt-8 inline-block rounded-xl bg-blue-600 px-8 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              Add Product
            </Link>

          </div>

        ) : (

          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

            {products.map((product) => (

              <div
                key={product._id}
                className="overflow-hidden rounded-2xl bg-white shadow transition duration-300 hover:-translate-y-2 hover:shadow-xl"
              >

                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="h-52 w-full object-cover"
                  onError={(e) => {
                    e.target.src =
                      "https://placehold.co/600x400?text=No+Image";
                  }}
                />

                <div className="p-5">

                  <h2 className="text-xl font-bold">
                    {product.title}
                  </h2>

                  <p className="mt-2 line-clamp-2 text-slate-500">
                    {product.description}
                  </p>

                  <div className="mt-4 flex justify-between">

                    <span className="rounded bg-blue-100 px-3 py-1 text-blue-700">
                      {product.category}
                    </span>

                    <span className="font-bold text-green-600">
                      ₹{product.price}
                    </span>

                  </div>

                  <div className="mt-6 flex gap-3">

                    <Link
                      to={`/seller/edit-product/${product._id}`}
                      className="flex-1 rounded-lg bg-yellow-500 py-2 text-center font-semibold text-white transition hover:bg-yellow-600"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() => {
                        setSelectedProduct(product._id);
                        setIsModalOpen(true);
                      }}
                      className="flex-1 rounded-lg bg-red-600 py-2 font-semibold text-white transition hover:bg-red-700"
                    >
                      Delete
                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

      <ConfirmModal
        isOpen={isModalOpen}
        title="Delete Product?"
        message="This action cannot be undone. Are you sure you want to delete this product?"
        loading={deleting}
        onCancel={() => {
          setIsModalOpen(false);
          setSelectedProduct(null);
        }}
        onConfirm={handleDelete}
      />
    </>
  );
}

export default SellerProducts;