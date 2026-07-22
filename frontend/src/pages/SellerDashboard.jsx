import { useEffect, useState } from "react";
import api from "../services/api";

function SellerDashboard() {
  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    sales: 0,
    revenue: 0,
  });

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
      value: stats.products,
      color: "bg-blue-500",
    },
    {
      title: "Orders",
      value: stats.orders,
      color: "bg-green-500",
    },
    {
      title: "Sales",
      value: stats.sales,
      color: "bg-purple-500",
    },
    {
      title: "Revenue",
      value: `₹${stats.revenue}`,
      color: "bg-orange-500",
    },
  ];

  return (
    <>
      <h1 className="mb-8 text-3xl font-bold">
        Seller Dashboard
      </h1>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <div
            key={card.title}
            className={`${card.color} rounded-xl p-6 text-white shadow`}
          >
            <p className="text-lg">{card.title}</p>

            <h2 className="mt-3 text-4xl font-bold">
              {card.value}
            </h2>
          </div>
        ))}
      </div>
    </>
  );
}

export default SellerDashboard;