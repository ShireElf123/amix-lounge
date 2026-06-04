"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ShoppingCart } from "lucide-react"
import { Btn } from "@/components/shared"
import { G, IMG } from "@/lib/data"

interface NavProps {
  page: string
  go: (page: string) => void
  cartCount?: number
  onCartOpen?: () => void
}

export const Nav = ({ page, go, cartCount = 0, onCartOpen }: NavProps) => {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", fn, { passive: true })
    return () => window.removeEventListener("scroll", fn)
  }, [])

  useEffect(() => { setOpen(false) }, [page])

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [open])

  const links = [
    { id: "home",         label: "Home"        },
    { id: "experience",   label: "Experience"  },
    { id: "restaurant",   label: "Restaurant"  },
    { id: "menu",         label: "Menu"        },
    { id: "shop",         label: "Order"       },
    { id: "reservations", label: "Packages"    },
    { id: "contact",      label: "Contact"     },
  ]

  const handleGo = (id: string) => { go(id); setOpen(false) }

  return (
    <>
      {/* ── NAV BAR ── */}
      <nav
        className="fixed top-0 left-0 w-full z-[200]"
        style={{
          background: scrolled ? `${G.dark}F2` : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? `1px solid ${G.border}` : "none",
          padding: scrolled ? "10px 0" : "22px 0",
          transition: "all 0.4s ease",
          willChange: "background, padding",
          transform: "translateZ(0)",
        }}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-10 flex justify-between items-center">

          {/* LOGO */}
          <button onClick={() => handleGo("home")} className="flex items-center gap-3 shrink-0">
            <motion.img
              src={IMG.logo}
              alt="Amix Lounge"
              style={{ width: 40, height: 40, objectFit: "contain" }}
              whileHover={{ scale: 1.06 }}
              transition={{ duration: 0.25 }}
            />
            <div className="hidden sm:block leading-none">
              <span className="block text-white font-serif text-base tracking-[0.18em] uppercase">Amix</span>
              <span className="block text-[6.5px] tracking-[0.55em] uppercase font-light" style={{ color: G.goldDim }}>
                Lounge · Kempton Park
              </span>
            </div>
          </button>

          {/* DESKTOP LINKS */}
          <div className="hidden lg:flex items-center gap-6">
            {links.map((l) => (
              <button
                key={l.id}
                onClick={() => handleGo(l.id)}
                className="relative text-[7px] uppercase tracking-[0.5em] font-bold transition-colors duration-300"
                style={{ color: page === l.id ? G.gold : G.muted }}
              >
                {l.label}
                {/* Active underline */}
                <motion.span
                  className="absolute -bottom-1 left-0 right-0 h-px"
                  style={{ background: G.gold, originX: 0 }}
                  animate={{ scaleX: page === l.id ? 1 : 0 }}
                  transition={{ duration: 0.28 }}
                />
                {/* Active dot */}
                <motion.span
                  className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                  style={{ background: G.gold }}
                  animate={{ opacity: page === l.id ? 1 : 0, scale: page === l.id ? 1 : 0 }}
                  transition={{ duration: 0.22 }}
                />
              </button>
            ))}
          </div>

          {/* RIGHT ACTIONS */}
          <div className="flex items-center gap-2.5">
            {onCartOpen && (
              <motion.button
                aria-label="Open cart"
                whileTap={{ scale: 0.92 }}
                onClick={onCartOpen}
                className="relative w-9 h-9 border flex items-center justify-center transition-colors duration-300"
                style={{ borderColor: G.border }}
                whileHover={{ borderColor: G.gold }}
              >
                <ShoppingCart size={15} style={{ color: G.gold }} />
                <AnimatePresence>
                  {cartCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                      className="absolute -top-1.5 -right-1.5 w-4 h-4 text-[7px] font-black flex items-center justify-center rounded-full"
                      style={{ background: G.crimsonBright, color: "#fff" }}
                    >
                      {cartCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            )}

            <Btn variant="red" onClick={() => handleGo("reservations")} className="hidden md:flex !px-4 !py-2.5 !text-[7px]">
              Book Table
            </Btn>

            {/* Hamburger — mobile only */}
            <button
              className="lg:hidden flex flex-col justify-center items-center w-9 h-9 gap-[5px]"
              onClick={() => setOpen(!open)}
              aria-label={open ? "Close menu" : "Open menu"}
            >
              <motion.span
                className="block w-5 h-[1.5px] rounded-full"
                style={{ background: "#fff" }}
                animate={{ rotate: open ? 45 : 0, y: open ? 6.5 : 0 }}
                transition={{ duration: 0.28 }}
              />
              <motion.span
                className="block w-5 h-[1.5px] rounded-full"
                style={{ background: "#fff" }}
                animate={{ opacity: open ? 0 : 1, scaleX: open ? 0 : 1 }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="block w-5 h-[1.5px] rounded-full"
                style={{ background: "#fff" }}
                animate={{ rotate: open ? -45 : 0, y: open ? -6.5 : 0 }}
                transition={{ duration: 0.28 }}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* ── MOBILE DRAWER — slides down from nav bar ── */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-[190]"
              style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
              onClick={() => setOpen(false)}
            />

            {/* Drawer panel */}
            <motion.div
              initial={{ y: -16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -16, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="fixed left-0 right-0 z-[195] lg:hidden"
              style={{
                top: scrolled ? 61 : 85,
                background: G.surface1,
                borderBottom: `1px solid ${G.border}`,
                borderTop: `1px solid ${G.border}`,
              }}
            >
              {/* Links */}
              <div className="divide-y" style={{ borderColor: G.border }}>
                {links.map((l, i) => (
                  <motion.button
                    key={l.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.25 }}
                    onClick={() => handleGo(l.id)}
                    className="w-full flex items-center justify-between px-6 py-4 text-left transition-colors duration-200"
                    style={{
                      background: page === l.id ? G.surface2 : "transparent",
                      borderBottom: `1px solid ${G.border}`,
                    }}
                    onTouchStart={e => (e.currentTarget.style.background = G.surface2)}
                    onTouchEnd={e => (e.currentTarget.style.background = page === l.id ? G.surface2 : "transparent")}
                  >
                    <span
                      className="text-[9px] uppercase tracking-[0.55em] font-bold"
                      style={{ color: page === l.id ? G.gold : G.text }}
                    >
                      {l.label}
                    </span>
                    {page === l.id && (
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: G.gold }} />
                    )}
                  </motion.button>
                ))}
              </div>

              {/* CTA row */}
              <div className="flex gap-3 p-4" style={{ background: G.surface2 }}>
                <button
                  onClick={() => handleGo("reservations")}
                  className="flex-1 py-3.5 text-[8px] uppercase tracking-[0.4em] font-bold text-white transition-all duration-300"
                  style={{ background: G.crimson }}
                >
                  Book Table
                </button>
                <button
                  onClick={() => handleGo("shop")}
                  className="flex-1 py-3.5 text-[8px] uppercase tracking-[0.4em] font-bold text-black transition-all duration-300"
                  style={{ background: G.gold }}
                >
                  Order Food
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
