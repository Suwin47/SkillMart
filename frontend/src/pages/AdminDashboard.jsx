import { useContext, useEffect, useState } from "react";
import api from "../services/api";
import DashboardLayout from "../components/layout/DashboardLayout";

import {
  LayoutDashboard,
  Users,
  Package,
  ShoppingCart,
  IndianRupee,
  UserCheck,
  User,
  BarChart3,
  Settings,
} from "lucide-react";

import { AuthContext } from "../context/AuthContext";

const menuItems = [
  {
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Users",
    path: "/admin/users",
    icon: Users,
  },
  {
    label: "Products",
    path: "/admin/products",
    icon: Package,
  },
  {
    label: "Orders",
    path: "/admin/orders",
    icon: ShoppingCart,
  },
  {
    label: "Seller Requests",
    path: "/admin/seller-requests",
    icon: UserCheck,
  },
  {
    label: "Analytics",
    path: "/admin/analytics",
    icon: BarChart3,
  },
  {
    label: "Settings",
    path: "/admin/settings",
    icon: Settings,
  },
];

function AdminDashboard() {
  const { user } = useContext(AuthContext);

  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    totalSellers: 0,
    totalBuyers: 0,
  });

  const [recentUsers, setRecentUsers] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);

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
      const { data } = await api.get("/admin/dashboard");

      setStats(data.stats);
      setRecentUsers(data.recentUsers);
      setRecentOrders(data.recentOrders);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const cards = [
    {
      title: "Users",
      value: stats.totalUsers,
      icon: <Users size={28} />,
      color: "from-blue-500 to-blue-700",
    },
    {
      title: "Products",
      value: stats.totalProducts,
      icon: <Package size={28} />,
      color: "from-green-500 to-green-700",
    },
    {
      title: "Orders",
      value: stats.totalOrders,
      icon: <ShoppingCart size={28} />,
      color: "from-purple-500 to-purple-700",
    },
    {
      title: "Revenue",
      value: `₹${stats.totalRevenue}`,
      icon: <IndianRupee size={28} />,
      color: "from-orange-500 to-red-500",
    },
    {
      title: "Sellers",
      value: stats.totalSellers,
      icon: <UserCheck size={28} />,
      color: "from-pink-500 to-pink-700",
    },
    {
      title: "Buyers",
      value: stats.totalBuyers,
      icon: <User size={28} />,
      color: "from-cyan-500 to-cyan-700",
    },
  ];

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center text-xl font-semibold">
        Loading Dashboard...
      </div>
    );
  }

 return (
  <DashboardLayout
    title="Admin Dashboard"
    subtitle="Manage users, products, sellers and marketplace activities."
    menuItems={menuItems}
  >
    {/* Welcome */}

  <p className="mb-8 text-lg font-medium text-blue-600">
  {greeting}, {user?.fullName} 👋
</p>

    {/* Statistics */}

    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">

      {cards.map((card) => (

        <div
          key={card.title}
          className={`rounded-2xl bg-gradient-to-r ${card.color} p-5 text-white shadow-lg transition hover:scale-[1.02] md:p-6`}
        >

          <div className="flex items-center justify-between">

            <div>

              <p className="text-white/80">
                {card.title}
              </p>

              <h2 className="mt-3 text-3xl font-bold md:text-4xl">
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

    {/* Recent Users */}

    <div className="mt-8 rounded-2xl bg-white p-5 shadow md:p-6">

      <h2 className="mb-6 text-2xl font-bold">
        Recent Users
      </h2>

      {recentUsers.length === 0 ? (

        <p>No users found.</p>

      ) : (

        <div className="overflow-x-auto">

          <table className="min-w-full">

            <thead>

              <tr className="border-b">

                <th className="py-3 text-left">
                  Name
                </th>

                <th>Email</th>

                <th>Role</th>

              </tr>

            </thead>

            <tbody>

              {recentUsers.map((user) => (

                <tr
                  key={user._id}
                  className="border-b hover:bg-slate-50"
                >

                  <td className="flex items-center gap-3 py-4">

                    <img
                      src={
                        user.profileImage ||
                        `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          user.fullName
                        )}`
                      }
                      alt={user.fullName}
                      className="h-10 w-10 rounded-full object-cover"
                    />

                    <span className="font-medium whitespace-nowrap">
                      {user.fullName}
                    </span>

                  </td>

                  <td className="whitespace-nowrap">
                    {user.email}
                  </td>

                  <td>

                    <span
                      className={`rounded-full px-3 py-1 text-sm ${
                        user.role === "admin"
                          ? "bg-red-100 text-red-600"
                          : user.role === "seller"
                          ? "bg-green-100 text-green-600"
                          : "bg-blue-100 text-blue-600"
                      }`}
                    >
                      {user.role}
                    </span>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      )}

    </div>

      {/* Recent Users */}

          {/* Recent Orders */}

    <div className="mt-8 rounded-2xl bg-white p-5 shadow md:p-6">

      <h2 className="mb-6 text-2xl font-bold">
        Recent Orders
      </h2>

      {recentOrders.length === 0 ? (

        <p>No orders found.</p>

      ) : (

        <div className="overflow-x-auto">

          <table className="min-w-full">

            <thead>

              <tr className="border-b">

                <th className="py-3 text-left">
                  Buyer
                </th>

                <th>Seller</th>

                <th>Product</th>

                <th>Amount</th>

                <th>Status</th>

                <th>Date</th>

              </tr>

            </thead>

            <tbody>

              {recentOrders.map((order) => (

                <tr
                  key={order._id}
                  className="border-b hover:bg-slate-50"
                >

                  <td className="py-4 whitespace-nowrap">
                    {order.buyer?.fullName || "-"}
                  </td>

                  <td className="whitespace-nowrap">
                    {order.seller?.fullName || "-"}
                  </td>

                  <td className="whitespace-nowrap">
                    {order.service?.title || "-"}
                  </td>

                  <td className="font-semibold whitespace-nowrap">
                    ₹{order.amount}
                  </td>

                  <td>

                    <span
                      className={`rounded-full px-3 py-1 text-sm font-medium ${
                        order.paymentStatus === "Paid"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {order.paymentStatus}
                    </span>

                  </td>

                  <td className="whitespace-nowrap">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      )}

    </div>

  </DashboardLayout>
);

}

export default AdminDashboard;
