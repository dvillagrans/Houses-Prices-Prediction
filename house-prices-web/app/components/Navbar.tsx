"use client";

import { motion } from "framer-motion";
import { BarChart3, Github, Home } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const path = usePathname();

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 py-4 backdrop-blur-xl bg-[#050510]/70 border-b border-white/[0.07]"
    >
      <Link href="/" className="flex items-center gap-2 text-white font-bold text-sm tracking-tight">
        <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-xs font-black">HP</span>
        <span className="hidden sm:inline text-white/60 font-normal">House</span>
        <span className="hidden sm:inline">Prediction</span>
      </Link>

      <div className="flex items-center gap-2">
        <Link
          href="/"
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
            path === "/"
              ? "bg-white/10 text-white border border-white/20"
              : "text-white/40 hover:text-white/80 hover:bg-white/5"
          }`}
        >
          <Home className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Inicio</span>
        </Link>
        <Link
          href="/predict"
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
            path === "/predict"
              ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"
              : "text-white/40 hover:text-white/80 hover:bg-white/5"
          }`}
        >
          <BarChart3 className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Predictor</span>
          {path !== "/predict" && (
            <span className="bg-indigo-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full leading-none">
              LIVE
            </span>
          )}
        </Link>
        <a
          href="https://github.com/dvillagrans"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-xl text-white/40 hover:text-white/80 hover:bg-white/5 transition-all"
        >
          <Github className="w-4 h-4" />
        </a>
      </div>
    </motion.nav>
  );
}
