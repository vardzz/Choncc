import { Eye, Lock, Mail } from "lucide-react";

const inputClassName =
  "w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-10 pr-10 text-sm text-zinc-100 placeholder:text-zinc-500 outline-none transition duration-200 focus:border-zinc-300 focus:bg-white/10 focus:ring-0";

export default function LoginPage() {
  return (
    <form className="space-y-4" action="#" method="post">
      <div className="space-y-2">
        <label className="sr-only" htmlFor="login-email">
          Email address
        </label>
        <div className="relative">
          <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" aria-hidden="true" />
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
          <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" aria-hidden="true" />
          <input
            id="login-password"
            name="password"
            type="password"
            required
            autoComplete="current-password"
            placeholder="Password"
            className={inputClassName}
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 transition hover:text-zinc-200"
            aria-label="Show password"
          >
            <Eye className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="flex justify-end">
        <a href="#" className="text-[11px] text-zinc-400 transition hover:text-zinc-200">
          Forgot password?
        </a>
      </div>

      <button
        type="submit"
        className="mt-1 w-full rounded-xl bg-zinc-100 py-3 text-sm font-bold tracking-wide text-zinc-950 shadow-lg transition-all duration-200 hover:bg-white focus:ring-2 focus:ring-zinc-200/40"
      >
        Sign In
      </button>
    </form>
  );
}
