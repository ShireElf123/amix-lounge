"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight, Music, Utensils, Wine, Star, ChevronRight, Clock, MapPin, Phone } from "lucide-react"
import { Btn, Img, Reveal, Divider, Label } from "@/components/shared"
import { G, IMG, PACKAGES, SHOP_ITEMS } from "@/lib/data"
import type { Package } from "@/lib/data"

interface HomeProps {
  go: (page: string) => void
  setPkg: (pkg: Package) => void
}

export const Home = ({ go, setPkg }: HomeProps) => {
  const { scrollY } = useScroll()
  const yBg   = useTransform(scrollY, [0, 900], [0, 180])
  const yText = useTransform(scrollY, [0, 900], [0, -90])
  const fade  = useTransform(scrollY, [0, 500], [1, 0])

  const featured = SHOP_ITEMS.filter(i => i.featured || i.badge?.includes("🔥") || i.badge?.includes("⭐")).slice(0, 3)

  return (
    <div style={{ background: G.dark }}>

      {/* ═══ HERO ═══ */}
      <section className="relative h-screen flex items-end overflow-hidden">
        {/* BG image — real client hero, full colour */}
        <motion.div style={{ y: yBg }} className="absolute inset-0 z-0">
          <Img
            src={IMG.hero}
            alt="Amix Lounge"
            className="w-full h-full object-cover scale-[1.06]"
            style={{ opacity: 0.72 }}
          />
          {/* Gradient overlays for text legibility */}
          <div className="absolute inset-0"
            style={{ background: `linear-gradient(to top, ${G.dark} 0%, ${G.dark}70 28%, transparent 65%)` }} />
          <div className="absolute inset-0"
            style={{ background: `linear-gradient(to right, ${G.dark}CC 0%, transparent 55%)` }} />
          {/* Red atmospheric sweep at base */}
          <div className="absolute bottom-0 left-0 right-0 h-2/5"
            style={{ background: `linear-gradient(to top, ${G.crimson}22, transparent)` }} />
        </motion.div>

        {/* Noise grain */}
        <div className="absolute inset-0 z-[1] pointer-events-none opacity-[0.022]"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />

        <motion.div style={{ y: yText, opacity: fade }} className="relative z-10 max-w-7xl mx-auto w-full px-8 md:px-16 pb-28">
          <Reveal dir="down" delay={0.05}>
            <div className="flex items-center gap-4 mb-10">
              <motion.div
                className="h-px w-10"
                style={{ background: G.gold }}
                initial={{ scaleX: 0, originX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.9, delay: 0.4 }}
              />
              <span className="text-[9px] font-bold tracking-[1em] uppercase" style={{ color: G.gold }}>
                Kempton Park · Gauteng
              </span>
            </div>
          </Reveal>

          <h1 className="font-serif text-white leading-[0.84] tracking-tighter mb-10"
            style={{ fontSize: "clamp(4rem, 12vw, 11rem)" }}>
            <Reveal delay={0.15}><span className="block">Where the</span></Reveal>
            <Reveal delay={0.28}>
              <span className="block italic" style={{ color: G.gold }}>Night</span>
            </Reveal>
            <Reveal delay={0.4}><span className="block">Begins.</span></Reveal>
          </h1>

          <Reveal delay={0.54}>
            <p
              className="font-light text-base md:text-lg max-w-xl mb-12 leading-relaxed border-l-2 pl-6"
              style={{ color: "rgba(240,234,224,0.7)", borderColor: `${G.crimsonBright}60` }}
            >
              {"Gauteng's #1 lounge. A-list artists every weekend, legendary kasi food, signature cocktails — all under the most stunning lights in the city."}
            </p>
            <div className="flex flex-wrap gap-4 items-center">
              <Btn onClick={() => go("shop")}>Order Food Now <ArrowRight size={13} /></Btn>
              <Btn variant="outline" onClick={() => go("reservations")}>Book a Table</Btn>
            </div>
          </Reveal>
        </motion.div>

        {/* Scrolling ticker */}
        <div className="absolute bottom-0 left-0 right-0 z-20 border-t overflow-hidden"
          style={{ borderColor: G.border, background: `${G.dark}CC`, backdropFilter: "blur(14px)" }}>
          <motion.div
            className="flex gap-12 py-4 px-8"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          >
            {[...Array(2)].map((_, idx) => (
              <div key={idx} className="flex gap-12 shrink-0">
                {["Fri & Sat from 7PM","A-List Artists Weekly","Boss Kota — R65","VIP Bookings Open","Ballers Platter 🔥","Order Online Now","Kempton Park"].map((t, i) => (
                  <span key={i} className="flex items-center gap-4 text-[8px] uppercase tracking-[0.6em] whitespace-nowrap" style={{ color: G.muted }}>
                    <span style={{ color: G.gold }}>◆</span> {t}
                  </span>
                ))}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ 4 PILLARS ═══ */}
      <section className="py-32 px-8 md:px-16" style={{ background: G.surface0 }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-baseline mb-20">
            <Reveal dir="left">
              <Label>The Epitome of Service Excellence</Label>
              <h2 className="font-serif text-white text-5xl md:text-6xl tracking-tighter leading-tight">
                Luxury That<br />
                <span className="italic" style={{ color: G.gold }}>{"Doesn't Break"}</span><br />
                The Bank.
              </h2>
            </Reveal>
            <Reveal dir="right">
              <button
                onClick={() => go("experience")}
                className="text-[8px] uppercase tracking-[0.45em] font-bold mt-6 md:mt-0 transition-colors duration-300 hover:text-white"
                style={{ color: G.muted }}
              >
                Explore The Venue →
              </button>
            </Reveal>
          </div>

          <Divider className="mb-14 opacity-25" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" style={{ border: `1px solid ${G.border}` }}>
            {[
              { icon: <Music size={26} />,    label: "Live Entertainment", sub: "A-list artists every weekend", page: "experience" },
              { icon: <Utensils size={26} />, label: "Kota Bar",            sub: "Traditional & Kasi cuisine",   page: "restaurant" },
              { icon: <Wine size={26} />,     label: "Full Bar",             sub: "Affordable ice-cold drinks",   page: "shop"       },
              { icon: <Star size={26} />,     label: "VIP Section",          sub: "Exclusive booths & service",   page: "reservations" },
            ].map((c, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <motion.div
                  whileHover={{ y: -4, backgroundColor: G.surface2 }}
                  transition={{ duration: 0.28 }}
                  className="p-10 cursor-pointer group border-b sm:border-b-0 border-r last:border-r-0"
                  style={{ borderColor: G.border, background: G.surface1 }}
                  onClick={() => go(c.page)}
                >
                  <motion.div style={{ color: G.gold }} className="mb-6 group-hover:scale-110 transition-transform duration-300">
                    {c.icon}
                  </motion.div>
                  <p className="text-white font-bold text-xs uppercase tracking-wider mb-2">{c.label}</p>
                  <p className="text-xs font-light leading-relaxed" style={{ color: G.muted }}>{c.sub}</p>
                  <ChevronRight size={13} className="mt-5 group-hover:translate-x-2 transition-transform duration-300" style={{ color: G.goldDim }} />
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FOOD TEASER — real kota image, full colour ═══ */}
      <section className="py-32 px-8 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <Reveal dir="left">
              <Label>Kota Bar</Label>
              <h2 className="font-serif text-white text-4xl md:text-5xl tracking-tighter">
                The Food <span className="italic" style={{ color: G.gold }}>Everyone&apos;s Talking About</span>
              </h2>
            </Reveal>
            <Reveal dir="right">
              <Btn variant="outline" onClick={() => go("shop")} className="mt-6 md:mt-0">
                Order Now <ArrowRight size={12} />
              </Btn>
            </Reveal>
          </div>

          {/* Featured 3 — NO grayscale */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {featured.map((item, i) => (
              <Reveal key={item.id} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.32 }}
                  className="group cursor-pointer border overflow-hidden"
                  style={{
                    borderColor: item.featured ? `${G.gold}45` : G.border,
                    background: G.surface1,
                    boxShadow: item.featured ? `0 0 40px ${G.crimson}18` : "none",
                  }}
                  onClick={() => go("shop")}
                >
                  <div className="relative aspect-[16/10] overflow-hidden" style={{ background: "#1C0A0A" }}>
                    {/* ── FULL COLOUR — no filter/grayscale ── */}
                    <Img
                      src={item.img}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                    />
                    <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${G.dark}AA 0%, transparent 55%)` }} />
                    {item.badge && (
                      <div className="absolute top-3 left-3">
                        <span className="text-[7px] uppercase tracking-[0.4em] px-2.5 py-1 font-bold"
                          style={{ background: item.featured ? G.gold : G.crimson, color: item.featured ? "#000" : "#fff" }}>
                          {item.badge}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <div className="flex justify-between items-start">
                      <h3 className="font-serif text-white text-xl tracking-tight">{item.name}</h3>
                      <span className="font-serif text-lg font-bold" style={{ color: G.gold }}>R{item.price}</span>
                    </div>
                    <p className="text-xs font-light mt-2 leading-relaxed" style={{ color: G.muted }}>{item.desc}</p>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ QUOTE BAND ═══ */}
      <section className="relative py-40 overflow-hidden">
        <Img
          src={IMG.crowd}
          alt="Amix crowd"
          className="absolute inset-0 w-full h-full object-cover scale-105"
          style={{ opacity: 0.28 }}
        />
        <div className="absolute inset-0"
          style={{ background: `linear-gradient(to right, ${G.dark}, ${G.dark}88, ${G.dark})` }} />
        <div className="relative z-10 text-center px-6">
          <Reveal>
            <p className="text-[8px] uppercase tracking-[1.3em] mb-8 font-bold" style={{ color: G.gold }}>
              {"Gauteng's Number 1 Spot"}
            </p>
            <h2 className="font-serif text-white tracking-tighter leading-none"
              style={{ fontSize: "clamp(3rem, 9vw, 7.5rem)" }}>
              {'"The Sky Is Not'}<br />
              <span className="italic" style={{ color: G.gold }}>{'"The Limit."'}</span>
            </h2>
            <p className="mt-8 text-xs uppercase tracking-[0.7em]" style={{ color: G.muted }}>
              — Our Community · 4.6★ on Google
            </p>
          </Reveal>
        </div>
      </section>

      {/* ═══ INFO ROW ═══ */}
      <section className="px-8 md:px-16 pb-28">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 border" style={{ borderColor: G.border }}>
          {[
            { icon: <Clock size={20} />,  label:"Hours",       lines:["Fri & Sat — 7PM to Late","Events by arrangement"] },
            { icon: <MapPin size={20} />, label:"Location",    lines:["13 End Street, Kempton Park","Gauteng, South Africa"] },
            { icon: <Phone size={20} />,  label:"Reservations",lines:["VIP pre-booking advised","Walk-ins always welcome"] },
          ].map((r, i) => (
            <Reveal key={i} delay={i * 0.07}>
              <div
                className="p-12 border-b md:border-b-0 md:border-r last:border-0 group hover:bg-[#140606] transition-colors duration-500"
                style={{ borderColor: G.border }}
              >
                <div className="mb-5" style={{ color: G.gold }}>{r.icon}</div>
                <p className="text-[8px] uppercase tracking-[0.7em] mb-5 font-bold" style={{ color: G.muted }}>{r.label}</p>
                {r.lines.map((l, j) => (
                  <p key={j} className="text-sm font-light mb-1" style={{ color: G.text }}>{l}</p>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  )
}
