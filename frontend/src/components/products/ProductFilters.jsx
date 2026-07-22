import { Star, Tag, IndianRupee, RotateCcw } from "lucide-react";

function ProductFilters() {
  return (
    <aside className="sticky top-28 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

      {/* Header */}

      <div className="flex items-center justify-between">

        <h2 className="text-xl font-bold text-slate-900">
          Filters
        </h2>

        <button className="flex items-center gap-1 text-sm text-blue-600 hover:underline">
          <RotateCcw size={15} />
          Reset
        </button>

      </div>

      {/* Categories */}

      <div className="mt-8">

        <div className="mb-4 flex items-center gap-2">

          <Tag size={18} />

          <h3 className="font-semibold">
            Categories
          </h3>

        </div>

        <div className="space-y-3">

          {[
            "React",
            "Node.js",
            "MongoDB",
            "Figma",
            "UI Kits",
            "Tailwind CSS",
            "AI Tools",
            "E-books",
          ].map((category) => (

            <label
              key={category}
              className="flex cursor-pointer items-center gap-3 rounded-xl p-2 transition hover:bg-slate-100"
            >
              <input
                type="checkbox"
                className="accent-blue-600"
              />

              <span className="text-slate-700">
                {category}
              </span>

            </label>

          ))}

        </div>

      </div>

      {/* Price */}

      <div className="mt-10">

        <div className="mb-4 flex items-center gap-2">

          <IndianRupee size={18} />

          <h3 className="font-semibold">
            Price
          </h3>

        </div>

        <div className="space-y-3">

          {[
            "Under ₹500",
            "₹500 - ₹1000",
            "₹1000 - ₹3000",
            "Above ₹3000",
          ].map((price) => (

            <label
              key={price}
              className="flex cursor-pointer items-center gap-3 rounded-xl p-2 transition hover:bg-slate-100"
            >
              <input
                type="radio"
                name="price"
                className="accent-blue-600"
              />

              {price}

            </label>

          ))}

        </div>

      </div>

      {/* Rating */}

      <div className="mt-10">

        <div className="mb-4 flex items-center gap-2">

          <Star size={18} />

          <h3 className="font-semibold">
            Rating
          </h3>

        </div>

        <div className="space-y-3">

          {[5, 4, 3].map((rating) => (

            <label
              key={rating}
              className="flex cursor-pointer items-center gap-3 rounded-xl p-2 transition hover:bg-slate-100"
            >
              <input
                type="radio"
                name="rating"
                className="accent-blue-600"
              />

              <div className="flex">

                {Array.from({ length: rating }).map((_, index) => (
                  <Star
                    key={index}
                    size={16}
                    fill="#FACC15"
                    color="#FACC15"
                  />
                ))}

              </div>

              <span className="text-sm text-slate-500">
                & Up
              </span>

            </label>

          ))}

        </div>

      </div>

      {/* Verified */}

      <div className="mt-10">

        <label className="flex cursor-pointer items-center gap-3 rounded-xl p-2 transition hover:bg-slate-100">

          <input
            type="checkbox"
            className="accent-blue-600"
          />

          <span className="font-medium">
            Verified Sellers Only
          </span>

        </label>

      </div>

    </aside>
  );
}

export default ProductFilters;