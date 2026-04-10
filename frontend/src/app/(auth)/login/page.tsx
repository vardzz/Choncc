"use client";

import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

const inputClassName =
  "w-full rounded-xl border border-[#C2D8C4]/22 bg-[#222222]/70 py-3 pl-10 pr-10 text-sm text-[#F5F5F5] placeholder:text-[#8F9990] outline-none transition duration-200 focus:border-[#C2D8C4]/55 focus:bg-[#2A2A2A] focus:ring-0";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push("/workspace");
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <label className="sr-only" htmlFor="login-email">
          Email address
        </label>
        <div className="relative">
          <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8F9990]" aria-hidden="true" />
          <input
            id="login-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="Email address"
            className={inputClassName}
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="sr-only" htmlFor="login-password">
          Password
        </label>
        <div className="relative">
          <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8F9990]" aria-hidden="true" />
          <input
            id="login-password"
            name="password"
            type={showPassword ? "text" : "password"}
            required
            autoComplete="current-password"
            placeholder="Password"
            className={inputClassName}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-[#8F9990] transition hover:text-[#D7E5D8]"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <div className="flex justify-end">
        <a href="#" className="cursor-pointer text-[11px] text-[#AEB8AE] transition hover:text-[#D7E5D8]">
          Forgot password?
        </a>
      </div>

      <button
        type="submit"
        className="mt-1 w-full cursor-pointer rounded-xl bg-[#C2D8C4] py-3 text-sm font-bold tracking-wide text-[#222222] shadow-lg transition-all duration-200 hover:bg-[#D7E5D8] focus:ring-2 focus:ring-[#C2D8C4]/40"
      >
        Sign In
      </button>
    </form>
  );
}
