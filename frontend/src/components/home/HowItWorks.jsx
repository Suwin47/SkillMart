import {
  UserPlus,
  Search,
  CreditCard,
  Download,
} from "lucide-react";

const steps = [
  {
    id: "01",
    icon: <UserPlus size={34} />,
    title: "Create Account",
    description:
      "Sign up as a buyer or seller in less than a minute.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: "02",
    icon: <Search size={34} />,
    title: "Browse Products",
    description:
      "Explore thousands of premium digital assets.",
    color: "from-purple-500 to-indigo-500",
  },
  {
    id: "03",
    icon: <CreditCard size={34} />,
    title: "Secure Payment",
    description:
      "Pay safely using trusted payment methods.",
    color: "from-emerald-500 to-green-500",
  },
  {
    id: "04",
    icon: <Download size={34} />,
    title: "Instant Download",
    description:
      "Download your purchased files immediately.",
    color: "from-orange-500 to-red-500",
  },
];

function HowItWorks() {
  return (
    <section className="bg-slate-50 py-24">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center">

          <p className="text-blue-600 uppercase tracking-[0.25em] font-semibold">
            Process
          </p>

          <h2 className="mt-4 text-4xl font-bold text-slate-900">
            How SkillMart Works
          </h2>

          <p className="mt-4 max-w-2xl mx-auto text-slate-500">
            Buying premium digital products is fast, secure, and effortless.
          </p>

        </div>

        {/* Steps */}

        <div className="mt-20 grid gap-8 md:grid-cols-2 lg:grid-cols-4">

          {steps.map((step) => (

            <div
              key={step.id}
              className="relative rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >

              {/* Number */}

              <div className="absolute right-5 top-5 text-5xl font-extrabold text-slate-100">
                {step.id}
              </div>

              {/* Icon */}

              <div
                className={`mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r ${step.color} text-white`}
              >
                {step.icon}
              </div>

              <h3 className="mt-6 text-xl font-bold text-slate-900">
                {step.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                {step.description}
              </p>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}

export default HowItWorks;