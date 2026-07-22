import Navbar from "../components/home/Navbar";
import Footer from "../components/home/Footer";
import OrdersList from "../components/orders/OrdersList";

function MyOrders() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-50 py-10">
        <div className="mx-auto max-w-7xl px-6">

          <h1 className="mb-8 text-4xl font-bold text-slate-900">
            My Orders
          </h1>

          <OrdersList />

        </div>
      </main>

      <Footer />
    </>
  );
}

export default MyOrders;