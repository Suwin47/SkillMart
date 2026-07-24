function DashboardLayout({ title, subtitle, children }) {
  return (
    <main className="p-4 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold md:text-4xl">
          {title}
        </h1>

        <p className="mt-2 text-slate-500">
          {subtitle}
        </p>
      </div>

      {children}
    </main>
  );
}

export default DashboardLayout;