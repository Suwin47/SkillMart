import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Package } from "lucide-react";

import api from "../../services/api";
import OrderCard from "./OrderCard";
import Loader from "../common/Loader";

function OrdersList() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.get("/orders");
        setOrders(res.data.orders);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (orders.length === 0) {
    return (
      <div className="rounded-3xl bg-white py-20 text-center shadow">

        <div className="flex justify-center">

          <div className="rounded-full bg-blue-100 p-6">

            <Package
              size={60}
              className="text-blue-600"
            />

          </div>

        </div>

        <h2 className="mt-8 text-4xl font-bold text-slate-800">
          No Orders Yet
        </h2>

        <p className="mx-auto mt-4 max-w-md text-lg text-slate-500">
          You haven't purchased any products yet.
          Start shopping to see your orders here.
        </p>

        <Link
          to="/products"
          className="mt-8 inline-block rounded-xl bg-blue-600 px-8 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          Start Shopping
        </Link>

      </div>
    );
  }

  return (
    <div className="space-y-6">
      {orders.map((order) => (
        <OrderCard
          key={order._id}
          order={order}
        />
      ))}
    </div>
  );
}

export default OrdersList;