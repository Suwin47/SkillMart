import { FcGoogle } from "react-icons/fc";

function GoogleButton({ onClick, loading = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={loading}
      className="
        w-full
        h-12
        rounded-xl
        border
        border-slate-300
        bg-white
        flex
        items-center
        justify-center
        gap-3
        font-medium
        text-slate-700
        transition-all
        duration-300
        hover:bg-slate-50
        hover:border-blue-500
        disabled:opacity-60
      "
    >
      <FcGoogle size={22} />

      {loading ? "Signing in..." : "Continue with Google"}
    </button>
  );
}

export default GoogleButton;