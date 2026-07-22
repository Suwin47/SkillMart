import ProductCard from "./ProductCard";

function ProductGrid({ products }) {

  if (products.length === 0) {
    return (
      <div className="rounded-xl bg-white p-10 text-center shadow">

        <h2 className="text-2xl font-semibold">

          No Products Found

        </h2>

        <p className="mt-2 text-slate-500">

          There are currently no products available.

        </p>

      </div>
    );
  }

  return (
    <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">

      {products.map((product) => (

        <ProductCard
          key={product._id}
          product={product}
        />

      ))}

    </div>
  );
}

export default ProductGrid;