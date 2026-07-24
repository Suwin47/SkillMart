import Navbar from "../components/home/Navbar";
import Footer from "../components/home/Footer";

import CartList from "../components/cart/CartList";

function Cart() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-50 py-10">
        <div className="mx-auto max-w-7xl px-6">

          <h1 className="mb-8 text-4xl font-bold">
            Shopping Cart
          </h1>

          <CartList />

        </div>
      </main>

      <Footer />
    </>
  );
}

export default Cart;