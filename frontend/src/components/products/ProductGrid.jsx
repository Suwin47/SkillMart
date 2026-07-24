import ProductCard from "./ProductCard";

function ProductGrid({
  products,
  wishlistIds,
  setWishlistIds,
}) {
  if (!products || products.length === 0) {
    return (
      <div className="rounded-2xl bg-white p-8 text-center shadow md:p-12">

        <h2 className="text-xl font-bold text-slate-800 md:text-2xl">
          No Products Found
        </h2>

        <p className="mt-3 text-sm text-slate-500 md:text-base">
          Try changing your search or filters.
        </p>

      </div>
    );
  }

  return (
    <div
      className="
        grid
        grid-cols-2
        gap-4
        sm:grid-cols-2
        md:grid-cols-3
        xl:grid-cols-3
      "
    >
      {products.map((product) => (
        <ProductCard
          key={product._id}
          product={product}
          wishlistIds={wishlistIds}
          setWishlistIds={setWishlistIds}
        />
      ))}
    </div>
  );
}

export default ProductGrid;