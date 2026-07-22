import { useState } from "react";

function ProductGallery({ product }) {
  const [selectedImage, setSelectedImage] = useState(product.thumbnail);

  return (
    <div>

      {/* Main Image */}

      <div className="overflow-hidden rounded-3xl bg-white shadow-lg">

        <img
          src={selectedImage}
          alt={product.title}
          className="h-[500px] w-full object-cover transition duration-500 hover:scale-105"
        />

      </div>

      {/* Thumbnail */}

      <div className="mt-5 flex gap-4">

        <button
          onClick={() => setSelectedImage(product.thumbnail)}
          className={`overflow-hidden rounded-xl border-2 transition
            ${
              selectedImage === product.thumbnail
                ? "border-blue-600"
                : "border-transparent"
            }`}
        >
          <img
            src={product.thumbnail}
            alt={product.title}
            className="h-24 w-24 object-cover"
          />
        </button>

      </div>

    </div>
  );
}

export default ProductGallery;