import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

function Pagination({
  page,
  totalPages,
  setPage,
}) {
  if (totalPages <= 1) return null;

  return (
    <div className="mt-12 flex flex-wrap items-center justify-center gap-3">

      {/* Previous */}

      <button
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
        className={`flex h-11 w-11 items-center justify-center rounded-xl border transition ${
          page === 1
            ? "cursor-not-allowed border-slate-200 bg-slate-100 text-slate-400"
            : "border-slate-300 bg-white hover:bg-slate-100"
        }`}
      >
        <ChevronLeft size={18} />
      </button>

      {/* Page Numbers */}

      {Array.from(
        { length: totalPages },
        (_, index) => index + 1
      ).map((pageNumber) => (
        <button
          key={pageNumber}
          onClick={() => setPage(pageNumber)}
          className={`h-11 w-11 rounded-xl font-semibold transition ${
            page === pageNumber
              ? "bg-indigo-600 text-white"
              : "border border-slate-300 bg-white hover:bg-slate-100"
          }`}
        >
          {pageNumber}
        </button>
      ))}

      {/* Next */}

      <button
        onClick={() => setPage(page + 1)}
        disabled={page === totalPages}
        className={`flex h-11 w-11 items-center justify-center rounded-xl border transition ${
          page === totalPages
            ? "cursor-not-allowed border-slate-200 bg-slate-100 text-slate-400"
            : "border-slate-300 bg-white hover:bg-slate-100"
        }`}
      >
        <ChevronRight size={18} />
      </button>

    </div>
  );
}

export default Pagination;