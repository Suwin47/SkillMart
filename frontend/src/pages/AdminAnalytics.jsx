import { useEffect, useState } from "react";
import {
  Users,
  Package,
  ShoppingCart,
  IndianRupee,
} from "lucide-react";
import api from "../services/api";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

function AdminAnalytics() {
  const [stats, setStats] = useState({
    revenue: 0,
    orders: 0,
    users: 0,
    products: 0,
  });
  const [monthlyRevenue, setMonthlyRevenue] = useState([]);
const [orderStatus, setOrderStatus] = useState([]);
const [topProducts, setTopProducts] = useState([]);
const [topSellers, setTopSellers] = useState([]);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {

    try {
      const { data } = await api.get("/admin/analytics");
      setStats(data.stats);
      setMonthlyRevenue(data.monthlyRevenue);
      setOrderStatus(data.orderStatus);
      setTopProducts(data.topProducts);
      setTopSellers(data.topSellers);
    } catch (err) {
      console.log(err);
    }
  };

  const cards = [
    {
      title: "Revenue",
      value: `₹${stats.revenue}`,
      icon: <IndianRupee size={30} />,
      color: "from-green-500 to-emerald-600",
    },
    {
      title: "Orders",
      value: stats.orders,
      icon: <ShoppingCart size={30} />,
      color: "from-blue-500 to-cyan-600",
    },
    {
      title: "Users",
      value: stats.users,
      icon: <Users size={30} />,
      color: "from-purple-500 to-indigo-600",
    },
    {
      title: "Products",
      value: stats.products,
      icon: <Package size={30} />,
      color: "from-orange-500 to-red-500",
    },
  ];
const COLORS = [
  "#2563EB",
  "#10B981",
  "#F59E0B",
  "#EF4444",
];
  return (
  <div className="space-y-8">

    {/* Header */}

    <div>
      <h1 className="text-4xl font-bold">
        Admin Analytics
      </h1>

      <p className="mt-2 text-slate-500">
        Track your marketplace performance.
      </p>
    </div>

    {/* Stats Cards */}

    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.title}
          className={`rounded-2xl bg-gradient-to-r ${card.color} p-6 text-white shadow-lg`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80">
                {card.title}
              </p>

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

    {/* Charts */}

    <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">

      {/* Revenue Chart */}

      <div className="rounded-2xl bg-white p-6 shadow">
        <h2 className="mb-6 text-xl font-bold">
          Monthly Revenue
        </h2>

        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={monthlyRevenue}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#2563EB"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Orders Pie Chart */}

      <div className="rounded-2xl bg-white p-6 shadow">
        <h2 className="mb-6 text-xl font-bold">
          Orders by Status
        </h2>

        <ResponsiveContainer width="100%" height={320}>
          <PieChart>

            <Pie
              data={orderStatus}
              dataKey="value"
              nameKey="name"
              outerRadius={110}
              label
            >
              {orderStatus.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip />
            <Legend />

          </PieChart>
        </ResponsiveContainer>
      </div>

    </div>

    {/* Top Selling Products */}

    <div className="rounded-2xl bg-white p-6 shadow">

      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">
          Top Selling Products
        </h2>

        <span className="text-sm text-slate-500">
          Best Performing Products
        </span>
      </div>

      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead>
            <tr className="border-b">
              <th className="py-3 text-left">#</th>
              <th className="text-left">Product</th>
              <th className="text-center">Sales</th>
            </tr>
          </thead>

          <tbody>

            {topProducts.map((product, index) => (

              <tr
                key={index}
                className="border-b hover:bg-slate-50"
              >
                <td className="py-4">
                  {index + 1}
                </td>

                <td className="font-medium">
                  {product.title}
                </td>

                <td className="text-center font-bold text-blue-600">
                  {product.sales}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

    {/* Top Sellers */}

    <div className="rounded-2xl bg-white p-6 shadow">

      <div className="mb-6 flex items-center justify-between">

        <h2 className="text-2xl font-bold">
          Top Sellers
        </h2>

        <span className="text-sm text-slate-500">
          Highest Revenue
        </span>

      </div>

      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead>
            <tr className="border-b">
              <th className="py-3 text-left">#</th>
              <th className="text-left">Seller</th>
              <th className="text-right">Revenue</th>
            </tr>
          </thead>

          <tbody>

            {topSellers.map((seller, index) => (

              <tr
                key={index}
                className="border-b hover:bg-slate-50"
              >
                <td className="py-4">
                  {index + 1}
                </td>

                <td className="font-medium">
                  {seller.name}
                </td>

                <td className="text-right font-bold text-green-600">
                  ₹{seller.revenue}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  </div>
);
}
export default AdminAnalytics;