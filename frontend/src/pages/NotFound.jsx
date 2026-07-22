import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50">
      <h1 className="text-7xl font-bold text-slate-900">404</h1>

      <p className="mt-4 text-lg text-slate-500">
        Oops! Page not found.
      </p>

      <Link
        to="/"
        className="mt-8 rounded-xl bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
      >
        Go Home
      </Link>
    </div>
  );
}

export default NotFound;