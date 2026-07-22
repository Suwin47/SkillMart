import { Loader2 } from "lucide-react";

function Button({
  children,
  type = "button",
  variant = "primary",
  loading = false,
  disabled = false,
  onClick,
  className = "",
}) {
  const baseStyle =
    "w-full h-12 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2";

  const variants = {
    primary:
      "bg-blue-600 text-white hover:bg-blue-700 active:scale-[0.98]",

    secondary:
      "bg-cyan-500 text-white hover:bg-cyan-600 active:scale-[0.98]",

    outline:
      "border border-slate-300 bg-white text-slate-700 hover:bg-slate-100",

    danger:
      "bg-red-600 text-white hover:bg-red-700",
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`${baseStyle} ${variants[variant]} ${
        disabled ? "opacity-60 cursor-not-allowed" : ""
      } ${className}`}
    >
      {loading && (
        <Loader2
          size={18}
          className="animate-spin"
        />
      )}

      {children}
    </button>
  );
}

export default Button;