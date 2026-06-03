"use client"

import { Instagram, Facebook } from "lucide-react"
import { G, IMG } from "@/lib/data"
import { Reveal } from "@/components/shared"

export const Footer = ({ go }: { go: (page: string) => void }) => (
  <footer className="pt-24 pb-12 px-8 md:px-16 border-t" style={{ background: "#040101", borderColor: G.border }}>
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14 mb-14">
        <div className="space-y-6 lg:col-span-2">
          <div className="flex items-center gap-4">
            <img src={IMG.logo} alt="Amix Lounge" className="w-12 h-12 object-contain" />
            <div>
              <span className="font-serif text-lg text-white tracking-widest block">AMIX LOUNGE</span>
              <span className="text-[7px] uppercase tracking-[0.5em]" style={{ color: G.goldDim }}>Kempton Park, Gauteng</span>
            </div>
          </div>
          <p className="font-light italic text-sm max-w-xs leading-relaxed" style={{ color: G.muted }}>
            The epitome of service excellence. Affordable food, beverages and entertainment. Classy outlet with top-tier furnishings.
          </p>
          <div className="flex gap-5">
            <a href="https://instagram.com/amixlounge" target="_blank" rel="noopener noreferrer"
              className="transition-colors duration-300 hover:text-[#C8A951]" style={{ color: G.muted }}>
              <Instagram size={17} />
            </a>
            <a href="https://facebook.com/AMIXLOUNGE" target="_blank" rel="noopener noreferrer"
              className="transition-colors duration-300 hover:text-[#C8A951]" style={{ color: G.muted }}>
              <Facebook size={17} />
            </a>
          </div>
        </div>

        <div className="space-y-4">
          <span className="text-[8px] tracking-[0.7em] uppercase font-bold block mb-5" style={{ color: G.text }}>Navigate</span>
          {[
            ["home","Home"], ["experience","Experience"], ["restaurant","Restaurant"],
            ["menu","Menu"], ["shop","Order Food"], ["reservations","Packages"], ["contact","Contact"]
          ].map(([id, label]) => (
            <button key={id} onClick={() => go(id)}
              className="block text-[8.5px] uppercase tracking-[0.5em] transition-colors duration-300 hover:text-white text-left"
              style={{ color: G.muted }}>
              {label}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          <span className="text-[8px] tracking-[0.7em] uppercase font-bold block mb-5" style={{ color: G.text }}>Find Us</span>
          <p className="text-sm font-light" style={{ color: G.muted }}>13 End Street<br />Kempton Park, Gauteng</p>
          <p className="text-xs font-light mt-3" style={{ color: G.muted }}>Fri & Sat: 7PM – Late</p>
          <p className="text-xs font-light" style={{ color: G.muted }}>Google: 4.6 ⭐ (62 reviews)</p>
        </div>
      </div>

      <div className="pt-6 border-t flex flex-col md:flex-row justify-between items-center gap-4" style={{ borderColor: G.border }}>
        <p className="text-[7.5px] uppercase tracking-[0.4em]" style={{ color: "#3a2520" }}>© 2026 Amix Lounge. All Rights Reserved.</p>
        <p className="text-[7.5px] uppercase tracking-[0.4em]" style={{ color: "#3a2520" }}>Best of the Rest — Gauteng&apos;s #1</p>
      </div>
    </div>
  </footer>
)
