import { Heart, Star, Download } from "lucide-react";

const products = [
  {
    id: 1,
    title: "React Admin Dashboard",
    seller: "John",
    price: 499,
    rating: 4.9,
    downloads: "2.3k",
    image: "https://picsum.photos/400/250?random=1",
  },
  {
    id: 2,
    title: "Portfolio Template",
    seller: "Emma",
    price: 299,
    rating: 4.8,
    downloads: "1.8k",
    image: "https://picsum.photos/400/250?random=2",
  },
  {
    id: 3,
    title: "AI Landing Page",
    seller: "David",
    price: 599,
    rating: 5.0,
    downloads: "3.1k",
    image: "https://picsum.photos/400/250?random=3",
  },
  {
    id: 4,
    title: "E-Commerce UI Kit",
    seller: "Sophia",
    price: 399,
    rating: 4.7,
    downloads: "2.0k",
    image: "https://picsum.photos/400/250?random=4",
  },
];

function FeaturedProducts() {
  return (
    <section className="py-24 bg-white">

      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}

        <div className="text-center">

          <p className="text-blue-600 font-semibold uppercase tracking-widest">
            Marketplace
          </p>

          <h2 className="mt-3 text-4xl font-bold text-slate-900">
            Featured Products
          </h2>

          <p className="mt-4 text-slate-500 max-w-2xl mx-auto">
            Explore the most popular digital products created by talented
            creators.
          </p>

        </div>

        {/* Cards */}

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">

          {products.map((product) => (

            <div
              key={product.id}
              className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >

              <div className="relative">

                <img
                  src={product.image}
                  alt={product.title}
                  className="h-52 w-full object-cover"
                />

                <button className="absolute right-4 top-4 rounded-full bg-white p-2 shadow hover:bg-red-50">
                  <Heart size={18} />
                </button>

              </div>

              <div className="p-6">

                <div className="flex items-center justify-between">

                  <span className="flex items-center gap-1 text-sm text-yellow-500">
                    <Star size={16} fill="currentColor" />
                    {product.rating}
                  </span>

                  <span className="flex items-center gap-1 text-sm text-slate-500">
                    <Download size={15} />
                    {product.downloads}
                  </span>

                </div>

                <h3 className="mt-4 text-xl font-bold text-slate-900">
                  {product.title}
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  by {product.seller}
                </p>

                <div className="mt-6 flex items-center justify-between">

                  <span className="text-2xl font-bold text-blue-600">
                    ₹{product.price}
                  </span>

                  <button className="rounded-xl bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700">
                    Buy
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default FeaturedProducts;