import { Star, BadgeCheck } from "lucide-react";

const sellers = [
  {
    id: 1,
    name: "John David",
    role: "React Developer",
    rating: 4.9,
    products: 42,
    image: "https://i.pravatar.cc/200?img=11",
  },
  {
    id: 2,
    name: "Sophia Wilson",
    role: "UI/UX Designer",
    rating: 4.8,
    products: 37,
    image: "https://i.pravatar.cc/200?img=5",
  },
  {
    id: 3,
    name: "Michael Lee",
    role: "Full Stack Developer",
    rating: 5.0,
    products: 51,
    image: "https://i.pravatar.cc/200?img=15",
  },
  {
    id: 4,
    name: "Emma Watson",
    role: "AI Creator",
    rating: 4.9,
    products: 28,
    image: "https://i.pravatar.cc/200?img=32",
  },
];

function TopSellers() {
  return (
    <section className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center">

          <p className="uppercase tracking-widest text-blue-600 font-semibold">
            Creators
          </p>

          <h2 className="mt-3 text-4xl font-bold text-slate-900">
            Meet Our Top Sellers
          </h2>

          <p className="mt-4 max-w-2xl mx-auto text-slate-500">
            Discover talented creators trusted by thousands of buyers.
          </p>

        </div>

        {/* Cards */}
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">

          {sellers.map((seller) => (

            <div
              key={seller.id}
              className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >

              <img
                src={seller.image}
                alt={seller.name}
                className="mx-auto h-24 w-24 rounded-full object-cover"
              />

              <div className="mt-5 flex items-center justify-center gap-2">

                <h3 className="text-xl font-bold text-slate-900">
                  {seller.name}
                </h3>

                <BadgeCheck
                  size={18}
                  className="text-blue-600"
                />

              </div>

              <p className="mt-2 text-slate-500">
                {seller.role}
              </p>

              <div className="mt-6 flex justify-center gap-6">

                <div>

                  <p className="font-bold text-lg">
                    {seller.products}
                  </p>

                  <span className="text-xs text-slate-500">
                    Products
                  </span>

                </div>

                <div>

                  <p className="flex items-center justify-center gap-1 font-bold text-lg">

                    <Star
                      size={18}
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

              <button className="mt-8 w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700">
                View Profile
              </button>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}

export default TopSellers;