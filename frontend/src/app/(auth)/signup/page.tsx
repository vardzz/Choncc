"use client";

import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import { useState } from "react";

const inputClassName =
  "w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-10 pr-10 text-sm text-zinc-100 placeholder:text-zinc-500 outline-none transition duration-200 focus:border-zinc-300 focus:bg-white/10 focus:ring-0";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form className="space-y-4" action="#" method="post">
      <div className="space-y-2">
        <label className="sr-only" htmlFor="signup-name">
          Full name
        </label>
        <div className="relative">
          <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" aria-hidden="true" />
          <input
            id="signup-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Full name"
            className={inputClassName}
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="sr-only" htmlFor="signup-email">
          Email address
        </label>
        <div className="relative">
          <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" aria-hidden="true" />
          <input
            id="signup-email"
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
        <label className="sr-only" htmlFor="signup-password">
          Password
        </label>
        <div className="relative">
          <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" aria-hidden="true" />
          <input
            id="signup-password"
            name="password"
            type={showPassword ? "text" : "password"}
            required
            autoComplete="new-password"
            placeholder="Password"
            className={inputClassName}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-zinc-500 transition hover:text-zinc-200"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <button
        type="submit"
        className="mt-1 w-full cursor-pointer rounded-xl bg-zinc-100 py-3 text-sm font-bold tracking-wide text-zinc-950 shadow-lg transition-all duration-200 hover:bg-white focus:ring-2 focus:ring-zinc-200/40"
      >
        Create Account
      </button>
    </form>
  );
}
