import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal } from "lucide-react";
import api from "../services/api";

import Navbar from "../components/home/Navbar";
import Footer from "../components/home/Footer";

import ProductFilters from "../components/products/ProductFilters";
import ProductGrid from "../components/products/ProductGrid";
import Pagination from "../components/products/Pagination";
import ProductSkeleton from "../components/products/ProductSkeleton";

function Products() {
  const [searchParams] = useSearchParams();

  const [search, setSearch] = useState(
    searchParams.get("search") || ""
  );

  const [showFilters, setShowFilters] = useState(false);

  const [products, setProducts] = useState([]);
  const [wishlistIds, setWishlistIds] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [category, setCategory] = useState(
    searchParams.get("category") || "All"
  );

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sort, setSort] = useState("latest");

  useEffect(() => {
    setSearch(searchParams.get("search") || "");
    setCategory(searchParams.get("category") || "All");
    setPage(1);
  }, [searchParams]);

  useEffect(() => {
    fetchProducts();
    fetchWishlist();
  }, [
    search,
    category,
    minPrice,
    maxPrice,
    sort,
    page,
  ]);

  useEffect(() => {
    setPage(1);
  }, [
    search,
    category,
    minPrice,
    maxPrice,
    sort,
  ]);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const res = await api.get("/services", {
        params: {
          search,
          category,
          minPrice,
          maxPrice,
          sort,
          page,
          limit: 9,
        },
      });

      setProducts(res.data.services);
      setTotalPages(res.data.totalPages);
      setError("");

    } catch (err) {
      console.error(err);
      setError("Failed to load products.");
    } finally {
      setLoading(false);
    }
  };

  const fetchWishlist = async () => {
    try {
      const res = await api.get("/wishlist");

      setWishlistIds(
        res.data.wishlist.map(
          (item) => item.service._id
        )
      );

    } catch {
      setWishlistIds([]);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />

        <main className="min-h-screen bg-slate-50">

          <div className="mx-auto max-w-7xl px-4 py-6 md:px-6 md:py-10">

            <div className="grid grid-cols-2 gap-4 md:grid-cols-2 xl:grid-cols-3">

              {Array.from({ length: 6 }).map((_, index) => (
                <ProductSkeleton key={index} />
              ))}

            </div>

          </div>

        </main>

        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />

        <div className="flex min-h-screen items-center justify-center bg-slate-50">

          <div className="rounded-2xl bg-white p-10 shadow">

            <h2 className="text-2xl font-bold text-red-600">
              {error}
            </h2>

          </div>

        </div>

        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-50">

        <div className="mx-auto max-w-7xl px-4 py-6 md:px-6 md:py-10">

          {/* Mobile Filter Button */}

          <div className="mb-6 flex justify-end lg:hidden">

            <button
              onClick={() =>
                setShowFilters(!showFilters)
              }
              className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-medium text-white shadow transition hover:bg-blue-700"
            >
              <SlidersHorizontal size={18} />

              {showFilters
                ? "Hide Filters"
                : "Filters"}

            </button>

          </div>

          <div className="grid gap-8 lg:grid-cols-4">

            {/* Filters */}

            <div
              className={`${
                showFilters
                  ? "block"
                  : "hidden"
              } lg:block`}
            >
              <ProductFilters
                category={category}
                setCategory={setCategory}
                minPrice={minPrice}
                setMinPrice={setMinPrice}
                maxPrice={maxPrice}
                setMaxPrice={setMaxPrice}
                sort={sort}
                setSort={setSort}
              />
            </div>

            {/* Products */}

            <div className="lg:col-span-3">

              <ProductGrid
                products={products}
                wishlistIds={wishlistIds}
                setWishlistIds={setWishlistIds}
              />

              {products.length > 0 && (

                <div className="mt-8 md:mt-10">

                  <Pagination
                    page={page}
                    totalPages={totalPages}
                    setPage={setPage}
                  />

                </div>

              )}

            </div>

          </div>

        </div>

      </main>

      <Footer />

    </>
  );
}

export default Products;