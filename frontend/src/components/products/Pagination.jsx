import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

function Pagination() {
  return (
    <div className="mt-16 flex items-center justify-center gap-3">

      <button className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-300 bg-white transition hover:bg-slate-100">
        <ChevronLeft size={18} />
      </button>

      <button className="h-11 w-11 rounded-xl bg-indigo-600 font-semibold text-white">
        1
      </button>

      <button className="h-11 w-11 rounded-xl border border-slate-300 bg-white transition hover:bg-slate-100">
        2
      </button>

      <button className="h-11 w-11 rounded-xl border border-slate-300 bg-white transition hover:bg-slate-100">
        3
      </button>

      <button className="h-11 w-11 rounded-xl border border-slate-300 bg-white transition hover:bg-slate-100">
        4
      </button>

      <button className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-300 bg-white transition hover:bg-slate-100">
        <ChevronRight size={18} />
      </button>

    </div>
  );
}

export default Pagination;