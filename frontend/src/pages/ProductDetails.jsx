import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

import Navbar from "../components/home/Navbar";
import Footer from "../components/home/Footer";

import ProductGallery from "../components/product/ProductGallery";
import ProductInfo from "../components/product/ProductInfo";
import ProductTabs from "../components/product/ProductTabs";
import RelatedProducts from "../components/product/RelatedProducts";

function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/services/${id}`);
        setProduct(res.data.service);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex h-screen items-center justify-center">
        Product not found.
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <main className="bg-slate-50 py-10">

        <div className="mx-auto max-w-7xl px-6">

          <div className="grid gap-10 lg:grid-cols-2">

            <ProductGallery product={product} />

            <ProductInfo product={product} />

          </div>

          <div className="mt-16">

            <ProductTabs product={product} />

          </div>

          <div className="mt-20">

            <RelatedProducts />

          </div>

        </div>

      </main>

      <Footer />
    </>
  );
}

export default ProductDetails;