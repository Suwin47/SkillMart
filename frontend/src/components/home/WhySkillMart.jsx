import {
  ShieldCheck,
  Download,
  BadgeCheck,
  Headphones,
} from "lucide-react";

const features = [
  {
    icon: <ShieldCheck size={26} />,
    title: "Secure Payments",
    description:
      "Every transaction is protected using trusted payment gateways.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: <Download size={26} />,
    title: "Instant Download",
    description:
      "Download your purchased digital products immediately after payment.",
    color: "from-emerald-500 to-green-500",
  },
  {
    icon: <BadgeCheck size={26} />,
    title: "Verified Sellers",
    description:
      "Buy confidently from verified creators with quality products.",
    color: "from-purple-500 to-indigo-500",
  },
  {
    icon: <Headphones size={26} />,
    title: "24/7 Support",
    description:
      "Our support team is always ready to help you whenever needed.",
    color: "from-orange-500 to-red-500",
  },
];

function WhySkillMart() {
  return (
    <section className="bg-slate-50 py-14 md:py-20 lg:py-24">

      <div className="mx-auto max-w-7xl px-4 sm:px-6">

        {/* Heading */}

        <div className="text-center">

          <p className="font-semibold uppercase tracking-widest text-blue-600">
            Why SkillMart
          </p>

          <h2 className="mt-3 text-2xl font-bold text-slate-900 md:text-3xl lg:text-4xl">
            Why Choose SkillMart?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl px-2 text-sm text-slate-500 md:px-0 md:text-base">
            Everything you need to buy and sell premium digital products in one
            trusted marketplace.
          </p>

        </div>

        {/* Feature Cards */}

        <div className="mt-10 grid grid-cols-2 gap-4 md:mt-14 md:grid-cols-2 md:gap-6 lg:mt-16 lg:grid-cols-4">

          {features.map((feature) => (

            <div
              key={feature.title}
              className="rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl md:p-6 lg:rounded-3xl lg:p-8"
            >

              <div
                className={`mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r ${feature.color} text-white md:h-14 md:w-14 lg:h-16 lg:w-16 lg:rounded-2xl`}
              >
                {feature.icon}
              </div>

              <h3 className="mt-4 text-base font-bold text-slate-900 md:text-lg lg:mt-6 lg:text-xl">
                {feature.title}
              </h3>

              <p className="mt-2 text-xs leading-5 text-slate-500 md:text-sm md:leading-6">
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