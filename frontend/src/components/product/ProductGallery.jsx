import { useState } from "react";

function ProductGallery({ product }) {
  const [selectedImage, setSelectedImage] = useState(product.thumbnail);

  return (
    <div>

      {/* Main Image */}

  <div className="overflow-hidden rounded-2xl bg-white shadow-lg md:rounded-3xl">

  <img
    src={selectedImage}
    alt={product.title}
    className="h-64 w-full object-cover transition duration-500 hover:scale-105 sm:h-80 md:h-[450px] lg:h-[500px]"
  />

</div>

      {/* Thumbnail */}

      <div className="mt-4 flex gap-3 overflow-x-auto pb-2">

  <button
    onClick={() => setSelectedImage(product.thumbnail)}
    className={`overflow-hidden rounded-lg border-2 transition ${
      selectedImage === product.thumbnail
        ? "border-blue-600"
        : "border-transparent"
    }`}
  >
    <img
      src={product.thumbnail}
      alt={product.title}
      className="h-16 w-16 object-cover sm:h-20 sm:w-20 md:h-24 md:w-24"
    />
  </button>

</div>
    </div>
  );
}

export default ProductGallery;