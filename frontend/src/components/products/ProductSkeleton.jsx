function ProductSkeleton() {
  return (
    <div className="animate-pulse overflow-hidden rounded-2xl bg-white shadow">

      <div className="h-56 w-full bg-slate-200"></div>

      <div className="space-y-4 p-5">

        <div className="h-4 w-20 rounded bg-slate-200"></div>

        <div className="h-6 w-3/4 rounded bg-slate-200"></div>

        <div className="h-4 w-full rounded bg-slate-200"></div>

        <div className="h-4 w-2/3 rounded bg-slate-200"></div>

        <div className="mt-6 flex justify-between">

          <div className="h-8 w-24 rounded bg-slate-200"></div>

          <div className="h-8 w-20 rounded bg-slate-200"></div>

        </div>

      </div>

    </div>
  );
}

export default ProductSkeleton;