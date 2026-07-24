import { Search, SlidersHorizontal } from "lucide-react";

function ProductSearch({
  search,
  setSearch,
  showFilters,
  setShowFilters,
}) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center">

      {/* Search Box */}

      <div className="relative flex-1">

        <Search
          size={20}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search digital products..."
          className="
            w-full
            rounded-2xl
            border
            border-slate-300
            bg-white
            py-4
            pl-12
            pr-4
            text-slate-700
            outline-none
            transition
            focus:border-blue-600
            focus:ring-4
            focus:ring-blue-100
          "
        />

      </div>

      {/* Mobile Filter Button */}

      <button
        onClick={() => setShowFilters(!showFilters)}
        className="
          flex
          items-center
          justify-center
          gap-2
          rounded-2xl
          border
          border-slate-300
          bg-white
          px-6
          py-4
          transition
          hover:bg-slate-100
          lg:hidden
        "
      >
        <SlidersHorizontal size={20} />

        Filters

      </button>

    </div>
  );
}

export default ProductSearch;