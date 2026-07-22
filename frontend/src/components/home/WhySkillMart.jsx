import {
  ShieldCheck,
  Download,
  BadgeCheck,
  Headphones,
} from "lucide-react";

const features = [
  {
    icon: <ShieldCheck size={34} />,
    title: "Secure Payments",
    description:
      "Every transaction is protected using trusted payment gateways.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: <Download size={34} />,
    title: "Instant Download",
    description:
      "Download your purchased digital products immediately after payment.",
    color: "from-emerald-500 to-green-500",
  },
  {
    icon: <BadgeCheck size={34} />,
    title: "Verified Sellers",
    description:
      "Buy confidently from verified creators with quality products.",
    color: "from-purple-500 to-indigo-500",
  },
  {
    icon: <Headphones size={34} />,
    title: "24/7 Support",
    description:
      "Our support team is always ready to help you whenever needed.",
    color: "from-orange-500 to-red-500",
  },
];

function WhySkillMart() {
  return (
    <section className="bg-slate-50 py-24">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center">
          <p className="text-blue-600 font-semibold uppercase tracking-widest">
            Why SkillMart
          </p>

          <h2 className="mt-3 text-4xl font-bold text-slate-900">
            Why Choose SkillMart?
          </h2>

          <p className="mt-4 max-w-2xl mx-auto text-slate-500">
            Everything you need to buy and sell premium digital products in one
            trusted marketplace.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">

          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <div
                className={`mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r ${feature.color} text-white`}
              >
                {feature.icon}
              </div>

              <h3 className="mt-6 text-xl font-bold text-slate-900">
                {feature.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                {feature.description}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default WhySkillMart;