"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowDown,
  BarChart3,
  BookOpen,
  Brain,
  Code2,
  Database,
  Github,
  Layers,
  Linkedin,
  Sparkles,
  TrendingUp,
  Zap,
} from "lucide-react";
import { useRef } from "react";
import AnimatedCounter from "./components/AnimatedCounter";
import FadeIn from "./components/FadeIn";

/* ─── data ─────────────────────────────────────────────── */

const steps = [
  {
    icon: Database,
    color: "from-blue-500 to-cyan-500",
    bg: "bg-blue-500/10 border-blue-500/20",
    title: "Carga de datos",
    desc: "Dataset CSV con 1,460 propiedades de Ames, Iowa y sus 79 características.",
  },
  {
    icon: BarChart3,
    color: "from-violet-500 to-purple-500",
    bg: "bg-violet-500/10 border-violet-500/20",
    title: "Análisis exploratorio",
    desc: "EDA para descubrir distribuciones, correlaciones y outliers clave.",
  },
  {
    icon: Code2,
    color: "from-pink-500 to-rose-500",
    bg: "bg-pink-500/10 border-pink-500/20",
    title: "Preprocesamiento",
    desc: "Limpieza de nulos, encoding categórico y normalización de variables.",
  },
  {
    icon: Brain,
    color: "from-indigo-500 to-blue-500",
    bg: "bg-indigo-500/10 border-indigo-500/20",
    title: "Entrenamiento",
    desc: "Regresión lineal con scikit-learn y validación cruzada K-Fold.",
  },
  {
    icon: TrendingUp,
    color: "from-emerald-500 to-teal-500",
    bg: "bg-emerald-500/10 border-emerald-500/20",
    title: "Evaluación",
    desc: "Métricas RMSE y R² para cuantificar la precisión del modelo.",
  },
  {
    icon: BookOpen,
    color: "from-amber-500 to-orange-500",
    bg: "bg-amber-500/10 border-amber-500/20",
    title: "Visualización",
    desc: "Gráficos con matplotlib y seaborn para interpretar el comportamiento.",
  },
];

const techStack = [
  { name: "Python 3", dot: "bg-yellow-400" },
  { name: "Pandas", dot: "bg-blue-400" },
  { name: "NumPy", dot: "bg-sky-400" },
  { name: "scikit-learn", dot: "bg-orange-400" },
  { name: "Matplotlib", dot: "bg-green-400" },
  { name: "Seaborn", dot: "bg-teal-400" },
  { name: "Jupyter", dot: "bg-purple-400" },
  { name: "Python 3", dot: "bg-yellow-400" },
  { name: "Pandas", dot: "bg-blue-400" },
  { name: "NumPy", dot: "bg-sky-400" },
  { name: "scikit-learn", dot: "bg-orange-400" },
  { name: "Matplotlib", dot: "bg-green-400" },
  { name: "Seaborn", dot: "bg-teal-400" },
  { name: "Jupyter", dot: "bg-purple-400" },
];

const dataCards = [
  {
    value: 79,
    suffix: "",
    label: "Variables",
    sub: "del dataset",
    icon: Layers,
    gradient: "from-blue-600 to-cyan-600",
    glow: "shadow-blue-500/20",
  },
  {
    value: 1460,
    suffix: "",
    label: "Registros",
    sub: "de entrenamiento",
    icon: Database,
    gradient: "from-violet-600 to-purple-600",
    glow: "shadow-violet-500/20",
  },
  {
    value: 1459,
    suffix: "",
    label: "Registros",
    sub: "de prueba",
    icon: Zap,
    gradient: "from-pink-600 to-rose-600",
    glow: "shadow-pink-500/20",
  },
  {
    value: 92,
    suffix: "%",
    label: "R² Score",
    sub: "precisión del modelo",
    icon: Sparkles,
    gradient: "from-emerald-600 to-teal-600",
    glow: "shadow-emerald-500/20",
  },
];

const features = [
  "Análisis exploratorio (EDA)",
  "Manejo de valores nulos",
  "Encoding categórico",
  "Feature engineering",
  "Regresión lineal",
  "Validación cruzada",
  "Métricas RMSE & R²",
  "Visualización avanzada",
];

/* ─── page ─────────────────────────────────────────────── */

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <main className="min-h-screen bg-[#050510] text-white overflow-x-hidden">

      {/* ══ HERO ══════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex flex-col items-center justify-center grid-bg overflow-hidden"
      >
        {/* Orbs */}
        <div className="orb absolute top-1/4 -left-32 w-[500px] h-[500px] rounded-full bg-indigo-600/20 blur-[100px] pointer-events-none" />
        <div className="orb-delay absolute bottom-1/4 -right-32 w-[400px] h-[400px] rounded-full bg-violet-600/20 blur-[100px] pointer-events-none" />
        <div className="orb absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-blue-900/20 blur-[80px] pointer-events-none" />

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 max-w-5xl mx-auto px-6 text-center flex flex-col items-center gap-8"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/30 rounded-full px-5 py-2 text-sm text-indigo-300 font-medium backdrop-blur"
          >
            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
            Machine Learning · Regresión · Python
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-6xl sm:text-7xl md:text-8xl font-black tracking-tighter leading-none"
          >
            <span className="text-white">House</span>{" "}
            <span className="text-shimmer">Price</span>
            <br />
            <span className="text-white/90">Prediction</span>
          </motion.h1>

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="max-w-2xl text-lg text-white/50 leading-relaxed"
          >
            Modelo predictivo que analiza{" "}
            <span className="text-white/80 font-medium">79 características</span> de
            propiedades residenciales para predecir su precio de venta con alta precisión,
            usando el dataset de <span className="text-white/80 font-medium">Ames Housing</span>.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <a
              href="https://github.com/dvillagrans"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2.5 bg-white text-gray-900 font-bold px-7 py-3.5 rounded-2xl hover:bg-gray-100 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-white/10"
            >
              <Github className="w-5 h-5 transition-transform group-hover:rotate-12" />
              Ver en GitHub
            </a>
            <a
              href="#proceso"
              className="group flex items-center gap-2.5 bg-white/5 border border-white/10 font-semibold px-7 py-3.5 rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all duration-300 backdrop-blur"
            >
              Explorar
              <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-1" />
            </a>
          </motion.div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs text-white/30 uppercase tracking-widest">scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="w-px h-10 bg-gradient-to-b from-white/30 to-transparent"
          />
        </motion.div>
      </section>

      {/* ══ STATS ═════════════════════════════════════════════ */}
      <section className="relative py-24 overflow-hidden">
        <div className="orb-delay absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[800px] h-[200px] rounded-full bg-indigo-900/20 blur-[80px]" />
        </div>
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-5">
          {dataCards.map((card, i) => {
            const Icon = card.icon;
            return (
              <FadeIn key={card.label + card.sub} delay={i * 0.1}>
                <div
                  className={`border-glow card-glow relative bg-white/[0.04] border border-white/10 rounded-3xl p-6 flex flex-col gap-4 shadow-xl ${card.glow}`}
                >
                  <div
                    className={`w-11 h-11 rounded-xl bg-gradient-to-br ${card.gradient} flex items-center justify-center shadow-lg`}
                  >
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-4xl font-black text-white tracking-tight">
                      <AnimatedCounter to={card.value} suffix={card.suffix} duration={2000} />
                    </div>
                    <div className="text-sm font-semibold text-white mt-0.5">{card.label}</div>
                    <div className="text-xs text-white/40">{card.sub}</div>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </section>

      {/* ══ ABOUT ═════════════════════════════════════════════ */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <FadeIn direction="left">
              <div className="space-y-5">
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">
                  Sobre el proyecto
                </span>
                <h2 className="text-4xl font-black tracking-tight leading-tight">
                  ¿Qué factores
                  <br />
                  <span className="text-shimmer">determinan</span> el
                  <br />
                  precio de una casa?
                </h2>
                <p className="text-white/50 leading-relaxed">
                  Usando el dataset <span className="text-white/80 font-medium">Ames Housing</span>,
                  este proyecto explora qué características —desde el área habitable hasta el
                  vecindario— impactan más en el valor final de una propiedad.
                </p>
                <p className="text-white/50 leading-relaxed">
                  Se construye un pipeline completo de Machine Learning: desde la exploración
                  inicial y limpieza de datos hasta el entrenamiento, evaluación y visualización
                  del modelo predictivo.
                </p>
              </div>
            </FadeIn>

            <FadeIn direction="right" delay={0.15}>
              <div className="grid grid-cols-2 gap-3">
                {features.map((f, i) => (
                  <motion.div
                    key={f}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06, duration: 0.4 }}
                    className="flex items-center gap-2.5 bg-white/[0.04] border border-white/10 rounded-2xl px-4 py-3 text-sm font-medium text-white/70 hover:bg-white/[0.07] hover:text-white transition-colors"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0" />
                    {f}
                  </motion.div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ══ STEPS ═════════════════════════════════════════════ */}
      <section id="proceso" className="py-24 relative">
        <div className="absolute inset-0 grid-bg opacity-50 pointer-events-none" />
        <div className="max-w-5xl mx-auto px-6 relative">
          <FadeIn>
            <div className="text-center mb-16 space-y-3">
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">
                Metodología
              </span>
              <h2 className="text-4xl font-black tracking-tight">
                Pipeline del proyecto
              </h2>
              <p className="text-white/40 max-w-xl mx-auto">
                Flujo completo documentado en el Jupyter Notebook del repositorio.
              </p>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <FadeIn key={step.title} delay={i * 0.08}>
                  <div
                    className={`card-glow group relative bg-white/[0.03] border ${step.bg} rounded-3xl p-6 overflow-hidden`}
                  >
                    {/* Step number watermark */}
                    <span className="absolute top-4 right-5 text-7xl font-black text-white/[0.03] select-none leading-none">
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    <div className="relative space-y-4">
                      <div
                        className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110`}
                      >
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-white/30 uppercase tracking-widest">
                          Paso {i + 1}
                        </span>
                        <h3 className="text-lg font-bold text-white mt-0.5">{step.title}</h3>
                      </div>
                      <p className="text-sm text-white/50 leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══ TECH MARQUEE ══════════════════════════════════════ */}
      <section className="py-20 overflow-hidden border-y border-white/[0.06]">
        <FadeIn>
          <div className="text-center mb-10 space-y-2">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">
              Stack
            </span>
            <h2 className="text-3xl font-black">Tecnologías</h2>
          </div>
        </FadeIn>
        <div className="relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#050510] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#050510] to-transparent z-10 pointer-events-none" />
          <div className="flex">
            <div className="marquee-track flex shrink-0 gap-4 pr-4">
              {techStack.map((t, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2.5 bg-white/[0.05] border border-white/10 rounded-full px-5 py-2.5 text-sm font-semibold text-white/70 whitespace-nowrap hover:bg-white/[0.09] transition"
                >
                  <span className={`w-2 h-2 rounded-full ${t.dot}`} />
                  {t.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ DATASET ═══════════════════════════════════════════ */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-6">
          <FadeIn>
            <div className="text-center mb-14 space-y-3">
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">
                Datos
              </span>
              <h2 className="text-4xl font-black tracking-tight">Ames Housing Dataset</h2>
              <p className="text-white/40 max-w-lg mx-auto">
                Alternativa moderna al Boston Housing, ampliamente usado en Kaggle.
              </p>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                emoji: "🔢",
                title: "Numéricas",
                desc: "Área del lote, año de construcción, área habitable, baños, habitaciones y más.",
                gradient: "from-blue-500/20 to-cyan-500/10",
                border: "border-blue-500/20",
              },
              {
                emoji: "🏷️",
                title: "Categóricas",
                desc: "Calidad de materiales, zonificación, tipo de techo, estilo de garage y vecindario.",
                gradient: "from-violet-500/20 to-purple-500/10",
                border: "border-violet-500/20",
              },
              {
                emoji: "🎯",
                title: "Objetivo: SalePrice",
                desc: "El precio de venta final en dólares — la variable que el modelo aprende a predecir.",
                gradient: "from-emerald-500/20 to-teal-500/10",
                border: "border-emerald-500/20",
              },
            ].map((card, i) => (
              <FadeIn key={card.title} delay={i * 0.1}>
                <div
                  className={`card-glow relative bg-gradient-to-br ${card.gradient} border ${card.border} rounded-3xl p-7 h-full`}
                >
                  <div className="text-3xl mb-4">{card.emoji}</div>
                  <h3 className="font-bold text-lg text-white mb-2">{card.title}</h3>
                  <p className="text-sm text-white/50 leading-relaxed">{card.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══ AUTHOR ════════════════════════════════════════════ */}
      <section className="py-24 relative overflow-hidden">
        <div className="orb absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-indigo-900/30 blur-[100px] pointer-events-none" />
        <div className="max-w-3xl mx-auto px-6 relative">
          <FadeIn>
            <div className="border-glow bg-white/[0.04] border border-white/10 rounded-3xl p-10 text-center space-y-6">
              {/* Avatar */}
              <div className="relative inline-block">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 via-violet-500 to-purple-600 flex items-center justify-center text-5xl font-black mx-auto shadow-xl shadow-indigo-500/30">
                  D
                </div>
                <span className="absolute -bottom-1 -right-1 bg-emerald-500 w-5 h-5 rounded-full border-2 border-[#050510]" />
              </div>

              <div>
                <p className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-1">Creado por</p>
                <h3 className="text-3xl font-black">Diego Villagran</h3>
                <p className="text-white/40 mt-3 max-w-sm mx-auto text-sm leading-relaxed">
                  Desarrollador apasionado por la ciencia de datos y el machine learning.
                  Proyecto construido como práctica de regresión supervisada y EDA.
                </p>
              </div>

              <div className="flex justify-center gap-4">
                <a
                  href="https://linkedin.com/in/dvillagrans"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 bg-[#0A66C2]/20 hover:bg-[#0A66C2] border border-[#0A66C2]/40 text-sm font-semibold px-5 py-2.5 rounded-xl transition-all duration-300"
                >
                  <Linkedin className="w-4 h-4 transition-transform group-hover:scale-110" />
                  LinkedIn
                </a>
                <a
                  href="https://github.com/dvillagrans"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-sm font-semibold px-5 py-2.5 rounded-xl transition-all duration-300"
                >
                  <Github className="w-4 h-4 transition-transform group-hover:rotate-12" />
                  GitHub
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ══ FOOTER ════════════════════════════════════════════ */}
      <footer className="border-t border-white/[0.06] py-10 text-center">
        <p className="text-sm text-white/20">
          Built with{" "}
          <span className="text-white/50 font-medium">Next.js & Framer Motion</span>
          {" "}·{" "}
          <span className="text-white/50 font-medium">© {new Date().getFullYear()}</span>
          {" "}Diego Villagran
        </p>
      </footer>
    </main>
  );
}
