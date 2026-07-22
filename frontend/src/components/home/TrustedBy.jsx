function TrustedBy() {
  const companies = [
    "React",
    "Figma",
    "Tailwind CSS",
    "Node.js",
    "MongoDB",
    "Next.js",
  ];

  return (
    <section className="bg-white py-16 border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-6">

        <p className="text-center text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
          Trusted by creators using
        </p>

        <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">

          {companies.map((company) => (
            <div
              key={company}
              className="rounded-2xl border border-slate-200 bg-slate-50 py-5 text-center font-semibold text-slate-700 transition hover:bg-blue-50 hover:text-blue-600"
            >
              {company}
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default TrustedBy;