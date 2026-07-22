function Divider({ text = "OR" }) {
  return (
    <div className="flex items-center gap-4 my-6">

      <div className="flex-1 h-px bg-slate-300"></div>

      <span className="text-sm text-slate-500 font-medium">
        {text}
      </span>

      <div className="flex-1 h-px bg-slate-300"></div>

    </div>
  );
}

export default Divider;