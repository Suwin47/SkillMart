import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      const res = await api.get("/wishlist");
      setWishlist(res.data.wishlist);
    } catch (err) {
      console.error(err);
    }
  };

  const removeWishlist = async (serviceId) => {
    try {
      await api.delete("/wishlist", {
        data: { serviceId },
      });

      fetchWishlist();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-10">

      <div className="mx-auto max-w-6xl">

        <h1 className="mb-8 text-4xl font-bold">
          ❤️ My Wishlist
        </h1>

        {wishlist.length === 0 ? (

          <div className="rounded-xl bg-white p-10 text-center shadow">
            No products in wishlist.
          </div>

        ) : (

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

            {wishlist.map((item) => (

              <div
                key={item._id}
                className="overflow-hidden rounded-xl bg-white shadow"
              >

                <img
                  src={item.service.thumbnail}
                  alt={item.service.title}
                  className="h-52 w-full object-cover"
                />

                <div className="p-6">

                  <h2 className="text-xl font-bold">
                    {item.service.title}
                  </h2>

                  <p className="mt-2 text-slate-600">
                    ₹{item.service.price}
                  </p>

                  <div className="mt-6 flex justify-between">

                    <Link
                      to={`/product/${item.service._id}`}
                      className="rounded-lg bg-indigo-600 px-5 py-2 text-white"
                    >
                      View
                    </Link>

                    <button
                      onClick={() =>
                        removeWishlist(item.service._id)
                      }
                      className="rounded-lg bg-red-500 px-5 py-2 text-white"
                    >
                      Remove
                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}

export default Wishlist;