import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../services/api";

import {
  Search,
  ShoppingBag,
} from "lucide-react";

function AdminOrders() {
  const [loading, setLoading] = useState(true);

  const [orders, setOrders] = useState([]);

  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {

      const { data } = await api.get("/admin/orders");

      setOrders(data.orders);

    } catch (err) {

      toast.error("Unable to load orders.");

    } finally {

      setLoading(false);

    }
  };

  const filteredOrders = orders.filter((order) => {

    const buyer =
      order.buyer?.fullName?.toLowerCase() || "";

    const seller =
      order.seller?.fullName?.toLowerCase() || "";

    const product =
      order.service?.title?.toLowerCase() || "";

    return (
      buyer.includes(search.toLowerCase()) ||
      seller.includes(search.toLowerCase()) ||
      product.includes(search.toLowerCase())
    );
  });

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        Loading Orders...
      </div>
    );
  }

  return (
    <div className="space-y-8">

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-4xl font-bold">
            Orders
          </h1>

          <p className="text-slate-500">
            View all marketplace orders.
          </p>

        </div>

        <div className="rounded-xl bg-purple-600 px-6 py-3 text-white">

          <ShoppingBag
            className="mr-2 inline"
            size={20}
          />

          {filteredOrders.length} Orders

        </div>

      </div>

      <div className="relative">

        <Search
          className="absolute left-4 top-4 text-gray-400"
          size={18}
        />

        <input
          type="text"
          placeholder="Search orders..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="w-full rounded-xl border py-3 pl-12 pr-4"
        />

      </div>

      <div className="overflow-hidden rounded-2xl bg-white shadow">

        <table className="w-full">

          <thead className="bg-slate-100">

            <tr>

              <th className="px-6 py-4 text-left">
                Buyer
              </th>

              <th>Seller</th>

              <th>Product</th>

              <th>Amount</th>

              <th>Status</th>

            </tr>

          </thead>

          <tbody>

            {filteredOrders.map((order) => (

              <tr
                key={order._id}
                className="border-t"
              >

                <td className="px-6 py-4">
                  {order.buyer?.fullName}
                </td>

                <td>
                  {order.seller?.fullName}
                </td>

                <td>
                  {order.service?.title}
                </td>

                <td>
                  ₹{order.amount}
                </td>

                <td>

                  <span
                    className={`rounded-full px-3 py-1 text-sm ${
                      order.paymentStatus === "Paid"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {order.paymentStatus}
                  </span>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default AdminOrders;