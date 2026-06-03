"use client"

import { motion } from "framer-motion"
import { Btn, Img, Reveal, Label } from "@/components/shared"
import { G, type Package } from "@/lib/data"

interface PkgDetailProps {
  pkg: Package | null
  go: (page: string) => void
}

export const PkgDetail = ({ pkg, go }: PkgDetailProps) => {
  if (!pkg) return null

  return (
    <div className="pt-52 pb-36 min-h-screen px-6 md:px-20" style={{ background: G.dark }}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-28 items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative overflow-hidden border border-white/5"
        >
          <Img src={pkg.img} alt={pkg.name} className="w-full aspect-[4/5] object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0303]/70 to-transparent" />
          <div className="absolute bottom-6 left-6">
            <span
              className="text-[7px] uppercase tracking-[0.6em] px-4 py-2 font-bold"
              style={{ background: G.crimson, color: "white" }}
            >
              {pkg.tier}
            </span>
          </div>
        </motion.div>
        <div>
          <Reveal dir="right">
            <Label>{pkg.tier}</Label>
            <h1 className="text-5xl md:text-7xl font-serif text-white tracking-tighter leading-none mb-4">
              {pkg.name}
            </h1>
            <p className="text-2xl font-light mb-6" style={{ color: G.goldLight }}>
              {pkg.price}
            </p>
            <p
              className="text-gray-400 font-light text-base leading-relaxed italic border-l-2 pl-6 mb-10"
              style={{ borderColor: `${G.crimsonBright}50` }}
            >
              {`"${pkg.tier}"`}
            </p>
            <div className="space-y-4 mb-10">
              {pkg.perks.map((p, i) => (
                <div
                  key={i}
                  className="flex items-center gap-5 text-[9px] uppercase tracking-[0.4em] text-white/55"
                >
                  <div className="w-8 h-[1px]" style={{ background: G.gold }} /> {p}
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-6 items-center pt-6 border-t border-white/8">
              <Btn onClick={() => go("contact")}>Book This Package</Btn>
              <button
                onClick={() => go("reservations")}
                className="text-gray-500 hover:text-white uppercase text-[8px] tracking-[0.5em] font-bold transition-all"
              >
                ← All Packages
              </button>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  )
}
