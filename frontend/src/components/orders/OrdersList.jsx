import { useEffect, useState } from "react";
import api from "../../services/api";
import OrderCard from "./OrderCard";

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
    return (
      <div className="py-20 text-center text-lg font-medium">
        Loading Orders...
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="rounded-2xl bg-white p-12 text-center shadow">
        <h2 className="text-2xl font-bold text-slate-800">
          No Orders Yet
        </h2>

        <p className="mt-3 text-slate-500">
          Purchase your first product to see it here.
        </p>
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