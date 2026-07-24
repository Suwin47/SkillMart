import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../services/api";

function SellerOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const { data } = await api.get("/orders/seller");

      setOrders(data.orders || []);
    } catch (err) {
      console.error(err);

      toast.error(
        err.response?.data?.message ||
          "Unable to load seller orders."
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <h2 className="text-xl font-semibold">
          Loading Orders...
        </h2>
      </div>
    );
  }

  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-4xl font-bold text-slate-900">
          Seller Orders
        </h1>

        <p className="mt-2 text-slate-500">
          Manage all customer purchases.
        </p>
      </div>

      <div className="overflow-hidden rounded-3xl bg-white shadow">

        {orders.length === 0 ? (
          <div className="py-20 text-center">

            <h2 className="text-2xl font-semibold">
              No Orders Yet
            </h2>

            <p className="mt-2 text-slate-500">
              Orders will appear here after customers purchase your products.
            </p>

          </div>
        ) : (
          <table className="min-w-full">

            <thead className="bg-slate-100">

              <tr>

                <th className="px-6 py-4 text-left">
                  Buyer
                </th>

                <th className="px-6 py-4 text-left">
                  Product
                </th>

                <th className="px-6 py-4 text-left">
                  Amount
                </th>

                <th className="px-6 py-4 text-left">
                  Payment
                </th>

                <th className="px-6 py-4 text-left">
                  Status
                </th>

                <th className="px-6 py-4 text-left">
                  Date
                </th>

              </tr>

            </thead>

            <tbody>

              {orders.map((order) => (

                <tr
                  key={order._id}
                  className="border-t"
                >

                  {/* Buyer */}

                  <td className="px-6 py-5">

                    <div className="flex items-center gap-3">

                      <img
                        src={
                          order.buyer?.profileImage ||
                          `https://ui-avatars.com/api/?name=${encodeURIComponent(
                            order.buyer?.fullName || "User"
                          )}`
                        }
                        alt=""
                        className="h-12 w-12 rounded-full object-cover"
                      />

                      <div>

                        <p className="font-semibold">
                          {order.buyer?.fullName}
                        </p>

                        <p className="text-sm text-slate-500">
                          {order.buyer?.email}
                        </p>

                      </div>

                    </div>

                  </td>

                  {/* Product */}

                  <td className="px-6 py-5">

                    <div className="flex items-center gap-3">

                      <img
                        src={order.service?.thumbnail}
                        alt=""
                        className="h-14 w-20 rounded-xl object-cover"
                      />

                      <div>

                        <p className="font-semibold">
                          {order.service?.title}
                        </p>

                        <p className="text-sm text-slate-500">
                          {order.service?.category}
                        </p>

                      </div>

                    </div>

                  </td>

                  {/* Amount */}

                  <td className="px-6 py-5 font-bold text-green-600">
                    ₹{order.amount}
                  </td>

                  {/* Payment */}

                  <td className="px-6 py-5">

                    <span
                      className={`rounded-full px-4 py-2 text-sm font-semibold ${
                        order.paymentStatus === "Paid"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {order.paymentStatus}
                    </span>

                  </td>

                  {/* Order */}

                  <td className="px-6 py-5">

                    <span
                      className={`rounded-full px-4 py-2 text-sm font-semibold ${
                        order.orderStatus === "Completed"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-orange-100 text-orange-700"
                      }`}
                    >
                      {order.orderStatus}
                    </span>

                  </td>

                  {/* Date */}

                  <td className="px-6 py-5 text-slate-500">

                    {new Date(
                      order.createdAt
                    ).toLocaleDateString()}

                  </td>

                </tr>

              ))}

            </tbody>

          </table>
        )}

      </div>

    </div>
  );
}

export default SellerOrders;