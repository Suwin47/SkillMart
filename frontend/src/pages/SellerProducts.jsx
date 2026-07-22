import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../services/api";

function SellerProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      const res = await api.delete(`/services/${id}`);

      toast.success(res.data.message);

      fetchProducts();
    } catch (err) {
      console.error(err);

      toast.error(
        err.response?.data?.message || "Delete failed."
      );
    }
  };

  if (loading) {
    return (
      <div className="text-center text-xl font-semibold">
        Loading Products...
      </div>
    );
  }

  return (
    <div>

      <div className="mb-8 flex items-center justify-between">

        <h1 className="text-4xl font-bold">
          My Products
        </h1>

        <Link
          to="/seller/add-product"
          className="rounded-lg bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
        >
          + Add Product
        </Link>

      </div>

      {products.length === 0 ? (

        <div className="rounded-xl bg-white p-12 text-center shadow">

          <h2 className="text-2xl font-semibold">
            No Products Yet
          </h2>

          <p className="mt-3 text-slate-500">
            Start by adding your first product.
          </p>

        </div>

      ) : (

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

          {products.map((product) => (

            <div
              key={product._id}
              className="overflow-hidden rounded-2xl bg-white shadow transition hover:shadow-lg"
            >

              <img
                src={product.thumbnail}
                alt={product.title}
                className="h-52 w-full object-cover"
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
                    className="flex-1 rounded-lg bg-yellow-500 py-2 text-center font-semibold text-white hover:bg-yellow-600"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => handleDelete(product._id)}
                    className="flex-1 rounded-lg bg-red-600 py-2 font-semibold text-white hover:bg-red-700"
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
  );
}

export default SellerProducts;