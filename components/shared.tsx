"use client"

import { useState, useRef } from "react"
import { motion, useMotionValue, useSpring, useInView } from "framer-motion"
import { G, IMG } from "@/lib/data"

// ─── Safe Image ────────────────────────────────────────────────
export const Img = ({ src, alt, className, style }: {
  src: string; alt: string; className?: string; style?: React.CSSProperties
}) => {
  const [err, setErr] = useState(false)
  return (
    <img
      src={err ? IMG.fallback : src}
      alt={alt}
      className={className}
      style={style}
      loading="lazy"
      decoding="async"
      onError={() => setErr(true)}
    />
  )
}

// ─── Magnetic Button ───────────────────────────────────────────
export const Btn = ({ children, variant = "gold", onClick, className = "" }: {
  children: React.ReactNode
  variant?: "gold" | "outline" | "red"
  onClick?: () => void
  className?: string
}) => {
  const mx = useMotionValue(0), my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 160, damping: 18 })
  const sy = useSpring(my, { stiffness: 160, damping: 18 })

  const mm = (e: React.MouseEvent<HTMLButtonElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - (r.left + r.width / 2)) * 0.28)
    my.set((e.clientY - (r.top + r.height / 2)) * 0.28)
  }

  const styles = {
    gold:    "bg-gradient-to-r from-[#C8A951] to-[#E2C97E] text-black font-black hover:from-[#E2C97E] hover:to-[#C8A951] transition-all duration-400",
    outline: "border border-[#C8A951]/40 text-[#C8A951] hover:border-[#C8A951] hover:bg-[#C8A951]/8 transition-all duration-400",
    red:     "bg-gradient-to-r from-[#7A0000] to-[#C0392B] text-white font-bold hover:from-[#C0392B] hover:to-[#7A0000] transition-all duration-400",
  }

  return (
    <motion.button
      style={{ x: sx, y: sy }}
      onMouseMove={mm}
      onMouseLeave={() => { mx.set(0); my.set(0) }}
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      className={`px-8 py-4 uppercase tracking-[0.32em] text-[9px] overflow-hidden ${styles[variant]} ${className}`}
    >
      <span className="flex items-center justify-center gap-2.5">{children}</span>
    </motion.button>
  )
}

// ─── Scroll Reveal ─────────────────────────────────────────────
export const Reveal = ({ children, delay = 0, dir = "up", dist = 44, className = "" }: {
  children: React.ReactNode
  delay?: number
  dir?: "up" | "down" | "left" | "right"
  dist?: number
  className?: string
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-4%" })
  const d: Record<string, object> = {
    up: { y: dist }, down: { y: -dist }, left: { x: dist }, right: { x: -dist }
  }
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, ...d[dir] }}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : {}}
      transition={{ duration: 1.05, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

// ─── Animated Gold Divider ─────────────────────────────────────
export const Divider = ({ className = "" }: { className?: string }) => {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })
  return (
    <motion.div
      ref={ref}
      className={`h-px ${className}`}
      style={{ background: `linear-gradient(90deg, transparent, ${G.gold}, transparent)` }}
      initial={{ scaleX: 0, originX: 0 }}
      animate={inView ? { scaleX: 1 } : {}}
      transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
    />
  )
}

// ─── Section Label ─────────────────────────────────────────────
export const Label = ({ children }: { children: React.ReactNode }) => (
  <span
    className="text-[9px] font-bold tracking-[0.85em] uppercase block mb-4"
    style={{ color: G.gold }}
  >
    {children}
  </span>
)

// ─── Ingredient Tag ────────────────────────────────────────────
export const Tag = ({ children }: { children: React.ReactNode }) => (
  <span
    className="inline-block text-[7.5px] uppercase tracking-[0.4em] px-2 py-0.5 border font-semibold"
    style={{ borderColor: `${G.gold}28`, color: G.muted, background: `${G.gold}07` }}
  >
    {children}
  </span>
)
