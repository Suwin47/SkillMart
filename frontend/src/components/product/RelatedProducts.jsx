import ProductCard from "../products/ProductCard";

const relatedProducts = [
  {
    id: 7,
    title: "Next.js Admin Dashboard",
    seller: "Alex Johnson",
    price: 699,
    rating: 4.9,
    downloads: "3.2k",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=900",
    tags: ["Next.js", "Dashboard", "Admin"],
  },
  {
    id: 8,
    title: "Modern SaaS UI Kit",
    seller: "Sophia Lee",
    price: 399,
    rating: 4.8,
    downloads: "2.4k",
    image:
      "https://images.unsplash.com/photo-1551434678-e076c223a692?w=900",
    tags: ["UI Kit", "Figma", "Design"],
  },
  {
    id: 9,
    title: "AI Landing Page",
    seller: "David Miller",
    price: 599,
    rating: 5.0,
    downloads: "5.7k",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=900",
    tags: ["AI", "Landing", "React"],
  },
];

function RelatedProducts() {
  return (
    <section>

      <div className="mb-10">

        <h2 className="text-3xl font-bold text-slate-900">
          Related Products
        </h2>

        <p className="mt-2 text-slate-500">
          You may also like these premium digital products.
        </p>

      </div>

      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

        {relatedProducts.map((product) => (

          <ProductCard
            key={product.id}
            product={product}
          />

        ))}

      </div>

    </section>
  );
}

export default RelatedProducts;