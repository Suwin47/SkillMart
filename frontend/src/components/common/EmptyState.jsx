import { Link } from "react-router-dom";

function EmptyState({
  icon = "📦",
  title,
  description,
  buttonText,
  buttonLink,
}) {
  return (
    <div className="flex min-h-[350px] flex-col items-center justify-center rounded-2xl bg-white p-10 shadow">

      <div className="text-7xl">
        {icon}
      </div>

      <h2 className="mt-6 text-3xl font-bold text-slate-800">
        {title}
      </h2>

      <p className="mt-3 max-w-md text-center text-slate-500">
        {description}
      </p>

      {buttonText && buttonLink && (
        <Link
          to={buttonLink}
          className="mt-8 rounded-xl bg-blue-600 px-8 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          {buttonText}
        </Link>
      )}
    </div>
  );
}

export default EmptyState;