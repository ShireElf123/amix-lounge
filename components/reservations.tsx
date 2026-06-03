"use client"

import { Mail, Sparkles } from "lucide-react"
import { Btn, Img, Reveal, Divider, Label } from "@/components/shared"
import { G, PACKAGES, type Package } from "@/lib/data"

export const Reservations = ({ go, setPkg }: { go: (p: string) => void; setPkg: (p: Package) => void }) => (
  <div className="pt-52 pb-36 min-h-screen px-6 md:px-16" style={{ background: G.dark }}>
    <div className="max-w-7xl mx-auto">
      <Reveal>
        <div className="text-center mb-28">
          <Label>Reserve Your Night</Label>
          <h1 className="font-serif text-white tracking-tighter leading-none" style={{ fontSize: "clamp(4rem,9vw,8rem)" }}>
            Packages
          </h1>
          <Divider className="mt-10 mx-auto max-w-xs opacity-40" />
        </div>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-3 border" style={{ borderColor: G.border }}>
        {PACKAGES.map((pkg, i) => (
          <Reveal key={pkg.id} delay={i * 0.1}>
            <div className="border-b md:border-b-0 md:border-r last:border-0 flex flex-col group hover:bg-[#140606] transition-colors duration-500"
              style={{ borderColor: G.border }}>
              {/* Package image — full colour */}
              <div className="relative aspect-[16/9] overflow-hidden">
                <Img src={pkg.img} alt={pkg.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]" />
                <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${G.dark}90, transparent)` }} />
                <div className="absolute top-4 left-4">
                  <span className="text-[7px] uppercase tracking-[0.5em] font-bold px-3 py-1"
                    style={{ background: G.crimson, color: "#fff" }}>{pkg.tier}</span>
                </div>
                <div className="absolute top-4 right-4">
                  <Sparkles size={16} style={{ color: G.gold }} className="opacity-30 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>

              <div className="p-10 flex flex-col flex-1">
                <h3 className="font-serif text-white text-3xl mb-2 tracking-tighter">{pkg.name}</h3>
                <p className="text-xl font-light mb-6" style={{ color: G.goldLight }}>From R{pkg.price.toLocaleString()}</p>
                <div className="space-y-3 mb-10 flex-1">
                  {pkg.perks.map((p, j) => (
                    <div key={j} className="flex items-center gap-3 text-[8.5px] uppercase tracking-[0.3em]" style={{ color: G.muted }}>
                      <div className="w-4 h-px" style={{ background: G.gold }} /> {p}
                    </div>
                  ))}
                </div>
                <Btn
                  variant={i === 1 ? "gold" : "outline"}
                  onClick={() => { setPkg(pkg); go("package-detail") }}
                  className="w-full justify-center"
                >
                  Select Package
                </Btn>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-16">
        <div className="text-center border p-16" style={{ borderColor: G.border }}>
          <p className="text-xs uppercase tracking-[0.5em] mb-3" style={{ color: G.muted }}>Custom & Group Bookings</p>
          <h3 className="font-serif text-white text-3xl mb-6">Need Something Special?</h3>
          <p className="font-light mb-10 max-w-lg mx-auto text-sm" style={{ color: G.muted }}>
            {"For large groups, private events, or birthdays — reach out and we'll craft your perfect night."}
          </p>
          <Btn variant="red" onClick={() => go("contact")}>
            Contact Us <Mail size={13} />
          </Btn>
        </div>
      </Reveal>
    </div>
  </div>
)
