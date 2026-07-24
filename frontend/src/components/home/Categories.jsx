import { Link } from "react-router-dom";
import {
  Code2,
  MonitorSmartphone,
  Palette,
  PenTool,
  Brain,
  BookOpen,
  Database,
  Globe,
} from "lucide-react";

const categories = [
  {
    title: "Web Templates",
    description:
      "Responsive website templates for businesses, portfolios and landing pages.",
    icon: <Globe size={26} />,
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "React Projects",
    description:
      "Production-ready React projects with clean and reusable code.",
    icon: <Code2 size={26} />,
    color: "from-cyan-500 to-sky-500",
  },
  {
    title: "UI Kits",
    description:
      "Modern UI kits and reusable component libraries for faster development.",
    icon: <Palette size={26} />,
    color: "from-pink-500 to-rose-500",
  },
  {
    title: "Design Assets",
    description:
      "Premium icons, illustrations, mockups and creative design resources.",
    icon: <PenTool size={26} />,
    color: "from-purple-500 to-indigo-500",
  },
  {
    title: "AI Tools",
    description:
      "AI prompts, automation tools and productivity resources.",
    icon: <Brain size={26} />,
    color: "from-orange-500 to-yellow-500",
  },
  {
    title: "Mobile Apps",
    description:
      "Android, iOS and Flutter mobile application source code.",
    icon: <MonitorSmartphone size={26} />,
    color: "from-emerald-500 to-green-500",
  },
  {
    title: "Databases",
    description:
      "MongoDB, MySQL, Firebase and backend starter projects.",
    icon: <Database size={26} />,
    color: "from-slate-600 to-slate-800",
  },
  {
    title: "E-Books",
    description:
      "Programming, design and business e-books for learning new skills.",
    icon: <BookOpen size={26} />,
    color: "from-red-500 to-orange-500",
  },
];

function Categories() {
  return (
    <section className="bg-slate-50 py-14 md:py-20 lg:py-24">

      <div className="mx-auto max-w-7xl px-4 sm:px-6">

        {/* Heading */}

        <div className="text-center">

          <p className="font-semibold uppercase tracking-widest text-blue-600">
            Categories
          </p>

          <h2 className="mt-3 text-2xl font-bold text-slate-900 md:text-3xl lg:text-4xl">
            Explore Digital Categories
          </h2>

          <p className="mx-auto mt-4 max-w-2xl px-2 text-sm text-slate-500 md:px-0 md:text-base">
            Browse premium digital resources created by talented creators from
            around the world.
          </p>

        </div>

        {/* Categories Grid */}

        <div className="mt-10 grid grid-cols-2 gap-4 md:mt-14 md:grid-cols-2 md:gap-6 lg:mt-16 lg:grid-cols-4">

          {categories.map((category) => (

            <Link
              key={category.title}
              to={`/products?category=${encodeURIComponent(category.title)}`}
              className="group rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl md:p-6 lg:rounded-3xl lg:p-8"
            >

              {/* Icon */}

              <div
                className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r ${category.color} text-white md:h-14 md:w-14 lg:h-16 lg:w-16 lg:rounded-2xl`}
              >
                {category.icon}
              </div>

              {/* Title */}

              <h3 className="mt-4 text-base font-bold text-slate-900 transition group-hover:text-blue-600 md:text-lg lg:mt-6 lg:text-xl">
                {category.title}
              </h3>

              {/* Description */}

              <p className="mt-2 text-xs leading-5 text-slate-500 md:text-sm md:leading-6">
                {category.description}
              </p>

            </Link>

          ))}

        </div>

      </div>

    </section>
  );
}

export default Categories;