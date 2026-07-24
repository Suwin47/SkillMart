import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

function CategoriesGrid() {
  const navigate = useNavigate();

  const [counts, setCounts] = useState({});

  useEffect(() => {
    fetchCounts();
  }, []);

  const fetchCounts = async () => {
    try {
      const res = await api.get("/services/category-counts");

      const data = {};

      res.data.counts.forEach((item) => {
        data[item._id] = item.total;
      });

      setCounts(data);

    } catch (err) {
      console.error(err);
    }
  };

  const categories = [
    {
      name: "Web Templates",
      icon: "💻",
      color: "bg-blue-100",
      description: "HTML, Bootstrap & Tailwind Templates",
    },
    {
      name: "React Projects",
      icon: "⚛️",
      color: "bg-indigo-100",
      description: "Modern React & MERN Projects",
    },
    {
      name: "UI Kits",
      icon: "🎨",
      color: "bg-pink-100",
      description: "Figma & Tailwind UI Kits",
    },
    {
      name: "AI Tools",
      icon: "🤖",
      color: "bg-purple-100",
      description: "AI Apps & GPT Resources",
    },
    {
      name: "Mobile Apps",
      icon: "📱",
      color: "bg-green-100",
      description: "Android & iOS Applications",
    },
    {
      name: "Databases",
      icon: "🗄️",
      color: "bg-yellow-100",
      description: "MongoDB & SQL Projects",
    },
    {
      name: "E-Books",
      icon: "📚",
      color: "bg-orange-100",
      description: "Premium Learning Guides",
    },
    {
      name: "Design Assets",
      icon: "🎁",
      color: "bg-red-100",
      description: "Icons, Graphics & Mockups",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

      {categories.map((category) => (

        <button
          key={category.name}
          onClick={() =>
            navigate(
              `/products?category=${encodeURIComponent(
                category.name
              )}`
            )
          }
          className="group rounded-3xl bg-white p-6 shadow transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
        >

          <div
            className={`mx-auto flex h-16 w-16 items-center justify-center rounded-2xl text-4xl ${category.color}`}
          >
            {category.icon}
          </div>

          <h2 className="mt-5 text-lg font-bold md:text-xl">
            {category.name}
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            {category.description}
          </p>

          <div className="mt-6 flex items-center justify-between">

            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
              {counts[category.name] || 0} Products
            </span>

            <span className="font-semibold text-blue-600 transition group-hover:translate-x-1">
              Explore →
            </span>

          </div>

        </button>

      ))}

    </div>
  );
}

export default CategoriesGrid;