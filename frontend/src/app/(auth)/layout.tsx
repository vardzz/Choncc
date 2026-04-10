"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { ChonccIcon } from "@/components/ui/choncc-icon";

const brandingContent = {
  login: {
    badge: "Welcome Back!",
    headline: "Master the pace of development.",
    description:
      "Choncc is a high-performance SDLC platform designed for deep focus and rapid execution. Orchestrate your sprints, manage your backlog, and adapt to any framework without breaking your flow.",
  },
  signup: {
    badge: "Come on and Join us!",
    headline: "Master the pace of development.",
    description:
      "Choncc is a high-performance SDLC platform designed for deep focus and rapid execution. Orchestrate your sprints, manage your backlog, and adapt to any framework without breaking your flow.",
  },
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const isLogin = pathname === "/login";
  const content = isLogin ? brandingContent.login : brandingContent.signup;

  return (
    <main className="relative flex min-h-screen overflow-hidden bg-gradient-to-br from-[#222222] via-[#2A2A2A] to-[#1D1D1D]">
      {/* Ambient Background Elements */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-[8%] top-[-10%] h-[500px] w-[500px] rounded-full bg-[#C2D8C4]/22 blur-[100px]" />
        <div className="absolute bottom-[-12%] right-[8%] h-[500px] w-[500px] rounded-full bg-[#C2D8C4]/14 blur-[100px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(194,216,196,0.12),transparent_30%),radial-gradient(circle_at_bottom,rgba(245,245,245,0.06),transparent_24%)]" />
      </div>

      {/* Left Panel - Branding */}
      <div className="relative z-10 hidden w-1/2 flex-col justify-center px-12 lg:flex">
        {/* Choncc Logo */}
        <div className="mb-16 flex items-center gap-3">
          <ChonccIcon size="lg" />
          <h1 className="text-2xl font-black tracking-tight text-[#F5F5F5]">
            Choncc
          </h1>
        </div>

        {/* Dynamic Branding Content */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-6"
          >
            <div className="inline-flex rounded-full border border-[#C2D8C4]/30 bg-[#C2D8C4]/10 px-4 py-2 backdrop-blur-sm">
              <span className="text-l font-medium text-[#D7E5D8] tracking-wide font-mono">
                {content.badge}
              </span>
            </div>

            <h2 className="max-w-md text-5xl font-black text-[#F5F5F5] tracking-tight leading-tight">
              {content.headline}
            </h2>

            <p className="max-w-md text-base text-[#C8CEC8] leading-relaxed">
              {content.description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Right Panel - Auth Form */}
      <div className="relative z-10 flex w-full flex-col items-center justify-center px-4 py-10 lg:w-1/2">
        <motion.section
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-sm overflow-hidden rounded-3xl border border-[#C2D8C4]/25 bg-[#2A2A2A]/80 p-6 shadow-2xl backdrop-blur-2xl sm:p-8"
        >
          <div className="mb-7 flex flex-col items-center text-center">
            <ChonccIcon size="lg" />
            <h1 className="text-2xl font-black tracking-tight text-[#F5F5F5] [text-shadow:0_0_18px_rgba(194,216,196,0.2)]">
              Choncc
            </h1>
            <p className="mt-1 text-xs uppercase tracking-[0.18em] text-[#C8CEC8]">
              Project Intelligence Platform
            </p>
          </div>

          <div className="mb-6 flex items-center gap-1 rounded-2xl border border-[#C2D8C4]/25 bg-[#222222]/70 p-1">
            <button
              type="button"
              onClick={() => router.push("/login")}
              aria-current={isLogin ? "page" : undefined}
              className={`flex-1 cursor-pointer rounded-xl px-3 py-2 text-xs font-semibold transition-all duration-300 ${
                isLogin
                    ? "bg-[#C2D8C4]/20 text-[#F5F5F5] shadow-sm"
                    : "text-[#9AA39A] hover:text-[#D7E5D8]"
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => router.push("/signup")}
              aria-current={!isLogin ? "page" : undefined}
              className={`flex-1 cursor-pointer rounded-xl px-3 py-2 text-xs font-semibold transition-all duration-300 ${
                !isLogin
                    ? "bg-[#C2D8C4]/20 text-[#F5F5F5] shadow-sm"
                    : "text-[#9AA39A] hover:text-[#D7E5D8]"
              }`}
            >
              Create Account
            </button>
          </div>

          <div className="relative overflow-hidden">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={pathname}
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -60 }}
                transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-[#C2D8C4]/20" />
            <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#9AA39A]">
              OR CONTINUE WITH
            </span>
            <div className="h-px flex-1 bg-[#C2D8C4]/20" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-[#C2D8C4]/30 bg-[#222222]/75 px-4 py-3 text-sm font-medium text-[#E6ECE6] transition hover:bg-[#C2D8C4]/12"
            >
              <GoogleIcon />
              Google
            </button>
            <button
              type="button"
              className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-[#C2D8C4]/30 bg-[#222222]/75 px-4 py-3 text-sm font-medium text-[#E6ECE6] transition hover:bg-[#C2D8C4]/12"
            >
              <GitHubIcon />
              GitHub
            </button>
          </div>
        </motion.section>
      </div>
    </main>
  );
}

function GoogleIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}
