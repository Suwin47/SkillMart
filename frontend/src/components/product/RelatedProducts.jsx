import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";

function RelatedProducts({ product }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!product?._id) return;

    fetchRelatedProducts();
  }, [product]);

  const fetchRelatedProducts = async () => {
    try {
      const res = await api.get(
        `/services/related/${product._id}`
      );

      setProducts(res.data.products);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return null;

  if (products.length === 0) return null;

  return (
    <section className="mt-16">

      <div className="mb-8">

        <h2 className="text-2xl font-bold md:text-3xl">
          Related Products
        </h2>

        <p className="mt-2 text-sm text-slate-500 md:text-base">
          Similar products you may like.
        </p>

      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">

        {products.map((item) => (

          <Link
            key={item._id}
            to={`/product/${item._id}`}
            className="overflow-hidden rounded-xl bg-white shadow transition duration-300 hover:-translate-y-1 hover:shadow-xl"
          >

            <img
              src={item.thumbnail}
              alt={item.title}
              className="h-32 w-full object-cover sm:h-44 lg:h-52"
            />

            <div className="p-3 lg:p-5">

              <h3 className="line-clamp-2 text-sm font-bold text-slate-800 lg:text-lg">
                {item.title}
              </h3>

              <p className="mt-2 line-clamp-2 text-xs text-slate-500 lg:text-sm">
                {item.description}
              </p>

              <div className="mt-3 flex items-center justify-between">

                <span className="rounded-md bg-blue-100 px-2 py-1 text-[10px] font-medium text-blue-700 lg:text-xs">
                  {item.category}
                </span>

                <span className="text-sm font-bold text-green-600 lg:text-lg">
                  ₹{item.price}
                </span>

              </div>

              <p className="mt-3 line-clamp-1 text-[11px] text-slate-500 lg:text-sm">
                Seller:
                <span className="ml-1 font-medium text-slate-700">
                  {item.seller?.fullName || "Unknown Seller"}
                </span>
              </p>

            </div>

          </Link>

        ))}

      </div>

    </section>
  );
}

export default RelatedProducts;