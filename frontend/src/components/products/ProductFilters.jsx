import { RotateCcw } from "lucide-react";

function ProductFilters({
  category,
  setCategory,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  sort,
  setSort,
}) {
  const clearFilters = () => {
    setCategory("All");
    setMinPrice("");
    setMaxPrice("");
    setSort("latest");
  };

  return (
    <div className="rounded-2xl bg-white p-6 shadow">

      <h2 className="mb-6 text-2xl font-bold text-slate-800">
        Filters
      </h2>

      {/* Category */}

      <div className="mb-6">

        <label className="mb-2 block font-semibold text-slate-700">
          Category
        </label>

       <select
  value={category}
  onChange={(e) => setCategory(e.target.value)}
  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-500"
>
  <option value="">Select Category</option>
  <option value="Web Templates">Web Templates</option>
  <option value="React Projects">React Projects</option>
  <option value="UI Kits">UI Kits</option>
  <option value="Design Assets">Design Assets</option>
  <option value="AI Tools">AI Tools</option>
  <option value="Mobile Apps">Mobile Apps</option>
  <option value="Databases">Databases</option>
  <option value="E-Books">E-Books</option>
</select>

      </div>

      {/* Price */}

      <div className="mb-6">

        <label className="mb-2 block font-semibold text-slate-700">
          Price Range
        </label>

        <div className="grid grid-cols-2 gap-3">

          <input
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={(e) =>
              setMinPrice(e.target.value)
            }
            className="
              rounded-xl
              border
              border-slate-300
              p-3
              outline-none
              transition
              focus:border-blue-600
              focus:ring-4
              focus:ring-blue-100
            "
          />

          <input
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) =>
              setMaxPrice(e.target.value)
            }
            className="
              rounded-xl
              border
              border-slate-300
              p-3
              outline-none
              transition
              focus:border-blue-600
              focus:ring-4
              focus:ring-blue-100
            "
          />

        </div>

      </div>

      {/* Sort */}

      <div className="mb-8">

        <label className="mb-2 block font-semibold text-slate-700">
          Sort By
        </label>

        <select
          value={sort}
          onChange={(e) =>
            setSort(e.target.value)
          }
          className="
            w-full
            rounded-xl
            border
            border-slate-300
            p-3
            outline-none
            transition
            focus:border-blue-600
            focus:ring-4
            focus:ring-blue-100
          "
        >
          <option value="latest">
            Latest
          </option>

          <option value="priceAsc">
            Price: Low → High
          </option>

          <option value="priceDesc">
            Price: High → Low
          </option>

          <option value="sales">
            Best Selling
          </option>

        </select>

      </div>

      {/* Clear Filters */}

      <button
        onClick={clearFilters}
        className="
          flex
          w-full
          items-center
          justify-center
          gap-2
          rounded-xl
          bg-slate-900
          py-3
          font-semibold
          text-white
          transition
          hover:bg-slate-800
        "
      >
        <RotateCcw size={18} />

        Clear Filters

      </button>

    </div>
  );
}

export default ProductFilters;