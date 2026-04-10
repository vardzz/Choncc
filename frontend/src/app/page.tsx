"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import {
  ArrowRight, ArrowUpRight, CheckCircle2, Command,
  Gauge, LayoutDashboard, Layers3, Minus, MoveRight,
  Plus, ShieldCheck, Timer, Zap, Hexagon
} from "lucide-react";
import ChonccLoader from "@/components/layout/choncc-loader";

// --- GLOBAL CONFIG & COLOR PALETTE ---
const premiumEase: [number, number, number, number] = [0.22, 1, 0.36, 1];
const COAL = "#222222";
const COAL_LIGHT = "#2A2A2A";
const MATCHA = "#C2D8C4";
const OFF_WHITE = "#F5F5F5";

// --- DATA ---
const trustSignals = [
  "Privacy-first architecture",
  "Supabase Auth + tenant isolation",
  "RLS-backed authorization",
  "Next.js + TypeScript runtime",
  "Vercel-ready deployment",
];

const architectureGroups = [
  { title: "Plan", icon: Layers3, items: ["Multi-workspace architecture", "Backlog prioritization and estimates"] },
  { title: "Execute", icon: MoveRight, items: ["3-pane deep-focus interface", "Drag-and-drop board workflow"] },
  { title: "Govern", icon: ShieldCheck, items: ["RBAC: Project Manager and Developer", "Tenant-aware data boundaries"] },
  { title: "Optimize", icon: Gauge, items: ["Capacity and load tracking", "Velocity and workflow metrics"] },
];

// --- INLINE LUXURY UI COMPONENTS ---
type MotionRevealProps = {
  children: React.ReactNode;
  delay?: number;
  className?: string;
};

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

const MotionReveal = ({ children, delay = 0, className = "" }: MotionRevealProps) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.8, delay, ease: premiumEase }}
    className={className}
  >
    {children}
  </motion.div>
);

const SectionHeading = ({ eyebrow, title, description, align = "left" }: SectionHeadingProps) => (
  <div className={`flex flex-col ${align === "center" ? "items-center text-center mx-auto" : "items-start text-left"}`}>
    {eyebrow && (
      <span 
        className="text-xs font-bold uppercase tracking-[0.2em] mb-4"
        style={{ color: MATCHA }}
      >
        {eyebrow}
      </span>
    )}
    <h2 className="text-4xl md:text-6xl font-medium tracking-tight mb-6 text-[#F5F5F5]">
      {title}
    </h2>
    {description && (
      <p className="text-[#A0A0A0] text-lg md:text-xl max-w-2xl leading-relaxed font-light">
        {description}
      </p>
    )}
  </div>
);

// --- SECTIONS ---

function ScrollProgressIndicator() {
  const { scrollYProgress } = useScroll();
  const reducedMotion = useReducedMotion();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 40, restDelta: 0.001 });

  return (
    <div className="pointer-events-none fixed left-0 top-0 z-[60] h-[3px] w-full bg-transparent">
      <motion.div className="h-full origin-left" style={{ scaleX: reducedMotion ? scrollYProgress : scaleX, backgroundColor: MATCHA }} />
    </div>
  );
}

const Navbar = () => (
  <div className="fixed left-0 right-0 top-6 z-50 flex justify-center px-6">
    <nav className="flex h-16 w-full max-w-5xl items-center justify-between rounded-full px-6 backdrop-blur-xl border" style={{ backgroundColor: `${COAL}E6`, borderColor: `${MATCHA}33` }}>
      <div className="flex items-center gap-2">
        <Hexagon className="w-6 h-6" style={{ color: MATCHA, fill: MATCHA }} />
        <span className="text-lg font-semibold tracking-tight text-[#F5F5F5]">Choncc</span>
      </div>
      <div className="hidden items-center gap-8 text-sm font-medium text-[#A0A0A0] md:flex">
        <a href="#features" className="hover:text-[#F5F5F5] transition-colors">Features</a>
        <a href="#how-it-works" className="hover:text-[#F5F5F5] transition-colors">Method</a>
        <a href="#security" className="hover:text-[#F5F5F5] transition-colors">Security</a>
        <a href="#pricing" className="hover:text-[#F5F5F5] transition-colors">Pricing</a>
      </div>
      <div className="flex items-center gap-4">
        <a href="/login" className="hidden text-sm font-medium text-[#A0A0A0] hover:text-[#F5F5F5] md:block transition-colors">Log in</a>
        <a href="/signup" className="rounded-full px-5 py-2.5 text-sm font-bold transition-transform hover:scale-105" style={{ backgroundColor: MATCHA, color: COAL }}>
          Get Started
        </a>
      </div>
    </nav>
  </div>
);

const HeroShowcase = () => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: 0.1, delayChildren: 0.15 },
        },
      }}
      className="relative mx-auto flex aspect-square w-full max-w-lg max-h-[62svh] flex-col overflow-hidden rounded-[3rem] border p-5 shadow-2xl md:aspect-[4/3] md:max-h-[60svh] md:p-7 lg:mx-0 lg:w-full lg:max-w-none lg:aspect-[1.1/1] lg:max-h-[66svh]"
      style={{ backgroundColor: `${COAL_LIGHT}66`, borderColor: `${MATCHA}1A` }}
    >
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[72%] w-[72%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[100px]"
        style={{ backgroundColor: `${MATCHA}22` }}
      />

      <motion.div
        variants={{ hidden: { opacity: 0, y: -18 }, visible: { opacity: 1, y: 0 } }}
        transition={{ duration: 0.8, ease: premiumEase }}
        className="absolute right-5 top-5 z-20 w-56 rounded-[1.3rem] border p-4 shadow-[0_18px_40px_rgba(0,0,0,0.45)] backdrop-blur-xl md:right-7 md:top-7"
        style={{ backgroundColor: `${COAL_LIGHT}E6`, borderColor: `${MATCHA}33` }}
      >
        <div className="mb-3 h-2 w-14 rounded-full" style={{ backgroundColor: "#A0A0A066" }} />
        <div className="mb-4 h-6 w-28 rounded-full" style={{ backgroundColor: OFF_WHITE }} />
        <div className="h-1.5 w-full rounded-full" style={{ backgroundColor: `${COAL}CC` }}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "82%" }}
            transition={{ duration: 1.6, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="h-full rounded-full shadow-[0_0_14px_rgba(194,216,196,0.55)]"
            style={{ backgroundColor: MATCHA }}
          />
        </div>
      </motion.div>

      <div className="relative z-10 mt-14 flex min-h-0 flex-1 gap-4 md:mt-16 md:gap-5">
        <motion.div
          variants={{ hidden: { opacity: 0, x: -22 }, visible: { opacity: 1, x: 0 } }}
          transition={{ duration: 0.85, ease: premiumEase }}
          className="hidden w-16 shrink-0 flex-col gap-2 rounded-2xl border p-2 md:flex"
          style={{ backgroundColor: `${COAL}B3`, borderColor: `${MATCHA}1A` }}
        >
          <div className="h-8 rounded-xl" style={{ backgroundColor: `${MATCHA}2B` }} />
          <div className="h-8 rounded-xl" style={{ backgroundColor: `${OFF_WHITE}1F` }} />
          <div className="h-8 rounded-xl" style={{ backgroundColor: `${OFF_WHITE}17` }} />
          <div className="h-8 rounded-xl" style={{ backgroundColor: `${OFF_WHITE}14` }} />
        </motion.div>

        <motion.div
          variants={{ hidden: { opacity: 0, x: -16 }, visible: { opacity: 1, x: 0 } }}
          transition={{ duration: 0.85, ease: premiumEase }}
          className="hidden w-[32%] min-w-[150px] flex-col gap-3 rounded-2xl border p-3 lg:flex"
          style={{ backgroundColor: `${COAL}CC`, borderColor: `${MATCHA}1A` }}
        >
          <div className="h-3 w-20 rounded-full" style={{ backgroundColor: "#A0A0A066" }} />
          <div className="h-10 rounded-xl border" style={{ backgroundColor: `${COAL_LIGHT}D9`, borderColor: `${MATCHA}17` }} />
          <div className="h-10 rounded-xl border" style={{ backgroundColor: `${COAL_LIGHT}D9`, borderColor: `${MATCHA}17` }} />
          <div className="h-16 rounded-2xl border p-3" style={{ backgroundColor: `${COAL_LIGHT}E6`, borderColor: `${MATCHA}14` }}>
            <div className="h-2 w-11 rounded-full" style={{ backgroundColor: MATCHA }} />
            <div className="mt-2 h-2.5 w-4/5 rounded-full" style={{ backgroundColor: OFF_WHITE }} />
          </div>
          <div className="h-16 rounded-2xl border p-3" style={{ backgroundColor: `${COAL_LIGHT}E6`, borderColor: `${MATCHA}14` }}>
            <div className="h-2 w-9 rounded-full" style={{ backgroundColor: `${OFF_WHITE}30` }} />
            <div className="mt-2 h-2.5 w-3/5 rounded-full" style={{ backgroundColor: OFF_WHITE }} />
          </div>
        </motion.div>

        <motion.div
          variants={{ hidden: { opacity: 0, x: 18 }, visible: { opacity: 1, x: 0 } }}
          transition={{ duration: 0.9, ease: premiumEase }}
          className="flex min-w-0 flex-1 flex-col rounded-[1.7rem] border p-3 md:p-4"
          style={{ backgroundColor: `${COAL}E0`, borderColor: `${MATCHA}1A` }}
        >
          <div className="mb-3 flex items-center justify-between">
            <div className="h-3 w-24 rounded-full" style={{ backgroundColor: `${OFF_WHITE}45` }} />
            <div className="h-6 w-6 rounded-lg" style={{ backgroundColor: `${MATCHA}33` }} />
          </div>

          <div className="grid min-h-0 flex-1 grid-cols-2 gap-3 md:grid-cols-3">
            {[0, 1, 2].map((col) => (
              <motion.div
                key={col}
                variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.8, ease: premiumEase }}
                className="flex min-h-0 flex-col gap-2"
              >
                <div className="h-2.5 w-14 rounded-full" style={{ backgroundColor: `${OFF_WHITE}45` }} />

                {col === 1 ? (
                  <motion.div
                    animate={{ y: [-5, 5, -5] }}
                    transition={{ duration: 4.6, repeat: Infinity, ease: "easeInOut" }}
                    className="rounded-2xl border p-3 shadow-[0_0_15px_rgba(194,216,196,0.3)]"
                    style={{ backgroundColor: COAL_LIGHT, borderColor: MATCHA }}
                  >
                    <div className="mb-2 h-2 w-11 rounded-full" style={{ backgroundColor: MATCHA }} />
                    <div className="mb-2 h-2.5 w-full rounded-full" style={{ backgroundColor: OFF_WHITE }} />
                    <div className="mb-3 h-2.5 w-3/5 rounded-full" style={{ backgroundColor: OFF_WHITE }} />
                    <div className="flex items-center justify-between border-t pt-2" style={{ borderColor: `${MATCHA}1F` }}>
                      <div className="h-5 w-5 rounded-full" style={{ backgroundColor: `${OFF_WHITE}29` }} />
                      <div className="h-5 w-5 rounded-md" style={{ backgroundColor: `${MATCHA}4D` }} />
                    </div>
                  </motion.div>
                ) : (
                  <div className="rounded-2xl border p-3" style={{ backgroundColor: COAL_LIGHT, borderColor: `${MATCHA}14` }}>
                    <div className="mb-2 h-2 w-10 rounded-full" style={{ backgroundColor: col === 0 ? MATCHA : `${OFF_WHITE}2E` }} />
                    <div className="mb-2 h-2.5 w-full rounded-full" style={{ backgroundColor: OFF_WHITE }} />
                    <div className="h-2.5 w-3/5 rounded-full" style={{ backgroundColor: OFF_WHITE }} />
                  </div>
                )}

                <div className="rounded-2xl border p-3" style={{ backgroundColor: `${COAL_LIGHT}E6`, borderColor: `${MATCHA}14` }}>
                  <div className="mb-2 h-2 w-8 rounded-full" style={{ backgroundColor: `${OFF_WHITE}24` }} />
                  <div className="mb-2 h-2.5 w-full rounded-full" style={{ backgroundColor: OFF_WHITE }} />
                  <div className="h-2.5 w-2/3 rounded-full" style={{ backgroundColor: OFF_WHITE }} />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

const Hero = () => {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden px-6 pb-8 pt-24 lg:pt-28">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-10">
        
        {/* Left Side: Typography & CTAs */}
        <div className="z-10 flex flex-col items-start text-left">
          <motion.div
            className="mb-8 inline-flex items-center gap-3 rounded-full px-4 py-2 border"
            style={{ backgroundColor: `${COAL_LIGHT}80`, borderColor: `${MATCHA}33` }}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: premiumEase }}
          >
            <span className="h-2 w-2 rounded-full animate-pulse" style={{ backgroundColor: MATCHA }} />
            <span className="text-xs font-bold uppercase tracking-[0.15em]" style={{ color: MATCHA }}>Privacy-first SDLC</span>
          </motion.div>

          <motion.h1
            className="text-5xl sm:text-6xl font-medium leading-[1.05] tracking-tighter text-[#F5F5F5] lg:text-7xl xl:text-8xl"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 1, ease: premiumEase }}
          >
            Deep focus,
            <br />
            <span style={{ color: MATCHA }}>perfected.</span>
          </motion.h1>

          <motion.p
            className="mt-8 max-w-xl text-lg md:text-xl leading-relaxed text-[#A0A0A0] font-light"
            initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 1, ease: premiumEase }}
          >
            Choncc unifies backlog planning, sprint execution, and board flow into a single minimalist workspace. Drop the noise, keep the momentum.
          </motion.p>

          <motion.div
            className="mt-12 flex w-full flex-col gap-4 sm:flex-row justify-start"
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 1, ease: premiumEase }}
          >
            <a href="/signup" className="flex items-center justify-center gap-2 rounded-full px-8 py-4 font-bold transition-transform duration-300 hover:scale-105" style={{ backgroundColor: MATCHA, color: COAL }}>
              Start building <ArrowRight className="h-5 w-5" />
            </a>
            <a href="/login" className="flex items-center justify-center gap-2 rounded-full border px-8 py-4 font-medium transition-colors duration-300 hover:bg-white/5" style={{ borderColor: `${MATCHA}40`, color: OFF_WHITE }}>
              Explore workspace <ArrowUpRight className="h-5 w-5" />
            </a>
          </motion.div>
        </div>

        {/* Right Side: Unique UI Feature Showcase */}
        <div className="relative w-full">
          <MotionReveal delay={0.2}>
            <HeroShowcase />
          </MotionReveal>
        </div>

      </div>
    </section>
  );
};

const TrustProofBar = () => (
  <section className="py-10 overflow-hidden flex items-center border-y" style={{ borderColor: `${MATCHA}15`, backgroundColor: `${COAL_LIGHT}40` }}>
    <MotionReveal className="w-full">
      <div 
        className="relative flex w-full max-w-7xl mx-auto"
        style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}
      >
        <motion.div
          className="flex w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 30, ease: "linear", repeat: Infinity }}
        >
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex gap-16 pr-16 w-max items-center">
              {trustSignals.map((signal, index) => (
                <div key={`${i}-${index}`} className="flex items-center gap-3 whitespace-nowrap">
                  <CheckCircle2 className="w-5 h-5 shrink-0" style={{ color: MATCHA }} />
                  <span className="text-sm font-semibold tracking-wide text-[#A0A0A0] uppercase">{signal}</span>
                </div>
              ))}
            </div>
          ))}
        </motion.div>
      </div>
    </MotionReveal>
  </section>
);

const AppPreview = () => (
  <section id="workspace-preview" className="relative overflow-hidden py-32">
    <div className="relative z-10 mx-auto max-w-7xl px-6">
      <MotionReveal className="mb-20 text-center">
        <SectionHeading
          align="center"
          eyebrow="The Interface"
          title="The 3-Pane Triage Workflow."
          description="Navigation, backlog grooming, and sprint execution seamlessly unified side-by-side in a zero-distraction environment."
        />
      </MotionReveal>

      <motion.div
        initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: premiumEase }} viewport={{ once: true }}
        className="flex h-[600px] md:h-[750px] w-full flex-col overflow-hidden rounded-[2.5rem] shadow-2xl border"
        style={{ backgroundColor: COAL_LIGHT, borderColor: `${MATCHA}20` }}
      >
        {/* Soft Navbar Mock */}
        <div className="h-16 shrink-0 border-b px-6 flex items-center justify-between" style={{ borderColor: `${MATCHA}10` }}>
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: `${OFF_WHITE}20` }}/>
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: `${OFF_WHITE}20` }}/>
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: `${OFF_WHITE}20` }}/>
          </div>
          <div className="w-48 h-6 rounded-full" style={{ backgroundColor: `${OFF_WHITE}05` }} />
          <div className="w-8 h-8 rounded-full" style={{ backgroundColor: MATCHA }} />
        </div>

        {/* 3-Pane Body */}
        <div className="flex flex-1 overflow-hidden">
          {/* Pane 1: Workspace Sidebar */}
          <div className="hidden w-64 flex-col gap-6 border-r p-6 lg:flex" style={{ borderColor: `${MATCHA}10`, backgroundColor: `${COAL}40` }}>
            <div className="w-full h-10 rounded-xl mb-4" style={{ backgroundColor: `${MATCHA}15` }} />
            {[1, 2, 3].map(i => (
              <div key={i} className={`flex gap-4 items-center ${i === 1 ? 'opacity-100' : 'opacity-40'}`}>
                <div className="w-8 h-8 rounded-lg" style={{ backgroundColor: i===1 ? MATCHA : `${OFF_WHITE}20` }} />
                <div className="w-24 h-3 rounded" style={{ backgroundColor: OFF_WHITE }} />
              </div>
            ))}
          </div>

          {/* Pane 2: Backlog Middleware */}
          <div className="hidden w-80 flex-col gap-4 border-r p-6 xl:flex" style={{ borderColor: `${MATCHA}10` }}>
            <div className="w-24 h-4 rounded mb-4" style={{ backgroundColor: OFF_WHITE }} />
            <div className="w-full h-12 rounded-xl border" style={{ backgroundColor: `${COAL}80`, borderColor: `${MATCHA}10` }} />
            <div className="w-full h-12 rounded-xl border mb-6" style={{ backgroundColor: `${COAL}80`, borderColor: `${MATCHA}10` }} />
            {[1, 2, 3].map(i => (
              <div key={i} className="w-full rounded-2xl p-5 flex flex-col gap-4 border" style={{ backgroundColor: COAL, borderColor: `${MATCHA}05` }}>
                <div className="w-12 h-3 rounded-full" style={{ backgroundColor: MATCHA }} />
                <div className="w-[80%] h-4 rounded" style={{ backgroundColor: OFF_WHITE }} />
              </div>
            ))}
          </div>

          {/* Pane 3: Main Kanban */}
          <div className="flex flex-1 flex-col p-8 gap-8 relative overflow-hidden bg-[#222222]">
            {/* Soft Timer Widget */}
            <div className="absolute top-8 right-8 w-56 rounded-2xl border p-5 shadow-xl" style={{ backgroundColor: COAL_LIGHT, borderColor: `${MATCHA}20` }}>
               <div className="w-16 h-2 rounded mb-3" style={{ backgroundColor: `${OFF_WHITE}40` }} />
               <div className="w-32 h-8 rounded" style={{ backgroundColor: OFF_WHITE }} />
               <div className="w-full h-1.5 rounded-full mt-5" style={{ backgroundColor: `${COAL}80` }}>
                 <div className="w-[80%] h-full rounded-full" style={{ backgroundColor: MATCHA }} />
               </div>
            </div>

            <div className="w-32 h-6 rounded mb-8 mt-2" style={{ backgroundColor: `${OFF_WHITE}20` }} />

            {/* Kanban Columns */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 flex-1">
              {[1, 2, 3, 4].map(col => (
                <div key={col} className="flex flex-col gap-4">
                  <div className="w-20 h-3 rounded mb-2" style={{ backgroundColor: `${OFF_WHITE}40` }} />
                  {[...Array(col === 1 ? 2 : col === 2 ? 3 : 1)].map((_, cIdx) => (
                    <div key={cIdx} className="w-full rounded-2xl p-5 flex flex-col gap-4 border" style={{ backgroundColor: COAL_LIGHT, borderColor: `${MATCHA}10` }}>
                      <div className="w-10 h-3 rounded-full" style={{ backgroundColor: col===1 ? MATCHA : `${OFF_WHITE}20` }} />
                      <div className="w-full h-4 rounded" style={{ backgroundColor: OFF_WHITE }} />
                      <div className="w-[60%] h-4 rounded" style={{ backgroundColor: OFF_WHITE }} />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

const Features = () => {
  const featureList = [
    { icon: Zap, title: "Deep-focus shell", desc: "Three-pane architecture keeps navigation, sprint board, and backlog visible and tightly connected." },
    { icon: Command, title: "Execution-first", desc: "Keyboard-first control patterns and drag-and-drop operations keep high-frequency actions frictionless." },
    { icon: Timer, title: "Sprint awareness", desc: "Track sprint time and capacity in one place to preserve realistic commitments and reduce drift." },
    { icon: LayoutDashboard, title: "Lifecycle control", desc: "Move sprint states from planned to archived with role-aware controls and clear workflow boundaries." },
  ];

  return (
    <section id="features" className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <MotionReveal>
          <SectionHeading
            eyebrow="Features"
            title="A foundation built for speed."
            description="Designed as a premium operator console for SDLC delivery: clear, fast, and intentionally constrained."
          />
        </MotionReveal>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {featureList.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <MotionReveal key={feature.title} delay={index * 0.1}>
                <article className="group h-full rounded-[2.5rem] p-10 transition-colors duration-500 border" style={{ backgroundColor: COAL_LIGHT, borderColor: `${MATCHA}15` }}>
                  <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl" style={{ backgroundColor: `${MATCHA}20` }}>
                    <Icon className="h-7 w-7" style={{ color: MATCHA }} />
                  </div>
                  <h3 className="mb-4 text-2xl font-medium tracking-tight text-[#F5F5F5]">{feature.title}</h3>
                  <p className="leading-relaxed text-[#A0A0A0] font-light text-lg">{feature.desc}</p>
                </article>
              </MotionReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const FeatureArchitectureGrid = () => (
  <section className="py-32">
    <div className="mx-auto max-w-7xl px-6">
      <MotionReveal>
        <SectionHeading
          eyebrow="Architecture"
          title="Plan, execute, govern, optimize."
        />
      </MotionReveal>

      <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {architectureGroups.map((group, index) => {
          const Icon = group.icon;
          return (
            <MotionReveal key={group.title} delay={index * 0.1}>
              <article className="h-full rounded-[2rem] p-8 border" style={{ backgroundColor: COAL_LIGHT, borderColor: `${MATCHA}10` }}>
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl" style={{ backgroundColor: `${MATCHA}15` }}>
                  <Icon className="h-6 w-6" style={{ color: MATCHA }} />
                </div>
                <h3 className="text-xl font-medium tracking-tight text-[#F5F5F5]">{group.title}</h3>
                <ul className="mt-6 space-y-4 text-sm text-[#A0A0A0] font-light">
                  {group.items.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <div className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: MATCHA }} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </MotionReveal>
          );
        })}
      </div>
    </div>
  </section>
);

const Pricing = () => {
  const plans = [
    { name: "Starter", price: "Free", desc: "For solo builders validating flow.", features: ["Single workspace", "Backlog and sprint basics", "3-pane workspace shell", "Community support"] },
    { name: "Pro", price: "$12", period: "/mo", desc: "For high-output product squads.", features: ["Unlimited collaborators", "Sprint timer and capacity views", "Advanced board controls", "Priority support"], highlighted: true },
    { name: "Enterprise", price: "Custom", desc: "For compliance-sensitive organizations.", features: ["Enhanced governance controls", "Deployment flexibility", "Custom SLA options", "Dedicated success channel"] },
  ];

  return (
    <section id="pricing" className="py-32">
      <div className="mx-auto max-w-7xl px-6">
        <MotionReveal className="mb-20 text-center">
          <SectionHeading
            align="center"
            eyebrow="Pricing"
            title="Simple packages, elite value."
            description="Start fast with solo delivery and scale into role-aware operations."
          />
        </MotionReveal>

        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <MotionReveal key={plan.name} delay={index * 0.1}>
              <div 
                className="relative flex flex-col h-full rounded-[3rem] p-10 border overflow-hidden" 
                style={{ 
                  backgroundColor: plan.highlighted ? MATCHA : COAL_LIGHT, 
                  borderColor: plan.highlighted ? MATCHA : `${MATCHA}20`,
                  color: plan.highlighted ? COAL : OFF_WHITE
                }}
              >
                {plan.highlighted && (
                  <div className="absolute left-1/2 top-0 -translate-x-1/2 rounded-b-xl px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest" style={{ backgroundColor: COAL, color: MATCHA }}>
                    Most Popular
                  </div>
                )}
                <h3 className="mb-2 text-2xl font-medium tracking-tight mt-4">{plan.name}</h3>
                <div className="mb-4 flex items-baseline">
                  <span className="text-6xl font-medium tracking-tighter">{plan.price}</span>
                  {plan.period && <span className={`font-light ml-2 ${plan.highlighted ? 'opacity-70' : 'text-[#A0A0A0]'}`}>{plan.period}</span>}
                </div>
                <p className={`mb-8 border-b pb-8 text-base font-light ${plan.highlighted ? 'border-black/10' : 'border-white/10 text-[#A0A0A0]'}`}>{plan.desc}</p>
                <ul className="mb-10 flex-1 space-y-5">
                  {plan.features.map((feature) => (
                    <li key={feature} className={`flex items-center gap-3 font-light ${plan.highlighted ? 'font-medium' : 'text-[#A0A0A0]'}`}>
                      <CheckCircle2 className="h-5 w-5 shrink-0" style={{ color: plan.highlighted ? COAL : MATCHA }} /> {feature}
                    </li>
                  ))}
                </ul>
                <button 
                  type="button" 
                  className="w-full rounded-full py-4 font-bold transition-transform hover:scale-105"
                  style={{ 
                    backgroundColor: plan.highlighted ? COAL : MATCHA, 
                    color: plan.highlighted ? MATCHA : COAL 
                  }}
                >
                  {plan.name === "Enterprise" ? "Contact Sales" : "Get Started"}
                </button>
              </div>
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const FAQ = () => {
  const faqs = [
    { q: "What makes Choncc different from traditional PM suites?", a: "Choncc is designed around deep-focus SDLC execution, not generic workflow bloat. The 3-pane shell, sprint lifecycle controls, and backlog-to-board flow keep operators in one high-signal surface." },
    { q: "How does security work in Choncc?", a: "Security posture is layered: Supabase Auth, role-based access control, tenant isolation, and row-level security policy patterns for strict data boundaries." },
    { q: "Which roles are supported at launch?", a: "Choncc v1 centers on two operational roles: Project Manager and Developer, with permission-sensitive workflows and auditable actions." },
  ];

  const [open, setOpen] = useState(0);

  return (
    <section className="py-32">
      <div className="mx-auto max-w-4xl px-6">
        <MotionReveal className="mb-16">
          <SectionHeading eyebrow="FAQ" title="Common inquiries." />
        </MotionReveal>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <MotionReveal key={faq.q} delay={index * 0.05}>
              <div className="overflow-hidden rounded-3xl border transition-colors" style={{ backgroundColor: COAL_LIGHT, borderColor: `${MATCHA}10` }}>
                <button
                  type="button"
                  onClick={() => setOpen(open === index ? -1 : index)}
                  className="flex w-full items-center justify-between px-8 py-8 text-left text-xl font-medium tracking-tight text-[#F5F5F5]"
                >
                  {faq.q}
                  <div className="rounded-full p-2" style={{ backgroundColor: `${MATCHA}20`, color: MATCHA }}>
                    {open === index ? <Minus className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
                  </div>
                </button>
                <AnimatePresence>
                  {open === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                      className="px-8 pb-8 text-lg font-light leading-relaxed text-[#A0A0A0]"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="py-24" style={{ backgroundColor: COAL_LIGHT }}>
    <div className="mx-auto max-w-7xl px-6">
      <div className="grid gap-12 md:grid-cols-2 xl:grid-cols-5">
        <div className="xl:col-span-2">
          <div className="flex items-center gap-2 mb-6">
            <Hexagon className="w-8 h-8" style={{ color: MATCHA, fill: MATCHA }} />
            <span className="text-2xl font-medium tracking-tight text-[#F5F5F5]">Choncc</span>
          </div>
          <p className="max-w-md text-base font-light leading-relaxed text-[#A0A0A0]">
            Privacy-first, Web3-powered SDLC workspace focused on deep execution quality for solo builders and elite teams.
          </p>
        </div>

        {[
          { title: "Product", links: ["Features", "How it works", "Pricing"] },
          { title: "Docs", links: ["Architecture", "Security manifesto", "API strategy"] },
          { title: "Legal", links: ["Terms", "Privacy", "X / Twitter", "GitHub"] }
        ].map(col => (
          <div key={col.title}>
            <p className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: MATCHA }}>{col.title}</p>
            <ul className="mt-6 space-y-4 text-base font-light text-[#A0A0A0]">
              {col.links.map(link => (
                <li key={link}><a href="#" className="hover:text-[#F5F5F5] transition-colors">{link}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-24 flex flex-col gap-4 border-t pt-8 text-sm font-light text-[#A0A0A0] md:flex-row md:items-center md:justify-between" style={{ borderColor: `${MATCHA}20` }}>
        <p>© {new Date().getFullYear()} Choncc. All rights reserved.</p>
        <p>Engineered with Next.js & Supabase.</p>
      </div>
    </div>
  </footer>
);

export default function LandingPage() {
  const [isBootLoading, setIsBootLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsBootLoading(false);
    }, 2100);

    return () => window.clearTimeout(timer);
  }, []);

  if (isBootLoading) {
    return <ChonccLoader />;
  }

  return (
    <div className="relative min-h-screen font-sans selection:bg-[#C2D8C4] selection:text-[#222222]" style={{ backgroundColor: COAL }}>
      <ScrollProgressIndicator />
      <Navbar />

      <main className="relative z-10 pt-0">
        <Hero />
        <TrustProofBar />
        <AppPreview />
        <Features />
        <FeatureArchitectureGrid />
        <Pricing />
        <FAQ />
      </main>
      
      <Footer />
    </div>
  );
}