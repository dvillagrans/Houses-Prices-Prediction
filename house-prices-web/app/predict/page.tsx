"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Bath,
  Bed,
  Building2,
  Car,
  ChevronRight,
  DollarSign,
  Layers,
  RefreshCw,
  RotateCcw,
  Sparkles,
  Star,
  TrendingUp,
} from "lucide-react";
import { useCallback, useMemo, useState } from "react";

/* ─────────────────────────────────────────────────────────
   Model: simplified linear regression with realistic Ames
   Housing coefficients (derived from published analyses).
─────────────────────────────────────────────────────────── */

interface HouseFeatures {
  overallQual: number;   // 1-10
  grLivArea: number;     // sq ft  500-4000
  yearBuilt: number;     // 1880-2010
  totalBsmtSF: number;   // sq ft  0-3000
  garageCars: number;    // 0-4
  fullBath: number;      // 0-4
  bedroomAbvGr: number;  // 0-6
  lotArea: number;       // sq ft  1500-25000
  neighborhood: string;
}

const NEIGHBORHOODS: Record<string, { label: string; multiplier: number }> = {
  MeadowV:  { label: "MeadowV (bajo)",     multiplier: 0.75 },
  IDOTRR:   { label: "IDOTRR",             multiplier: 0.80 },
  BrkSide:  { label: "BrkSide",            multiplier: 0.85 },
  OldTown:  { label: "OldTown",            multiplier: 0.88 },
  Edwards:  { label: "Edwards",            multiplier: 0.90 },
  Sawyer:   { label: "Sawyer",             multiplier: 0.93 },
  NAmes:    { label: "NAmes (promedio)",   multiplier: 1.00 },
  CollgCr:  { label: "CollgCr",            multiplier: 1.08 },
  Crawfor:  { label: "Crawfor",            multiplier: 1.12 },
  Gilbert:  { label: "Gilbert",            multiplier: 1.10 },
  Somerst:  { label: "Somerst",            multiplier: 1.15 },
  NridgHt:  { label: "NridgHt (alto)",     multiplier: 1.35 },
  NoRidge:  { label: "NoRidge",            multiplier: 1.40 },
  StoneBr:  { label: "StoneBr (premium)",  multiplier: 1.45 },
};

const DEFAULTS: HouseFeatures = {
  overallQual: 6,
  grLivArea: 1500,
  yearBuilt: 1990,
  totalBsmtSF: 800,
  garageCars: 2,
  fullBath: 2,
  bedroomAbvGr: 3,
  lotArea: 9000,
  neighborhood: "NAmes",
};

const BASE = 28_000;
const COEFF = {
  overallQual:   18_500,
  grLivArea:     62,
  yearBuilt:     420,
  yearBase:      1870,
  totalBsmtSF:   22,
  garageCars:    9_200,
  fullBath:      7_800,
  bedroomAbvGr:  4_500,
  lotArea:       1.8,
};

function predict(f: HouseFeatures): { total: number; contributions: Record<string, number> } {
  const contrib = {
    "Base":              BASE,
    "Calidad general":   f.overallQual  * COEFF.overallQual,
    "Área habitable":    f.grLivArea    * COEFF.grLivArea,
    "Año construcción":  (f.yearBuilt - COEFF.yearBase) * COEFF.yearBuilt,
    "Sótano":            f.totalBsmtSF  * COEFF.totalBsmtSF,
    "Garage":            f.garageCars   * COEFF.garageCars,
    "Baños":             f.fullBath     * COEFF.fullBath,
    "Recámaras":         f.bedroomAbvGr * COEFF.bedroomAbvGr,
    "Terreno":           f.lotArea      * COEFF.lotArea,
  };
  const raw = Object.values(contrib).reduce((a, b) => a + b, 0);
  const mult = NEIGHBORHOODS[f.neighborhood]?.multiplier ?? 1;
  const total = Math.max(raw * mult, 50_000);
  return { total, contributions: contrib };
}

/* ─────────────────────────────────────────────────────────
   Sub-components
─────────────────────────────────────────────────────────── */

function SliderField({
  icon: Icon,
  label,
  value,
  min,
  max,
  step = 1,
  format,
  onChange,
  color = "indigo",
}: {
  icon: React.ElementType;
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  format?: (v: number) => string;
  onChange: (v: number) => void;
  color?: string;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  const colorMap: Record<string, string> = {
    indigo: "#6366f1",
    violet: "#8b5cf6",
    blue: "#3b82f6",
    pink: "#ec4899",
    emerald: "#10b981",
    amber: "#f59e0b",
    cyan: "#06b6d4",
    rose: "#f43f5e",
  };
  const hex = colorMap[color] ?? colorMap.indigo;

  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-white/60">
          <Icon className="w-4 h-4" style={{ color: hex }} />
          <span>{label}</span>
        </div>
        <span className="text-sm font-bold text-white tabular-nums">
          {format ? format(value) : value.toLocaleString()}
        </span>
      </div>
      <div className="relative h-1.5 bg-white/10 rounded-full">
        <div
          className="absolute left-0 top-0 h-full rounded-full transition-all duration-150"
          style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${hex}80, ${hex})` }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 shadow-lg transition-all duration-150 pointer-events-none"
          style={{
            left: `calc(${pct}% - 8px)`,
            borderColor: hex,
            background: "#050510",
            boxShadow: `0 0 12px ${hex}80`,
          }}
        />
      </div>
    </div>
  );
}

function ContribBar({
  label,
  value,
  max,
  index,
}: {
  label: string;
  value: number;
  max: number;
  index: number;
}) {
  const pct = Math.max((value / max) * 100, 0);
  const colors = [
    "from-blue-500 to-cyan-500",
    "from-indigo-500 to-blue-500",
    "from-violet-500 to-purple-500",
    "from-pink-500 to-rose-500",
    "from-emerald-500 to-teal-500",
    "from-amber-500 to-orange-500",
    "from-cyan-500 to-sky-500",
    "from-fuchsia-500 to-pink-500",
    "from-green-500 to-emerald-500",
  ];
  const gradient = colors[index % colors.length];

  return (
    <motion.div
      layout
      className="space-y-1.5"
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <div className="flex justify-between text-xs">
        <span className="text-white/50">{label}</span>
        <span className="text-white/70 font-medium tabular-nums">
          ${Math.round(value).toLocaleString()}
        </span>
      </div>
      <div className="h-2 bg-white/[0.06] rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full bg-gradient-to-r ${gradient}`}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────
   Main page
─────────────────────────────────────────────────────────── */

export default function PredictPage() {
  const [features, setFeatures] = useState<HouseFeatures>(DEFAULTS);
  const [prevPrice, setPrevPrice] = useState<number | null>(null);

  const set = useCallback(<K extends keyof HouseFeatures>(key: K, val: HouseFeatures[K]) => {
    setFeatures((prev) => {
      setPrevPrice(predict(prev).total);
      return { ...prev, [key]: val };
    });
  }, []);

  const reset = () => {
    setPrevPrice(predict(features).total);
    setFeatures(DEFAULTS);
  };

  const { total, contributions } = useMemo(() => predict(features), [features]);
  const maxContrib = Math.max(...Object.values(contributions));
  const priceIncreased = prevPrice !== null && total > prevPrice;
  const priceDecreased = prevPrice !== null && total < prevPrice;

  const qualityLabel = ["", "Muy malo", "Malo", "Regular-", "Regular", "Aceptable", "Bueno", "Bueno+", "Muy bueno", "Excelente", "Excepcional"][features.overallQual];

  return (
    <div className="min-h-screen bg-[#050510] text-white pt-20">
      {/* Header */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-2 mb-10"
        >
          <div className="flex items-center gap-2 text-xs font-bold text-indigo-400 uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            Simulador interactivo
          </div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tighter">
            Predice el precio
            <br />
            <span className="text-shimmer">de tu casa</span>
          </h1>
          <p className="text-white/40 max-w-lg text-sm leading-relaxed">
            Ajusta las características de la propiedad con los sliders y observa
            cómo el modelo de regresión lineal recalcula el precio en tiempo real.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_420px] gap-6">
          {/* ── LEFT: controls ─────────────────────────── */}
          <div className="space-y-5">
            {/* Quality */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="bg-white/[0.04] border border-white/10 rounded-3xl p-6 space-y-5"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-bold text-white/70 uppercase tracking-widest">Calidad y condición</h2>
                <span className="text-xs bg-indigo-500/20 text-indigo-300 border border-indigo-500/20 px-2.5 py-1 rounded-full font-medium">
                  {qualityLabel}
                </span>
              </div>
              <SliderField
                icon={Star}
                label="Calidad general (1–10)"
                value={features.overallQual}
                min={1} max={10}
                onChange={(v) => set("overallQual", v)}
                color="indigo"
              />
              {/* Star rating visual */}
              <div className="flex gap-1 pt-1">
                {Array.from({ length: 10 }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => set("overallQual", i + 1)}
                    className="transition-transform hover:scale-125"
                  >
                    <Star
                      className={`w-5 h-5 transition-colors ${
                        i < features.overallQual
                          ? "fill-indigo-400 text-indigo-400"
                          : "text-white/10"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Areas */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white/[0.04] border border-white/10 rounded-3xl p-6 space-y-5"
            >
              <h2 className="text-sm font-bold text-white/70 uppercase tracking-widest">Áreas</h2>
              <SliderField
                icon={Layers}
                label="Área habitable (sq ft)"
                value={features.grLivArea}
                min={500} max={4000} step={50}
                format={(v) => `${v.toLocaleString()} sq ft`}
                onChange={(v) => set("grLivArea", v)}
                color="blue"
              />
              <SliderField
                icon={Building2}
                label="Área de sótano (sq ft)"
                value={features.totalBsmtSF}
                min={0} max={3000} step={50}
                format={(v) => `${v.toLocaleString()} sq ft`}
                onChange={(v) => set("totalBsmtSF", v)}
                color="violet"
              />
              <SliderField
                icon={Layers}
                label="Área del terreno (sq ft)"
                value={features.lotArea}
                min={1500} max={25000} step={500}
                format={(v) => `${v.toLocaleString()} sq ft`}
                onChange={(v) => set("lotArea", v)}
                color="cyan"
              />
            </motion.div>

            {/* Rooms */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="bg-white/[0.04] border border-white/10 rounded-3xl p-6 space-y-5"
            >
              <h2 className="text-sm font-bold text-white/70 uppercase tracking-widest">Habitaciones</h2>
              <SliderField
                icon={Bed}
                label="Recámaras"
                value={features.bedroomAbvGr}
                min={0} max={6}
                onChange={(v) => set("bedroomAbvGr", v)}
                color="pink"
              />
              <SliderField
                icon={Bath}
                label="Baños completos"
                value={features.fullBath}
                min={0} max={4}
                onChange={(v) => set("fullBath", v)}
                color="emerald"
              />
              <SliderField
                icon={Car}
                label="Capacidad de garage (autos)"
                value={features.garageCars}
                min={0} max={4}
                onChange={(v) => set("garageCars", v)}
                color="amber"
              />
            </motion.div>

            {/* Year + Neighborhood */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/[0.04] border border-white/10 rounded-3xl p-6 space-y-5"
            >
              <h2 className="text-sm font-bold text-white/70 uppercase tracking-widest">Construcción y ubicación</h2>
              <SliderField
                icon={Building2}
                label="Año de construcción"
                value={features.yearBuilt}
                min={1880} max={2010}
                onChange={(v) => set("yearBuilt", v)}
                color="rose"
              />
              {/* Neighborhood selector */}
              <div className="space-y-2.5">
                <div className="flex items-center gap-2 text-sm text-white/60">
                  <TrendingUp className="w-4 h-4 text-violet-400" />
                  <span>Vecindario</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {Object.entries(NEIGHBORHOODS).map(([key, n]) => (
                    <button
                      key={key}
                      onClick={() => set("neighborhood", key)}
                      className={`text-left text-xs px-3 py-2.5 rounded-xl border transition-all duration-200 leading-tight ${
                        features.neighborhood === key
                          ? "bg-indigo-500/20 border-indigo-500/50 text-indigo-300 font-semibold"
                          : "bg-white/[0.03] border-white/10 text-white/40 hover:border-white/20 hover:text-white/60"
                      }`}
                    >
                      {n.label}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>

            <button
              onClick={reset}
              className="flex items-center gap-2 text-sm text-white/30 hover:text-white/60 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Restablecer valores por defecto
            </button>
          </div>

          {/* ── RIGHT: result ─────────────────────────── */}
          <div className="space-y-5 lg:sticky lg:top-24 self-start">
            {/* Price card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="relative overflow-hidden bg-gradient-to-br from-indigo-500/20 via-violet-500/10 to-purple-500/20 border border-indigo-500/30 rounded-3xl p-8"
            >
              {/* glow */}
              <div className="absolute -top-16 -right-16 w-48 h-48 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

              <div className="relative space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-indigo-400 uppercase tracking-widest">
                  <DollarSign className="w-3.5 h-3.5" />
                  Precio estimado
                </div>

                <div className="relative">
                  <AnimatePresence mode="popLayout">
                    <motion.div
                      key={Math.round(total / 1000)}
                      initial={{ y: priceIncreased ? -20 : 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: priceIncreased ? 20 : -20, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="text-5xl font-black tracking-tighter tabular-nums"
                    >
                      ${Math.round(total).toLocaleString("en-US")}
                    </motion.div>
                  </AnimatePresence>

                  {prevPrice !== null && prevPrice !== total && (
                    <motion.div
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      className={`inline-flex items-center gap-1 text-xs font-bold mt-1 ${
                        priceIncreased ? "text-emerald-400" : "text-rose-400"
                      }`}
                    >
                      <ChevronRight
                        className={`w-3 h-3 transition-transform ${priceIncreased ? "-rotate-90" : "rotate-90"}`}
                      />
                      {priceIncreased ? "+" : ""}
                      {Math.round(total - prevPrice).toLocaleString("en-US")} USD
                    </motion.div>
                  )}
                </div>

                <p className="text-white/30 text-xs mt-3">
                  Calculado con regresión lineal · coeficientes del dataset Ames Housing
                </p>
              </div>
            </motion.div>

            {/* Feature importance */}
            <div className="bg-white/[0.04] border border-white/10 rounded-3xl p-6 space-y-5">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white/70 uppercase tracking-widest">
                  Contribución por factor
                </h3>
                <RefreshCw className="w-3.5 h-3.5 text-white/20" />
              </div>
              <div className="space-y-3">
                {Object.entries(contributions)
                  .sort((a, b) => b[1] - a[1])
                  .map(([label, value], i) => (
                    <ContribBar
                      key={label}
                      label={label}
                      value={value}
                      max={maxContrib}
                      index={i}
                    />
                  ))}
              </div>

              <div className="pt-2 border-t border-white/[0.07] flex items-center justify-between text-xs">
                <span className="text-white/30">
                  × Multiplicador vecindario
                </span>
                <span className="font-bold text-white/60">
                  ×{NEIGHBORHOODS[features.neighborhood]?.multiplier.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Quick summary */}
            <div className="bg-white/[0.04] border border-white/10 rounded-3xl p-5">
              <div className="grid grid-cols-2 gap-3 text-center">
                {[
                  { label: "Cal. general", value: `${features.overallQual}/10` },
                  { label: "Año", value: features.yearBuilt },
                  { label: "Área", value: `${features.grLivArea.toLocaleString()} ft²` },
                  { label: "Vecindario", value: features.neighborhood },
                ].map((item) => (
                  <div key={item.label} className="bg-white/[0.04] rounded-2xl p-3">
                    <div className="text-sm font-bold text-white tabular-nums">{item.value}</div>
                    <div className="text-xs text-white/30 mt-0.5">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
