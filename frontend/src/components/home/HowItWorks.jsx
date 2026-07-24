import {
  UserPlus,
  Search,
  CreditCard,
  Download,
} from "lucide-react";

const steps = [
  {
    id: "01",
    icon: <UserPlus size={26} />,
    title: "Create Account",
    description:
      "Sign up as a buyer or seller in less than a minute.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: "02",
    icon: <Search size={26} />,
    title: "Browse Products",
    description:
      "Explore thousands of premium digital assets.",
    color: "from-purple-500 to-indigo-500",
  },
  {
    id: "03",
    icon: <CreditCard size={26} />,
    title: "Secure Payment",
    description:
      "Pay safely using trusted payment methods.",
    color: "from-emerald-500 to-green-500",
  },
  {
    id: "04",
    icon: <Download size={26} />,
    title: "Instant Download",
    description:
      "Download your purchased files immediately.",
    color: "from-orange-500 to-red-500",
  },
];

function HowItWorks() {
  return (
    <section className="bg-slate-50 py-14 md:py-20 lg:py-24">

      <div className="mx-auto max-w-7xl px-4 sm:px-6">

        {/* Heading */}

        <div className="text-center">

          <p className="font-semibold uppercase tracking-[0.25em] text-blue-600">
            Process
          </p>

          <h2 className="mt-3 text-2xl font-bold text-slate-900 md:text-3xl lg:text-4xl">
            How SkillMart Works
          </h2>

          <p className="mx-auto mt-4 max-w-2xl px-2 text-sm text-slate-500 md:px-0 md:text-base">
            Buying premium digital products is fast, secure and effortless.
          </p>

        </div>

        {/* Steps */}

        <div className="mt-10 grid grid-cols-2 gap-4 md:mt-14 md:grid-cols-2 md:gap-6 lg:mt-20 lg:grid-cols-4">

          {steps.map((step) => (

            <div
              key={step.id}
              className="relative rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl md:p-6 lg:rounded-3xl lg:p-8"
            >

              {/* Number */}

              <div className="absolute right-3 top-3 text-3xl font-extrabold text-slate-100 md:right-4 md:top-4 md:text-4xl lg:right-5 lg:top-5 lg:text-5xl">
                {step.id}
              </div>

              {/* Icon */}

              <div
                className={`mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r ${step.color} text-white md:h-14 md:w-14 lg:h-16 lg:w-16 lg:rounded-2xl`}
              >
                {step.icon}
              </div>

              <h3 className="mt-4 text-base font-bold text-slate-900 md:text-lg lg:mt-6 lg:text-xl">
                {step.title}
              </h3>

              <p className="mt-2 text-xs leading-5 text-slate-500 md:text-sm md:leading-6">
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