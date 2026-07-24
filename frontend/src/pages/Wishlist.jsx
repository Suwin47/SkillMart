import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import {
  FiHeart,
  FiShoppingCart,
  FiEye,
  FiTrash2,
} from "react-icons/fi";

import api from "../services/api";

import Navbar from "../components/home/Navbar";
import Footer from "../components/home/Footer";
import Loader from "../components/common/Loader";
import ConfirmModal from "../components/common/ConfirmModal";

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  // Confirm Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [removing, setRemoving] = useState(false);

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      setLoading(true);

      const res = await api.get("/wishlist");

      setWishlist(res.data.wishlist);

    } catch (err) {
      console.error(err);

      toast.error("Failed to load wishlist.");

    } finally {
      setLoading(false);
    }
  };

  // Move to Cart

  const addToCart = async (serviceId) => {
    try {

      await api.post("/cart", {
        serviceId,
      });

      await api.post("/wishlist", {
        serviceId,
      });

      setWishlist((prev) =>
        prev.filter(
          (item) => item.service._id !== serviceId
        )
      );

      toast.success("Moved to cart successfully.");

    } catch (err) {
      console.error(err);

      toast.error(
        err.response?.data?.message ||
          "Unable to add to cart."
      );
    }
  };

  // Remove Wishlist

  const removeWishlist = async () => {
    if (!selectedService) return;

    try {
      setRemoving(true);

      await api.post("/wishlist", {
        serviceId: selectedService,
      });

      setWishlist((prev) =>
        prev.filter(
          (item) =>
            item.service._id !== selectedService
        )
      );

      toast.success("Removed from wishlist.");

      setIsModalOpen(false);
      setSelectedService(null);

    } catch (err) {
      console.error(err);

      toast.error("Unable to remove.");

    } finally {
      setRemoving(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <Loader />
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-100 py-12">

        <div className="mx-auto max-w-7xl px-6">

          <div className="mb-10 flex items-center gap-3">

            <FiHeart
              size={38}
              className="text-red-500"
            />

            <div>

              <h1 className="text-4xl font-bold">
                My Wishlist
              </h1>

              <p className="text-slate-500">
                Your favourite products
              </p>

            </div>

          </div>

          {wishlist.length === 0 ? (

            <div className="rounded-3xl bg-white py-24 text-center shadow">

              <div className="text-7xl">
                ❤️
              </div>

              <h2 className="mt-6 text-4xl font-bold">
                Wishlist is Empty
              </h2>

              <p className="mt-3 text-slate-500">
                Save products here for later.
              </p>

              <Link
                to="/products"
                className="mt-8 inline-block rounded-xl bg-blue-600 px-8 py-3 font-semibold text-white transition hover:bg-blue-700"
              >
                Explore Products
              </Link>

            </div>

          ) : (

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">

              {wishlist.map((item) => (

                <div
                  key={item._id}
                  className="overflow-hidden rounded-3xl bg-white shadow transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
                >

                  <img
                    src={item.service.thumbnail}
                    alt={item.service.title}
                    className="h-60 w-full object-cover"
                    onError={(e) => {
                      e.target.src =
                        "https://placehold.co/600x400?text=No+Image";
                    }}
                  />

                  <div className="p-6">

                    <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-600">

                      {item.service.category}

                    </span>

                    <h2 className="mt-4 line-clamp-2 text-2xl font-bold">

                      {item.service.title}

                    </h2>

                    <div className="mt-4 flex items-center gap-3">

                      <img
                        src={
                          item.service.seller?.profileImage ||
                          `https://ui-avatars.com/api/?name=${item.service.seller?.fullName}`
                        }
                        alt=""
                        className="h-11 w-11 rounded-full object-cover"
                      />

                      <div>

                        <p className="font-semibold">

                          {item.service.seller?.fullName}

                        </p>

                        <p className="text-sm text-slate-500">
                          Verified Seller
                        </p>

                      </div>

                    </div>

                    <h3 className="mt-6 text-4xl font-bold text-blue-600">

                      ₹{item.service.price}

                    </h3>

                    <div className="mt-8 flex gap-3">

                      <Link
                        to={`/product/${item.service._id}`}
                        className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
                      >
                        <FiEye />
                        View
                      </Link>

                      <button
                        onClick={() =>
                          addToCart(item.service._id)
                        }
                        className="flex items-center justify-center rounded-xl border border-blue-600 px-4 text-blue-600 transition hover:bg-blue-50"
                      >
                        <FiShoppingCart size={20} />
                      </button>

                      <button
                        onClick={() => {
                          setSelectedService(
                            item.service._id
                          );
                          setIsModalOpen(true);
                        }}
                        className="flex items-center justify-center rounded-xl border border-red-500 px-4 text-red-500 transition hover:bg-red-50"
                      >
                        <FiTrash2 size={20} />
                      </button>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

      </main>

      <Footer />

      <ConfirmModal
        isOpen={isModalOpen}
        title="Remove from Wishlist?"
        message="Are you sure you want to remove this product from your wishlist?"
        loading={removing}
        onCancel={() => {
          setIsModalOpen(false);
          setSelectedService(null);
        }}
        onConfirm={removeWishlist}
      />
    </>
  );
}

export default Wishlist;