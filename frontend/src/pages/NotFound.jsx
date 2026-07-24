import { Link } from "react-router-dom";
import { AlertTriangle, Home } from "lucide-react";

function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50 px-6">

      <div className="w-full max-w-lg rounded-3xl bg-white p-10 text-center shadow-2xl">

        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-red-100">
          <AlertTriangle
            size={50}
            className="text-red-500"
          />
        </div>

        <h1 className="mt-8 text-7xl font-extrabold text-slate-900">
          404
        </h1>

        <h2 className="mt-4 text-3xl font-bold text-slate-800">
          Page Not Found
        </h2>

        <p className="mt-4 text-lg leading-8 text-slate-500">
          Sorry, the page you're looking for doesn't exist
          or may have been moved.
        </p>

        <Link
          to="/"
          className="mt-10 inline-flex items-center gap-3 rounded-2xl bg-blue-600 px-8 py-4 font-semibold text-white transition duration-300 hover:scale-105 hover:bg-blue-700"
        >
          <Home size={20} />
          Back to Home
        </Link>

      </div>

    </div>
  );
}

export default NotFound;