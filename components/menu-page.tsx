"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Flame, Plus, Utensils, Wine } from "lucide-react"
import { Btn, Reveal, Divider, Label } from "@/components/shared"
import { G, IMG, KOTAS, ADDONS } from "@/lib/data"

export const MenuPage = ({ go }: { go: (page: string) => void }) => {
  const [hover, setHover] = useState<number | null>(null)

  return (
    <div className="pt-32 md:pt-52 pb-20 md:pb-36 min-h-screen px-6 md:px-16" style={{ background: G.dark }}>
      <div className="max-w-7xl mx-auto">

        {/* Header with real kota photo */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-28">
          <Reveal>
            <Label>Amix Kota Bar</Label>
            <h1 className="font-serif text-white tracking-tighter leading-none mb-6" style={{ fontSize: "clamp(4rem,9vw,8rem)" }}>
              The<br /><span className="italic" style={{ color: G.gold }}>Menu</span>
            </h1>
            <p className="font-light text-base max-w-lg leading-relaxed" style={{ color: G.muted }}>
              {"Johannesburg's finest quarter loaf — loaded, affordable, and made fresh. Pick your level and build your perfect Kota."}
            </p>
            <Divider className="mt-10 max-w-xs opacity-40" />
          </Reveal>
          <Reveal dir="right" delay={0.15}>
            <div className="relative aspect-[4/3] overflow-hidden border" style={{ borderColor: G.border }}>
              {/* REAL CLIENT KOTA IMAGE — full colour */}
              <img
                src={IMG.kota}
                alt="Amix Kota"
                className="w-full h-full object-cover"
                style={{ objectPosition: "center 55%" }}
              />
              <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${G.dark}60, transparent 60%)` }} />
              <div className="absolute bottom-6 left-6">
                <span className="text-[7px] uppercase tracking-[0.7em] font-bold px-3 py-1"
                  style={{ background: G.gold, color: "#000" }}>Now Available</span>
              </div>
            </div>
          </Reveal>
        </div>

        {/* KOTA GRID */}
        <div className="mb-24">
          <Reveal>
            <div className="flex items-center gap-4 mb-12">
              <Flame size={20} style={{ color: G.gold }} />
              <h2 className="font-serif text-white text-2xl tracking-tight">Kota Levels</h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {KOTAS.map((k, i) => (
              <Reveal key={i} delay={i * 0.07}>
                <motion.div
                  onHoverStart={() => setHover(i)}
                  onHoverEnd={() => setHover(null)}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.28 }}
                  className="relative p-8 border transition-all duration-400"
                  style={{
                    borderColor: k.featured ? `${G.gold}55` : (hover === i ? `${G.gold}30` : G.border),
                    background: hover === i || k.featured ? G.surface2 : G.surface1,
                    boxShadow: k.featured ? `0 0 30px ${G.crimson}18` : "none",
                  }}
                >
                  {k.featured && (
                    <div className="absolute -top-3 left-6">
                      <span className="text-[7px] uppercase tracking-[0.6em] font-bold px-3 py-1"
                        style={{ background: G.gold, color: "black" }}>The Boss Kota</span>
                    </div>
                  )}
                  <div className="flex items-start justify-between mb-6">
                    <span className="font-serif text-4xl font-bold" style={{ color: k.featured ? G.gold : "white" }}>
                      {k.price}
                    </span>
                    {k.featured && <Flame size={20} style={{ color: G.gold }} />}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {k.items.map((item, j) => (
                      <span key={j} className="text-[8.5px] uppercase tracking-[0.3em] px-2 py-1 border font-medium"
                        style={{
                          borderColor: k.featured ? `${G.gold}45` : "rgba(255,255,255,0.08)",
                          color: k.featured ? G.goldLight : "rgba(255,255,255,0.6)",
                          background: k.featured ? `${G.crimson}28` : "transparent",
                        }}>
                        {item}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>

        <Divider className="mb-20 opacity-25" />

        {/* ADD-ONS */}
        <div className="mb-28">
          <Reveal>
            <div className="flex items-center gap-4 mb-10">
              <Plus size={18} style={{ color: G.gold }} />
              <h2 className="font-serif text-white text-2xl tracking-tight">Build Your Own</h2>
              <span className="text-[8px] uppercase tracking-[0.5em]" style={{ color: G.muted }}>— Add-ons & Extras</span>
            </div>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
            {ADDONS.map((a, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <motion.div
                  whileHover={{ y: -3, borderColor: `${G.gold}50` }}
                  transition={{ duration: 0.22 }}
                  className="p-5 border text-center"
                  style={{ borderColor: G.border, background: G.surface1 }}
                >
                  <p className="font-serif text-xl font-bold mb-1" style={{ color: G.gold }}>{a.price}</p>
                  <p className="text-[8px] uppercase tracking-[0.3em]" style={{ color: G.muted }}>{a.name}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>

        <Divider className="mb-20 opacity-20" />

        <Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-20">
            {[
              { icon: <Utensils size={22} />, title: "Ballers Platter", sub: "Sharing platter — ask staff for today's build", tag: "Premium" },
              { icon: <Wine size={22} />, title: "Full Drinks Menu", sub: "Ice-cold beers, house spirits, cocktails & more", tag: "Bar" },
            ].map((c, i) => (
              <div key={i} className="p-10 border flex items-center gap-8 group transition-all duration-400"
                style={{ borderColor: G.border, background: G.surface1 }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = `${G.gold}30`)}
                onMouseLeave={e => (e.currentTarget.style.borderColor = G.border)}>
                <div style={{ color: G.gold }}>{c.icon}</div>
                <div className="flex-grow">
                  <h3 className="font-serif text-white text-lg mb-1">{c.title}</h3>
                  <p className="text-xs font-light" style={{ color: G.muted }}>{c.sub}</p>
                </div>
                <span className="text-[7px] uppercase tracking-[0.5em] px-3 py-1 font-bold shrink-0"
                  style={{ background: G.crimson, color: "white" }}>{c.tag}</span>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal>
          <div className="text-center border p-14" style={{ borderColor: G.border }}>
            <h3 className="font-serif text-white text-3xl mb-4">Ready to Order?</h3>
            <p className="font-light text-sm mb-8 max-w-sm mx-auto" style={{ color: G.muted }}>
              {"Walk in or book your table and we'll have it ready for you."}
            </p>
            <div className="flex gap-5 justify-center flex-wrap">
              <Btn onClick={() => go("shop")}>Order Online</Btn>
              <Btn variant="outline" onClick={() => go("contact")}>Contact Us</Btn>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  )
}
