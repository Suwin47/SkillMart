import { useContext, useEffect, useState } from "react";
import api from "../services/api";
import RevenueChart from "../components/seller/RevenueChart";
import {
  Package,
  ShoppingCart,
  TrendingUp,
  IndianRupee,
} from "lucide-react";
import { AuthContext } from "../context/AuthContext";

function SellerDashboard() {
  const [stats, setStats] = useState({
  totalProducts: 0,
  totalOrders: 0,
  totalRevenue: 0,
  averageOrderValue: 0,
  paidOrders: 0,
  pendingOrders: 0,
});
const { user } = useContext(AuthContext);
const hour = new Date().getHours();
const greeting =
  hour < 12
    ? "Good Morning"
    : hour < 18
    ? "Good Afternoon"
    : "Good Evening";

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await api.get("/seller/dashboard");
      setStats(res.data.stats);
    } catch (err) {
      console.error(err);
    }
  };

 const cards = [
  {
    title: "Products",
    value: stats.totalProducts,
    icon: <Package size={28} />,
    color: "from-blue-500 to-blue-700",
  },
  {
    title: "Orders",
    value: stats.totalOrders,
    icon: <ShoppingCart size={28} />,
    color: "from-green-500 to-green-700",
  },
  {
    title: "Sales",
    value: stats.paidOrders,
    icon: <TrendingUp size={28} />,
    color: "from-purple-500 to-purple-700",
  },
  {
    title: "Revenue",
    value: `₹${stats.totalRevenue}`,
    icon: <IndianRupee size={28} />,
    color: "from-orange-500 to-red-500",
  },
];

 return (

    <div className="space-y-8">

      <div>
        <p className="text-lg font-medium text-blue-600">
          {greeting}, {user?.fullName} 👋
        </p>

        <h1 className="mt-2 text-4xl font-bold text-slate-800">
          Seller Dashboard
        </h1>

        <p className="mt-3 text-slate-500">
          Manage your products, orders and earnings from one place.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <div
            key={card.title}
            className={`rounded-2xl bg-gradient-to-r ${card.color} p-6 text-white shadow-lg`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg">{card.title}</p>
                <h2 className="mt-3 text-4xl font-bold">
                  {card.value}
                </h2>
              </div>

              <div className="rounded-full bg-white/20 p-4">
                {card.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      <RevenueChart stats={stats} />

      <div className="grid gap-6 lg:grid-cols-3">

        <div className="rounded-2xl bg-white p-6 shadow">
          <h3 className="text-xl font-semibold">
            Total Revenue
          </h3>
          <p className="mt-4 text-4xl font-bold text-green-600">
            ₹{stats.totalRevenue}
          </p>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow">
          <h3 className="text-xl font-semibold">
            Total Orders
          </h3>
          <p className="mt-4 text-4xl font-bold text-blue-600">
            {stats.totalOrders}
          </p>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow">
          <h3 className="text-xl font-semibold">
            Products Listed
          </h3>
          <p className="mt-4 text-4xl font-bold text-purple-600">
            {stats.totalProducts}
          </p>
        </div>

      </div>

    </div>
);
}

export default SellerDashboard;