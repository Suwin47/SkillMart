import { useEffect, useState } from "react";
import api from "../services/api";

import Navbar from "../components/home/Navbar";
import Footer from "../components/home/Footer";

import ProductSearch from "../components/products/ProductSearch";
import ProductFilters from "../components/products/ProductFilters";
import ProductGrid from "../components/products/ProductGrid";
import Pagination from "../components/products/Pagination";

function Products() {
  const [showFilters, setShowFilters] = useState(false);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/services");

        setProducts(res.data.services);
      } catch (err) {
        console.error(err);
        setError("Failed to load products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center text-xl font-semibold">
        Loading products...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center text-red-600 text-xl">
        {error}
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-50">

        <div className="mx-auto max-w-7xl px-6 py-10">

          {/* Search */}

          <ProductSearch
            showFilters={showFilters}
            setShowFilters={setShowFilters}
          />

          <div className="mt-10 grid gap-8 lg:grid-cols-4">

            {/* Filters */}

            <div
              className={`
                ${showFilters ? "block" : "hidden"}
                lg:block
              `}
            >
              <ProductFilters />
            </div>

            {/* Products */}

            <div className="lg:col-span-3">

              <ProductGrid products={products} />

              <div className="mt-10">
                <Pagination />
              </div>

            </div>

          </div>

        </div>

      </main>

      <Footer />
    </>
  );
}

export default Products;