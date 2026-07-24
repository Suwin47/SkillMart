import { useEffect, useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";

import {
  Search,
  Trash2,
  Package,
} from "lucide-react";

import ConfirmModal from "../components/common/ConfirmModal";

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await api.get("/admin/products");

      setProducts(res.data.products);

    } catch (err) {
      console.error(err);

      toast.error("Unable to load products.");
    }
  };

  const deleteProduct = async () => {
    if (!selectedProduct) return;

    try {
      setDeleting(true);

      const res = await api.delete(
        `/admin/products/${selectedProduct}`
      );

      toast.success(res.data.message);

      fetchProducts();

      setIsModalOpen(false);
      setSelectedProduct(null);

    } catch (err) {
      console.error(err);

      toast.error(
        err.response?.data?.message ||
          "Unable to delete product."
      );

    } finally {
      setDeleting(false);
    }
  };

  const filteredProducts = products.filter((product) =>
    product.title
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <>
      <div className="space-y-6">

        <div className="flex items-center justify-between">

          <div>

            <h1 className="text-3xl font-bold">
              Products
            </h1>

            <p className="text-slate-500">
              Manage all marketplace products.
            </p>

          </div>

          <div className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-white">

            <Package size={20} />

            {filteredProducts.length}

          </div>

        </div>

        {/* Search */}

        <div className="relative">

          <Search
            size={18}
            className="absolute left-4 top-4 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full rounded-xl border py-3 pl-12 pr-4"
          />

        </div>

        {/* Table */}

        <div className="overflow-hidden rounded-xl bg-white shadow">

          <table className="w-full">

            <thead className="bg-slate-100">

              <tr>

                <th className="p-4 text-left">
                  Product
                </th>

                <th>Seller</th>

                <th>Category</th>

                <th>Price</th>

                <th>Action</th>

              </tr>

            </thead>

            <tbody>

              {filteredProducts.map((product) => (

                <tr
                  key={product._id}
                  className="border-t"
                >

                  <td className="p-4">

                    <div className="flex items-center gap-3">

                      <img
                        src={product.thumbnail}
                        alt={product.title}
                        className="h-14 w-20 rounded-lg object-cover"
                        onError={(e) => {
                          e.target.src =
                            "https://placehold.co/120x80?text=No+Image";
                        }}
                      />

                      <div>

                        <p className="font-semibold">
                          {product.title}
                        </p>

                      </div>

                    </div>

                  </td>

                  <td>
                    {product.seller?.fullName}
                  </td>

                  <td>
                    {product.category}
                  </td>

                  <td>
                    ₹{product.price}
                  </td>

                  <td>

                    <button
                      onClick={() => {
                        setSelectedProduct(
                          product._id
                        );
                        setIsModalOpen(true);
                      }}
                      className="rounded-lg bg-red-500 p-2 text-white transition hover:bg-red-600"
                    >
                      <Trash2 size={18} />
                    </button>

                  </td>

                </tr>

              ))}

              {filteredProducts.length === 0 && (

                <tr>

                  <td
                    colSpan="5"
                    className="py-10 text-center text-slate-500"
                  >
                    No products found.
                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>

      {/* Delete Confirmation Modal */}

      <ConfirmModal
        isOpen={isModalOpen}
        title="Delete Product?"
        message="This action cannot be undone. Are you sure you want to delete this product?"
        loading={deleting}
        onCancel={() => {
          setIsModalOpen(false);
          setSelectedProduct(null);
        }}
        onConfirm={deleteProduct}
      />
    </>
  );
}

export default AdminProducts;