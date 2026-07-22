import { Search, SlidersHorizontal } from "lucide-react";

function ProductSearch({
  showFilters,
  setShowFilters,
}) {
  return (
    <section>

      <div className="rounded-3xl bg-gradient-to-r from-indigo-600 to-purple-600 p-10 text-white">

        <h1 className="text-4xl font-bold">
          Explore Digital Products
        </h1>

        <p className="mt-3 max-w-2xl text-indigo-100">
          Discover premium digital assets from talented creators.
        </p>

        <div className="mt-8 flex gap-4">

          {/* Search */}

          <div className="relative flex-1">

            <Search
              size={20}
              className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search templates, UI Kits, React, AI..."
              className="h-14 w-full rounded-2xl border border-slate-200 bg-white pl-14 pr-4 text-slate-700 outline-none focus:ring-2 focus:ring-indigo-400"/>
          </div>

          {/* Mobile Filter Button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-600 text-white transition hover:bg-indigo-700 lg:hidden">
            <SlidersHorizontal size={22} />
          </button>
        </div>
      </div>
    </section>
  );
}

export default ProductSearch;