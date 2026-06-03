"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Btn, Img, Reveal, Divider, Label } from "@/components/shared"
import { G, IMG } from "@/lib/data"

interface ExperienceProps {
  go: (page: string) => void
}

export const Experience = ({ go }: ExperienceProps) => (
  <div className="pt-52 pb-36 min-h-screen px-6 md:px-20" style={{ background: G.dark }}>
    <div className="max-w-7xl mx-auto">
      <Reveal>
        <div className="mb-28">
          <Label>Inside Amix Lounge</Label>
          <h1 className="text-6xl md:text-[8rem] font-serif text-white tracking-tighter leading-none mb-4">
            The<br />
            <span className="italic" style={{ color: G.gold }}>Experience</span>
          </h1>
          <Divider className="mt-10 max-w-xs" />
        </div>
      </Reveal>

      {/* ── Sections ── */}
      {[
        {
          img: IMG.dj,
          img2: IMG.celeb,
          title: "Live Entertainment",
          sub: "A-List Artists, Every Weekend",
          body: "From Amapiano to Afrobeats, House to Hip-Hop — Amix Lounge brings you the dopest lineup of A-listing artists every weekend. State-of-the-art sound, spectacular lights, and an energy that makes every night unforgettable.",
          rev: false,
        },
        {
          img: IMG.barReal,
          img2: IMG.lounge,
          title: "The Bar & Lounge",
          sub: "Drinks That Hit Different",
          body: "A full bar stocked with your favourites, crafted cocktails, and ice-cold beers served by a team that keeps the vibes immaculate. Whether you're winding down or warming up, the bar is always the move.",
          rev: true,
        },
        {
          img: IMG.ladies1,
          img2: IMG.ladies2,
          title: "VIP Section",
          sub: "The Exclusive Life",
          body: "Clean, spacious, and attended by our most professional staff. Bottle service, reserved booths, and an experience that makes every guest feel like royalty. Pre-book early — these go fast.",
          rev: false,
        },
      ].map((s, i) => (
        <div key={i} className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-44">
          <Reveal dir={s.rev ? "right" : "left"}>
            <div className={`relative ${s.rev ? "lg:order-2" : ""}`}>
              {/* Main image */}
              <div className="relative aspect-[4/3] overflow-hidden border"
                style={{ borderColor: G.border }}>
                <Img
                  src={s.img}
                  alt={s.title}
                  className="w-full h-full object-cover transition-all duration-700 hover:scale-105"
                  style={{ opacity: 0.88 }}
                />
                <div className="absolute inset-0"
                  style={{ background: `linear-gradient(to top, ${G.dark}66 0%, transparent 60%)` }} />
                {/* Cinematic vignette */}
                <div className="absolute inset-0 pointer-events-none"
                  style={{ boxShadow: "inset 0 0 80px rgba(8,2,2,0.55)" }} />
              </div>
              {/* Second image — floating offset */}
              <motion.div
                className="absolute -bottom-8 -right-6 w-2/5 aspect-[3/4] overflow-hidden border-2 hidden md:block"
                style={{ borderColor: G.gold, zIndex: 10 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8, ease: [0.16,1,0.3,1] }}
                viewport={{ once: true }}
              >
                <Img
                  src={s.img2}
                  alt={s.title}
                  className="w-full h-full object-cover"
                  style={{ opacity: 0.9 }}
                />
                <div className="absolute inset-0"
                  style={{ background: `linear-gradient(to top, ${G.dark}55, transparent)` }} />
              </motion.div>
            </div>
          </Reveal>

          <Reveal dir={s.rev ? "left" : "right"} delay={0.2}>
            <div className={s.rev ? "lg:order-1" : ""}>
              <Label>{s.sub}</Label>
              <h2 className="text-4xl md:text-5xl font-serif text-white tracking-tighter mb-6">{s.title}</h2>
              <p className="font-light text-base leading-relaxed mb-8" style={{ color: G.muted }}>{s.body}</p>
              <button
                onClick={() => go("reservations")}
                className="text-[8px] uppercase tracking-[0.5em] font-bold flex items-center gap-3 group transition-colors"
                style={{ color: G.gold }}
              >
                Book Now
                <ArrowRight size={13} className="group-hover:translate-x-2 transition-transform" />
              </button>
            </div>
          </Reveal>
        </div>
      ))}

      {/* ── Photo grid — all real client images ── */}
      <Reveal>
        <div className="mt-8 mb-20">
          <Label>Gallery</Label>
          <h2 className="font-serif text-white text-4xl tracking-tighter mb-10">
            The <span className="italic" style={{ color: G.gold }}>Vibe</span>
          </h2>
        </div>
      </Reveal>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { img: IMG.live,    label: "Live Night" },
          { img: IMG.djeddie, label: "DJ Eddie-E" },
          { img: IMG.celeb,   label: "Performing" },
          { img: IMG.bar,     label: "The Bar"    },
          { img: IMG.ladies1, label: "The Crowd"  },
          { img: IMG.ladies2, label: "VIP Vibes"  },
          { img: IMG.dj,      label: "On Decks"   },
          { img: IMG.crowd,   label: "The Scene"  },
        ].map((p, i) => (
          <Reveal key={i} delay={i * 0.05}>
            <motion.div
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.35 }}
              className="relative overflow-hidden group cursor-pointer"
              style={{
                aspectRatio: i % 3 === 0 ? "3/4" : "1/1",
                border: `1px solid ${G.border}`,
              }}
            >
              <Img
                src={p.img}
                alt={p.label}
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-[1.08]"
                style={{ opacity: 0.82 }}
              />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                style={{ background: `linear-gradient(to top, ${G.dark}BB, transparent)` }} />
              <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                <span className="text-[7px] uppercase tracking-[0.5em] font-bold" style={{ color: G.gold }}>
                  {p.label}
                </span>
              </div>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </div>
  </div>
)
