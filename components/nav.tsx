"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ShoppingCart } from "lucide-react"
import { Btn } from "@/components/shared"
import { G, IMG } from "@/lib/data"

interface CartItem { qty: number }

interface NavProps {
  page: string
  go: (page: string) => void
  cartCount?: number
  onCartOpen?: () => void
}

export const Nav = ({ page, go, cartCount = 0, onCartOpen }: NavProps) => {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", fn)
    return () => window.removeEventListener("scroll", fn)
  }, [])

  // Close mobile menu on page change
  useEffect(() => { setOpen(false) }, [page])

  const links = [
    { id: "home",        label: "Home"       },
    { id: "experience",  label: "Experience"  },
    { id: "restaurant",  label: "Restaurant"  },
    { id: "menu",        label: "Menu"        },
    { id: "shop",        label: "Order"       },
    { id: "reservations",label: "Packages"    },
    { id: "contact",     label: "Contact"     },
  ]

  const handleGo = (id: string) => {
    go(id)
    setOpen(false)
  }

  return (
    <nav
      className="fixed top-0 left-0 w-full z-[200] transition-all duration-600"
      style={{
        background: scrolled ? `${G.dark}F5` : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? `1px solid ${G.border}` : "none",
        paddingTop: scrolled ? "10px" : "24px",
        paddingBottom: scrolled ? "10px" : "24px",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex justify-between items-center">

        {/* ── LOGO ── */}
        <button onClick={() => handleGo("home")} className="flex items-center gap-3 group">
          <motion.img
            src={IMG.logo}
            alt="Amix Lounge"
            className="object-contain"
            style={{ width: 44, height: 44 }}
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.3 }}
          />
          <div className="hidden sm:block leading-none">
            <span className="block text-white font-serif text-lg tracking-[0.14em] uppercase">Amix</span>
            <span className="block text-[7px] tracking-[0.6em] uppercase font-light" style={{ color: G.goldDim }}>
              Lounge · Kempton Park
            </span>
          </div>
        </button>

        {/* ── DESKTOP NAV ── */}
        <div className="hidden xl:flex items-center gap-7">
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => handleGo(l.id)}
              className="relative text-[7.5px] uppercase tracking-[0.55em] font-bold transition-colors duration-300 group"
              style={{ color: page === l.id ? G.gold : G.muted }}
            >
              {l.label}
              <motion.span
                className="absolute -bottom-1 left-0 right-0 h-px"
                style={{ background: G.gold, originX: 0 }}
                animate={{ scaleX: page === l.id ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              />
            </button>
          ))}
        </div>

        {/* ── RIGHT ACTIONS ── */}
        <div className="flex items-center gap-3">
          {/* Cart icon */}
          {onCartOpen && (
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={onCartOpen}
              className="relative w-10 h-10 border flex items-center justify-center transition-all duration-300"
              style={{ borderColor: G.border }}
              whileHover={{ borderColor: G.gold }}
            >
              <ShoppingCart size={16} style={{ color: G.gold }} />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                    className="absolute -top-1.5 -right-1.5 w-4 h-4 text-[8px] font-black flex items-center justify-center rounded-full"
                    style={{ background: G.crimsonBright, color: "#fff" }}
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          )}

          <Btn variant="red" onClick={() => handleGo("reservations")} className="hidden md:flex px-5 py-3 text-[7.5px]">
            Book Table
          </Btn>

          <button className="xl:hidden text-white ml-1" onClick={() => setOpen(!open)}>
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* ── MOBILE MENU — full screen, centred, no scroll needed ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[300] flex flex-col justify-center items-center"
            style={{ background: G.dark }}
          >
            {/* Close */}
            <button
              className="absolute top-6 right-6 w-10 h-10 border flex items-center justify-center"
              style={{ borderColor: G.border }}
              onClick={() => setOpen(false)}
            >
              <X size={20} style={{ color: G.muted }} />
            </button>

            {/* Watermark */}
            <div
              className="absolute opacity-[0.025] font-serif select-none pointer-events-none leading-none"
              style={{ fontSize: "20vw", color: G.gold }}
            >
              AM
            </div>

            {/* Links — all visible, no scroll */}
            <div className="flex flex-col items-center gap-5 w-full px-10">
              {links.map((l, i) => (
                <motion.button
                  key={l.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 + 0.1 }}
                  onClick={() => handleGo(l.id)}
                  className="w-full text-center py-3 font-serif text-3xl tracking-tighter transition-all border-b"
                  style={{
                    color: page === l.id ? G.gold : G.text,
                    fontStyle: page === l.id ? "italic" : "normal",
                    borderColor: G.border,
                  }}
                >
                  {l.label}
                </motion.button>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: links.length * 0.05 + 0.15 }}
                className="mt-4 w-full flex gap-3"
              >
                <Btn
                  variant="red"
                  onClick={() => handleGo("reservations")}
                  className="flex-1 justify-center"
                >
                  Book Table
                </Btn>
                <Btn
                  variant="gold"
                  onClick={() => handleGo("shop")}
                  className="flex-1 justify-center"
                >
                  Order Food
                </Btn>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
