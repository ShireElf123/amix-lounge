"use client"

import { ArrowRight, ChevronRight, Flame, Utensils, Wine } from "lucide-react"
import { Btn, Img, Reveal, Divider, Label } from "@/components/shared"
import { G, IMG } from "@/lib/data"

export const Restaurant = ({ go }: { go: (page: string) => void }) => (
  <div className="pt-52 pb-36 min-h-screen px-6 md:px-16" style={{ background: G.dark }}>
    <div className="max-w-7xl mx-auto">
      <Reveal>
        <div className="mb-28">
          <Label>Amix Eats</Label>
          <h1 className="font-serif text-white tracking-tighter leading-none" style={{ fontSize: "clamp(4rem,9vw,8rem)" }}>
            The<br /><span className="italic" style={{ color: G.gold }}>Restaurant</span>
          </h1>
          <p className="font-light text-lg max-w-2xl mt-8 leading-relaxed" style={{ color: G.muted }}>
            Where the streets meet fine dining. Kasi classics with upmarket energy — every dish made with passion, every plate worth the hype.
          </p>
          <Divider className="mt-10 max-w-sm opacity-40" />
        </div>
      </Reveal>

      {/* Hero banner — real kota image, full colour */}
      <Reveal>
        <div className="relative aspect-[21/8] overflow-hidden mb-28 border" style={{ borderColor: G.border }}>
          <Img
            src={IMG.kota}
            alt="Amix Kota"
            className="w-full h-full object-cover hover:scale-[1.04] transition-transform duration-1000"
            style={{ objectPosition: "center 60%" }}
          />
          <div className="absolute inset-0" style={{ background: `linear-gradient(to right, ${G.dark}CC, transparent 60%, ${G.dark}80)` }} />
          <div className="absolute inset-0 flex items-center justify-start pl-14">
            <div>
              <p className="text-[8px] uppercase tracking-[0.8em] font-bold mb-3" style={{ color: G.gold }}>Serving Nightly</p>
              <h2 className="font-serif text-white text-4xl md:text-6xl tracking-tighter">
                Legendary <span className="italic" style={{ color: G.gold }}>Flavours</span>
              </h2>
            </div>
          </div>
          <div className="absolute bottom-8 left-10">
            <span className="text-[7px] uppercase tracking-[0.7em] font-bold px-4 py-2"
              style={{ background: G.crimson, color: "white" }}>Now Serving</span>
          </div>
        </div>
      </Reveal>

      {/* 3 category cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 border mb-28" style={{ borderColor: G.border }}>
        {[
          { icon: <Flame size={28} />, title: "Kota Bar", desc: "Our iconic Kota menu — loaded quarter loaves stacked with polony, Russian, viana, egg, cheese and achar. Johannesburg street food elevated.", cta: "See Kota Menu", page: "menu" },
          { icon: <Utensils size={28} />, title: "Ballers Platter", desc: "The legendary Ballers Platter that has Tripadvisor reviewers raving. Designed to share, built to impress — a feast for the VIP in all of us.", cta: "Order the Platter", page: "shop" },
          { icon: <Wine size={28} />, title: "Bar & Cocktails", desc: "Ice-cold drinks, affordable cocktails, and house spirits served all night by our friendly bar team.", cta: "Reserve Now", page: "reservations" },
        ].map((c, i) => (
          <Reveal key={i} delay={i * 0.1}>
            <div className="p-12 border-b md:border-b-0 md:border-r last:border-0 flex flex-col group hover:bg-[#140606] transition-colors duration-500"
              style={{ borderColor: G.border }}>
              <div style={{ color: G.gold }} className="mb-6">{c.icon}</div>
              <h3 className="font-serif text-white text-2xl mb-4 tracking-tight">{c.title}</h3>
              <p className="font-light text-sm leading-relaxed mb-8 flex-grow" style={{ color: G.muted }}>{c.desc}</p>
              <button onClick={() => go(c.page)}
                className="text-[8px] uppercase tracking-[0.5em] font-bold flex items-center gap-2 group-hover:gap-3 transition-all duration-300"
                style={{ color: G.gold }}>
                {c.cta} <ChevronRight size={11} />
              </button>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Food grid — FULL COLOUR */}
      <Reveal className="mb-12">
        <Label>From Our Kitchen</Label>
        <h2 className="font-serif text-white text-4xl tracking-tighter">
          Made With <span className="italic" style={{ color: G.gold }}>Passion</span>
        </h2>
      </Reveal>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-28">
        {[IMG.kota, IMG.burger1, IMG.wings, IMG.wors].map((src, i) => (
          <Reveal key={i} delay={i * 0.08}>
            <div className="aspect-square overflow-hidden border group" style={{ borderColor: G.border }}>
              {/* Full colour — hover scale only */}
              <Img src={src} alt="Food"
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-[1.08]" />
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <div className="text-center border p-16" style={{ borderColor: G.border }}>
          <Label>Ready to Eat?</Label>
          <h3 className="font-serif text-white text-3xl mb-4">
            Check Out the <span className="italic" style={{ color: G.gold }}>Full Menu</span>
          </h3>
          <p className="font-light text-sm mb-10 max-w-md mx-auto" style={{ color: G.muted }}>
            From our iconic Kota Bar to the Ballers Platter — see every option with prices.
          </p>
          <div className="flex gap-5 justify-center flex-wrap">
            <Btn onClick={() => go("shop")}>Order Now <ArrowRight size={13} /></Btn>
            <Btn variant="outline" onClick={() => go("menu")}>View Full Menu</Btn>
          </div>
        </div>
      </Reveal>
    </div>
  </div>
)
