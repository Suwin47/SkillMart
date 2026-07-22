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
    icon: <Globe size={32} />,
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "React Projects",
    icon: <Code2 size={32} />,
    color: "from-cyan-500 to-sky-500",
  },
  {
    title: "UI Kits",
    icon: <Palette size={32} />,
    color: "from-pink-500 to-rose-500",
  },
  {
    title: "Design Assets",
    icon: <PenTool size={32} />,
    color: "from-purple-500 to-indigo-500",
  },
  {
    title: "AI Tools",
    icon: <Brain size={32} />,
    color: "from-orange-500 to-yellow-500",
  },
  {
    title: "Mobile Apps",
    icon: <MonitorSmartphone size={32} />,
    color: "from-emerald-500 to-green-500",
  },
  {
    title: "Databases",
    icon: <Database size={32} />,
    color: "from-slate-600 to-slate-800",
  },
  {
    title: "E-Books",
    icon: <BookOpen size={32} />,
    color: "from-red-500 to-orange-500",
  },
];

function Categories() {
  return (
    <section className="bg-slate-50 py-24">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center">
          <p className="text-blue-600 font-semibold uppercase tracking-widest">
            Categories
          </p>

          <h2 className="mt-3 text-4xl font-bold text-slate-900">
            Explore Digital Categories
          </h2>

          <p className="mt-4 max-w-2xl mx-auto text-slate-500">
            Browse premium digital resources created by talented creators from around the world.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

          {categories.map((category) => (
            <div
              key={category.title}
              className="group rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer"
            >
              <div
                className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r ${category.color} text-white`}
              >
                {category.icon}
              </div>

              <h3 className="mt-6 text-xl font-bold text-slate-900">
                {category.title}
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Premium digital products and resources.
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default Categories;