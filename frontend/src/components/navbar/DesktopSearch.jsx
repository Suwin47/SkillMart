import { FiSearch } from "react-icons/fi";

function DesktopSearch({
  search,
  setSearch,
  handleSearch,
}) {
  return (
    <div className="relative hidden w-[320px] xl:w-[420px] px-4 lg:block">

      <button
        onClick={handleSearch}
        className="absolute left-8 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600"
      >
        <FiSearch size={18} />
      </button>

      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
        className="h-11 w-full rounded-xl border border-slate-300 bg-slate-50 pl-11 pr-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white"
      />

    </div>
  );
}

export default DesktopSearch;