import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Star, BadgeCheck } from "lucide-react";
import api from "../../services/api";

function TopSellers() {
  const [sellers, setSellers] = useState([]);

  useEffect(() => {
    fetchTopSellers();
  }, []);

  const fetchTopSellers = async () => {
    try {
      const { data } = await api.get("/seller/top-sellers");
      setSellers(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="bg-white py-14 md:py-20 lg:py-24">

      <div className="mx-auto max-w-7xl px-4 sm:px-6">

        {/* Heading */}

        <div className="text-center">

          <p className="font-semibold uppercase tracking-widest text-blue-600">
            Creators
          </p>

          <h2 className="mt-3 text-2xl font-bold text-slate-900 md:text-3xl lg:text-4xl">
            Meet Our Top Sellers
          </h2>

          <p className="mx-auto mt-4 max-w-2xl px-2 text-sm text-slate-500 md:text-base">
            Discover talented creators trusted by thousands of buyers.
          </p>

        </div>

        {/* Sellers */}

        <div className="mt-10 grid grid-cols-2 gap-4 md:mt-14 md:grid-cols-2 md:gap-6 lg:mt-16 lg:grid-cols-4">

          {sellers.map((seller) => (

            <div
              key={seller._id}
              className="rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl md:p-6 lg:rounded-3xl lg:p-8"
            >

              <img
                src={
                  seller.profileImage ||
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    seller.fullName
                  )}`
                }
                alt={seller.fullName}
                className="mx-auto h-16 w-16 rounded-full object-cover md:h-20 md:w-20 lg:h-24 lg:w-24"
              />

              <div className="mt-4 flex items-center justify-center gap-2">

                <h3 className="text-base font-bold text-slate-900 md:text-lg lg:text-xl">
                  {seller.fullName}
                </h3>

                {seller.isVerified && (
                  <BadgeCheck
                    size={18}
                    className="text-blue-600"
                  />
                )}

              </div>

              <p className="mt-2 line-clamp-2 text-xs text-slate-500 md:text-sm">
                {seller.bio || "Digital Creator"}
              </p>

              <div className="mt-5 flex justify-center gap-6">

                <div>

                  <p className="text-lg font-bold">
                    {seller.products}
                  </p>

                  <span className="text-xs text-slate-500">
                    Products
                  </span>

                </div>

                <div>

                  <p className="flex items-center justify-center gap-1 text-lg font-bold">

                    <Star
                      size={16}
                      fill="currentColor"
                      className="text-yellow-500"
                    />

                    {seller.rating}

                  </p>

                  <span className="text-xs text-slate-500">
                    Rating
                  </span>

                </div>

              </div>

              <Link
                to={`/seller/${seller._id}`}
                className="mt-6 block rounded-xl bg-blue-600 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 md:py-3"
              >
                View Profile
              </Link>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default TopSellers;