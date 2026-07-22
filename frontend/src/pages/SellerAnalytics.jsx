import { useEffect, useState } from "react";
import api from "../services/api";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

function SellerAnalytics() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    averageOrderValue: 0,
  });

  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await api.get("/seller/dashboard");

      setStats(res.data.stats);
      setRecentOrders(res.data.recentOrders);
    } catch (err) {
      console.log(err);
    }
  };

  // Dummy chart data for now
  const chartData = [
    { month: "Jan", revenue: 0 },
    { month: "Feb", revenue: 0 },
    { month: "Mar", revenue: 0 },
    { month: "Apr", revenue: 0 },
    { month: "May", revenue: 0 },
    { month: "Jun", revenue: stats.totalRevenue },
  ];

  return (
    <div className="space-y-8 p-8">

      <h1 className="text-3xl font-bold">
        Seller Analytics
      </h1>

      {/* Stat Cards */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <div className="rounded-xl bg-gradient-to-r from-green-500 to-green-600 p-6 text-white shadow-lg">
          <p>Total Revenue</p>
          <h2 className="mt-3 text-4xl font-bold">
            ₹{stats.totalRevenue}
          </h2>
        </div>

        <div className="rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-white shadow-lg">
          <p>Total Products</p>
          <h2 className="mt-3 text-4xl font-bold">
            {stats.totalProducts}
          </h2>
        </div>

        <div className="rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 p-6 text-white shadow-lg">
          <p>Total Orders</p>
          <h2 className="mt-3 text-4xl font-bold">
            {stats.totalOrders}
          </h2>
        </div>

        <div className="rounded-xl bg-gradient-to-r from-purple-500 to-purple-600 p-6 text-white shadow-lg">
          <p>Average Order</p>
          <h2 className="mt-3 text-4xl font-bold">
            ₹{stats.averageOrderValue}
          </h2>
        </div>

      </div>

      {/* Revenue Chart */}

      <div className="rounded-xl bg-white p-6 shadow">

        <h2 className="mb-5 text-xl font-bold">
          Revenue Overview
        </h2>

        <div style={{ width: "100%", height: 350 }}>

          <ResponsiveContainer>

            <LineChart data={chartData}>

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="month" />

              <YAxis />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#2563eb"
                strokeWidth={3}
              />

            </LineChart>

          </ResponsiveContainer>

        </div>

      </div>

      {/* Recent Orders */}

      <div className="rounded-xl bg-white p-6 shadow">

        <h2 className="mb-5 text-xl font-bold">
          Recent Orders
        </h2>

        {recentOrders.length === 0 ? (

          <div className="py-10 text-center text-gray-500">
            No Orders Yet
          </div>

        ) : (

          <table className="w-full">

            <thead>

              <tr className="border-b">

                <th className="py-3 text-left">Buyer</th>

                <th className="text-left">Product</th>

                <th className="text-left">Amount</th>

                <th className="text-left">Status</th>

              </tr>

            </thead>

            <tbody>

              {recentOrders.map((order) => (

                <tr
                  key={order._id}
                  className="border-b"
                >

                  <td className="py-3">
                    {order.buyer?.fullName}
                  </td>

                  <td>
                    {order.service?.title}
                  </td>

                  <td>
                    ₹{order.amount}
                  </td>

                  <td>

                    <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                      {order.paymentStatus}
                    </span>

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

export default SellerAnalytics;