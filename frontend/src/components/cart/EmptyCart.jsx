import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

function EmptyCart() {
  return (
    <div className="rounded-2xl bg-white p-16 text-center shadow">

      <ShoppingCart
        size={70}
        className="mx-auto text-slate-400"
      />

      <h2 className="mt-6 text-3xl font-bold">
        Your Cart is Empty
      </h2>

      <p className="mt-3 text-slate-500">
        Looks like you haven't added any products yet.
      </p>

      <Link
        to="/products"
        className="mt-8 inline-block rounded-xl bg-blue-600 px-8 py-3 text-white hover:bg-blue-700"
      >
        Explore Products
      </Link>

    </div>
  );
}

export default EmptyCart;