import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

function Input({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  name,
}) {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";

  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-slate-700">
        {label}
      </label>

      <div className="relative">

        <input
          type={
            isPassword
              ? showPassword
                ? "text"
                : "password"
              : type
          }
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="
            w-full
            h-12
            rounded-xl
            border
            border-slate-300
            bg-white
            px-4
            text-sm
            text-slate-800
            outline-none
            transition-all
            duration-200
            focus:border-blue-600
            focus:ring-4
            focus:ring-cyan-100
          "
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
          >
            {showPassword ? (
              <EyeOff size={18} />
            ) : (
              <Eye size={18} />
            )}
          </button>
        )}

      </div>
    </div>
  );
}

export default Input;