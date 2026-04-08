"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import ChonccLoader from "@/components/layout/choncc-loader";
import {
  ArrowRight,
  CheckCircle2,
  Command,
  LayoutDashboard,
  Minus,
  Moon,
  Plus,
  Star,
  Zap,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const Navbar = () => (
  <nav className="fixed left-0 right-0 top-0 z-50 border-b border-white/5 bg-zinc-950/50 backdrop-blur-xl">
    <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-zinc-200 to-zinc-400">
          <Star className="h-4 w-4 fill-white text-white" />
        </div>
        <span className="text-lg font-bold tracking-tight text-zinc-50">Choncc</span>
      </div>
      <div className="hidden items-center gap-8 text-sm font-medium text-zinc-400 md:flex">
        <a href="#features" className="transition-colors hover:text-zinc-50">Features</a>
        <a href="#how-it-works" className="transition-colors hover:text-zinc-50">Method</a>
        <a href="#pricing" className="transition-colors hover:text-zinc-50">Pricing</a>
      </div>
      <div className="flex items-center gap-4">
        <Link href="/login" className="hidden text-sm font-medium text-zinc-400 transition-colors hover:text-zinc-50 md:block">
          Log in
        </Link>
        <Link href="/signup" className="rounded-full bg-zinc-50 px-4 py-2 text-sm font-medium text-zinc-950 transition-colors hover:bg-zinc-200">
          Get Started
        </Link>
      </div>
    </div>
  </nav>
);

const Hero = () => (
  <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pb-32 pt-40 text-center">
    <div className="pointer-events-none absolute left-[8%] top-[-10%] h-[500px] w-[500px] rounded-full bg-zinc-800/30 blur-[100px]" />
    <div className="pointer-events-none absolute bottom-[-12%] right-[8%] h-[500px] w-[500px] rounded-full bg-zinc-300/10 blur-[100px]" />
    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.05),transparent_28%),radial-gradient(circle_at_bottom,rgba(255,255,255,0.03),transparent_22%)]" />

    <motion.div
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className="relative z-10 mx-auto flex max-w-4xl flex-col items-center"
    >
      <motion.div variants={fadeUp} className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1">
        <span className="h-2 w-2 animate-pulse rounded-full bg-zinc-200" />
        <span className="text-xs font-medium uppercase tracking-wide text-zinc-300">Choncc v2.0 is now live</span>
      </motion.div>

      <motion.h1 variants={fadeUp} className="mb-6 text-5xl font-bold leading-[1.1] tracking-tighter text-zinc-50 md:text-7xl">
        Engineering flow, <br className="hidden md:block" />
        <span className="bg-gradient-to-r from-zinc-50 to-zinc-500 bg-clip-text text-transparent">perfected.</span>
      </motion.h1>

      <motion.p variants={fadeUp} className="mb-10 max-w-2xl text-lg leading-relaxed text-zinc-400 md:text-xl">
        Choncc is the uncompromising project management suite for teams who refuse to settle for bloated software. Keyboard-first,
        stunningly dark, and relentlessly fast.
      </motion.p>

      <motion.div variants={fadeUp} className="flex w-full flex-col items-center justify-center gap-4 sm:flex-row">
        <Link
          href="/signup"
          className="flex w-full items-center justify-center gap-2 rounded-full bg-zinc-50 px-8 py-3.5 font-semibold text-zinc-950 transition-transform duration-300 hover:scale-105 sm:w-auto"
        >
          Start for free <ArrowRight className="h-4 w-4" />
        </Link>
        <Link
          href="/login"
          className="flex w-full items-center justify-center gap-2 rounded-full border border-zinc-800 bg-transparent px-8 py-3.5 font-medium text-zinc-300 transition-colors duration-300 hover:bg-zinc-900 sm:w-auto"
        >
          Book a demo
        </Link>
      </motion.div>
    </motion.div>
  </section>
);

const Features = () => {
  const features = [
    { icon: <Zap />, title: "Lightning Fast", desc: "Built on a modern stack. Issues open in milliseconds. Zero spinners, zero waiting." },
    { icon: <Command />, title: "Keyboard First", desc: "Never touch your mouse. Navigate, assign, and update statuses entirely via command palette." },
    { icon: <Moon />, title: "Native Dark Mode", desc: "Not an afterthought. A meticulously crafted, high-contrast dark aesthetic that reduces eye strain." },
    { icon: <LayoutDashboard />, title: "Automated Sprints", desc: "Velocity tracking and sprint capacity algorithms built right into your core boards." },
  ];

  return (
    <section id="features" className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="mx-auto mb-20 max-w-2xl text-center"
        >
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-zinc-50 md:text-5xl">Design as a feature.</h2>
          <p className="text-lg text-zinc-400">We stripped away the noise so you can focus on the work. Every pixel is optimized for clarity and speed.</p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { delay: index * 0.1 } } }}
              className="group rounded-3xl border border-white/5 bg-zinc-900/50 p-8 transition-colors hover:bg-zinc-900"
            >
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-800 text-zinc-50 transition-transform duration-300 group-hover:scale-110">
                {feature.icon}
              </div>
              <h3 className="mb-3 text-xl font-semibold text-zinc-50">{feature.title}</h3>
              <p className="leading-relaxed text-zinc-400">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const AppPreview = () => (
  <section id="how-it-works" className="relative overflow-hidden bg-zinc-950 py-32">
    <div className="pointer-events-none absolute right-0 top-1/2 h-[600px] w-[600px] rounded-full bg-zinc-300/10 blur-[100px]" />

    <div className="relative z-10 mx-auto max-w-7xl px-6">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-16 text-center">
        <h2 className="mb-4 text-3xl font-bold tracking-tight text-zinc-50 md:text-5xl">The ultimate workspace.</h2>
        <p className="text-lg text-zinc-400">A sneak peek into your team&apos;s new home.</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="flex h-[600px] w-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/90 shadow-2xl backdrop-blur-2xl md:h-[700px]"
      >
        <div className="h-14 shrink-0 border-b border-white/5 bg-zinc-900/20 px-6">
          <div className="flex h-full items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-6 w-6 rounded-md bg-zinc-800" />
              <div className="h-4 w-24 rounded bg-zinc-800/50" />
            </div>
            <div className="flex items-center gap-3">
              <div className="h-6 w-16 rounded-full bg-zinc-800/50" />
              <div className="h-8 w-8 rounded-full bg-zinc-800" />
            </div>
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden">
          <div className="hidden w-56 flex-col gap-6 border-r border-white/5 bg-zinc-900/10 p-4 lg:flex">
            <div className="flex items-center gap-3">
              <div className="h-5 w-5 rounded bg-zinc-800/80" />
              <div className="h-3 w-20 rounded bg-zinc-800/50" />
            </div>
            <div className="h-9 w-full rounded-lg border border-dashed border-zinc-700/50 bg-zinc-800/20" />
            <div className="flex flex-col gap-3">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className={`flex items-center gap-3 rounded-xl p-2 ${item === 1 ? "border border-white/5 bg-zinc-800/40" : "opacity-60"}`}>
                  <div className={`h-10 w-10 rounded-xl ${item === 1 ? "bg-zinc-700" : "bg-zinc-800"}`} />
                  <div className="flex flex-1 flex-col gap-2">
                    <div className="h-3 w-full rounded bg-zinc-700/50" />
                    <div className="h-2 w-2/3 rounded bg-zinc-800/50" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex min-w-0 flex-1 flex-col gap-6 overflow-hidden p-4 md:p-6">
            <div className="flex shrink-0 items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-zinc-800/50" />
                <div className="flex flex-col gap-2">
                  <div className="h-5 w-32 rounded bg-zinc-700/80" />
                  <div className="h-3 w-20 rounded bg-zinc-800/50" />
                </div>
                <div className="h-8 w-8 rounded-lg bg-zinc-800/50" />
              </div>
              <div className="flex flex-col items-end gap-2">
                <div className="h-3 w-24 rounded bg-zinc-800/50" />
                <div className="h-5 w-32 rounded bg-zinc-700/80" />
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-4">
              <div className="h-4 w-4 rounded-sm bg-zinc-800" />
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-zinc-800/50">
                <div className="h-full w-[85%] rounded-full bg-gradient-to-r from-zinc-300/80 to-zinc-100/90" />
              </div>
              <div className="h-4 w-16 rounded bg-zinc-800/50" />
            </div>

            <div className="grid flex-1 grid-cols-2 gap-4 overflow-hidden md:grid-cols-4">
              {["bg-zinc-500", "bg-indigo-500", "bg-amber-500", "bg-emerald-500"].map((color, index) => (
                <div key={color} className="flex flex-col gap-3">
                  <div className="flex items-center justify-between px-2">
                    <div className="flex items-center gap-2">
                      <div className={`h-2 w-2 rounded-full ${color}`} />
                      <div className="h-3 w-16 rounded bg-zinc-700/50" />
                    </div>
                    <div className="h-1 w-4 rounded bg-zinc-800/50" />
                  </div>
                  {[...Array(index === 0 ? 2 : index === 1 ? 2 : 1)].map((_, cardIndex) => (
                    <div key={cardIndex} className="flex w-full flex-col gap-3 rounded-xl border border-white/5 bg-zinc-900/60 p-4 shadow-sm">
                      <div className="h-4 w-12 rounded-md bg-zinc-800" />
                      <div className="flex flex-col gap-1.5">
                        <div className="h-3.5 w-[90%] rounded bg-zinc-700" />
                        <div className="h-3.5 w-[60%] rounded bg-zinc-700" />
                      </div>
                      <div className="flex gap-2">
                        <div className="h-4 w-14 rounded-md bg-zinc-800" />
                        <div className="h-4 w-10 rounded-md bg-zinc-800" />
                      </div>
                      <div className="mt-2 flex items-center justify-between border-t border-white/5 pt-3">
                        <div className="flex items-center gap-2">
                          <div className="h-6 w-6 rounded-full bg-zinc-800" />
                          <div className="h-2 w-12 rounded bg-zinc-800/50" />
                        </div>
                        <div className="h-6 w-6 rounded-md bg-zinc-800/80" />
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="hidden w-72 flex-col gap-6 border-l border-white/5 bg-zinc-900/10 p-4 xl:flex">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-2">
                <div className="h-4 w-20 rounded bg-zinc-700" />
                <div className="h-3 w-12 rounded bg-zinc-800/50" />
              </div>
              <div className="h-6 w-6 rounded bg-zinc-800/50" />
            </div>

            <div className="flex flex-col gap-3">
              <div className="h-3 w-24 rounded bg-zinc-800/50" />
              <div className="h-10 w-full rounded-lg border border-white/5 bg-zinc-900/80" />
              <div className="h-10 w-full rounded-lg border border-white/5 bg-zinc-900/80" />
              <div className="h-10 w-full rounded-lg bg-zinc-800" />
            </div>

            <div className="flex flex-1 flex-col gap-3 overflow-hidden">
              {[1, 2].map((item) => (
                <div key={item} className="flex w-full flex-col gap-3 rounded-xl border border-white/5 bg-zinc-900/60 p-4 shadow-sm">
                  <div className="h-4 w-12 rounded-md bg-zinc-300/20" />
                  <div className="h-3.5 w-[80%] rounded bg-zinc-700" />
                  <div className="flex gap-2">
                    <div className="h-4 w-14 rounded-md bg-zinc-800" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

const Pricing = () => {
  const plans = [
    {
      name: "Starter",
      price: "Free",
      desc: "For individuals and small teams.",
      features: ["Unlimited personal tasks", "Up to 3 collaborators", "Basic Kanban boards", "Community support"],
    },
    {
      name: "Pro",
      price: "$12",
      period: "/mo",
      desc: "For growing product teams.",
      features: ["Unlimited collaborators", "Advanced Sprint tracking", "Custom workflows", "Priority support"],
      highlighted: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      desc: "For large scale organizations.",
      features: ["SSO & SAML", "Dedicated success manager", "Custom SLAs", "On-premise deployment"],
    },
  ];

  return (
    <section id="pricing" className="py-32">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-20 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-zinc-50 md:text-5xl">Simple, transparent pricing.</h2>
          <p className="text-lg text-zinc-400">Invest in your team&apos;s velocity.</p>
        </motion.div>

        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative flex flex-col rounded-3xl border p-8 ${plan.highlighted ? "border-zinc-300/40 bg-zinc-900 shadow-2xl shadow-white/5" : "border-white/5 bg-zinc-900/30"}`}
            >
              {plan.highlighted ? (
                <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-zinc-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-zinc-950">
                  Most Popular
                </div>
              ) : null}
              <h3 className="mb-2 text-xl font-medium text-zinc-50">{plan.name}</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold text-zinc-50">{plan.price}</span>
                {plan.period ? <span className="text-zinc-400">{plan.period}</span> : null}
              </div>
              <p className="mb-8 border-b border-white/5 pb-8 text-sm text-zinc-400">{plan.desc}</p>
              <ul className="mb-8 flex-1 space-y-4">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm text-zinc-300">
                    <CheckCircle2 className="h-4 w-4 text-zinc-200" /> {feature}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                className={`w-full rounded-xl py-3 font-medium transition-colors ${plan.highlighted ? "bg-zinc-50 text-zinc-950 hover:bg-zinc-200" : "bg-zinc-800 text-zinc-50 hover:bg-zinc-700"}`}
              >
                {plan.name === "Enterprise" ? "Contact Sales" : "Get Started"}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FAQ = () => {
  const faqs = [
    {
      q: "How is Choncc different from Jira?",
      a: "Choncc is built for speed and aesthetics. We removed the clutter, implemented full keyboard navigation, and focused strictly on what elite teams need to ship fast, without the administrative overhead.",
    },
    { q: "Can I import my existing tasks?", a: "Yes. Choncc offers one-click imports from Jira, Asana, Linear, and Trello." },
    { q: "Is there a dark mode?", a: "Choncc is dark-mode native. We designed it specifically for low-light developer environments, utilizing a luxurious zinc color palette." },
    { q: "Do you offer a free trial?", a: "Our Starter plan is completely free forever for small teams. No credit card required." },
  ];

  const [open, setOpen] = useState(0);

  return (
    <section className="border-t border-white/5 bg-zinc-900/20 py-32">
      <div className="mx-auto max-w-3xl px-6">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-50">Frequently Asked Questions</h2>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={faq.q}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="overflow-hidden rounded-2xl border border-white/5 bg-zinc-900/50"
            >
              <button
                type="button"
                onClick={() => setOpen(open === index ? -1 : index)}
                className="flex w-full items-center justify-between px-6 py-5 text-left font-medium text-zinc-50 transition-colors hover:bg-zinc-800/50"
              >
                {faq.q}
                {open === index ? <Minus className="h-4 w-4 text-zinc-400" /> : <Plus className="h-4 w-4 text-zinc-400" />}
              </button>
              <AnimatePresence>
                {open === index ? (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-6 pb-5 text-sm leading-relaxed text-zinc-400"
                  >
                    {faq.a}
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="border-t border-white/5 bg-zinc-950 py-12">
    <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 md:flex-row">
      <div className="flex items-center gap-2">
        <Star className="h-4 w-4 fill-zinc-50 text-zinc-50" />
        <span className="font-bold tracking-tight text-zinc-50">Choncc</span>
      </div>
      <div className="text-sm text-zinc-500">© {new Date().getFullYear()} Choncc Inc. All rights reserved.</div>
      <div className="flex gap-6 text-sm font-medium text-zinc-400">
        <a href="#" className="transition-colors hover:text-zinc-50">Twitter</a>
        <a href="#" className="transition-colors hover:text-zinc-50">GitHub</a>
        <a href="#" className="transition-colors hover:text-zinc-50">Terms</a>
      </div>
    </div>
  </footer>
);

export default function LandingPage() {
  const [isBootLoading, setIsBootLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsBootLoading(false);
    }, 2000);

    return () => window.clearTimeout(timer);
  }, []);

  if (isBootLoading) {
    return <ChonccLoader />;
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-zinc-950 via-zinc-900 to-black font-sans text-zinc-50 selection:bg-zinc-200/30 selection:text-zinc-100">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-[8%] top-[-10%] h-[500px] w-[500px] rounded-full bg-zinc-800/30 blur-[100px]" />
        <div className="absolute bottom-[-12%] right-[8%] h-[500px] w-[500px] rounded-full bg-zinc-300/10 blur-[100px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.05),transparent_28%),radial-gradient(circle_at_bottom,rgba(255,255,255,0.03),transparent_22%)]" />
      </div>
      <Navbar />
      <div className="relative z-10">
        <Hero />
        <Features />
        <AppPreview />
        <Pricing />
        <FAQ />
        <Footer />
      </div>
    </div>
  );
}
