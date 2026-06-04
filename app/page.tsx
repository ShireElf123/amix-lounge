"use client"

import { useState, useEffect, useCallback } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"
import { Home } from "@/components/home"
import { Experience } from "@/components/experience"
import { Restaurant } from "@/components/restaurant"
import { MenuPage } from "@/components/menu-page"
import { Shop, CartDrawer } from "@/components/shop"
import { Reservations } from "@/components/reservations"
import { Contact } from "@/components/contact"
import { PkgDetail } from "@/components/pkg-detail"
import type { Package } from "@/lib/data"
import type { CartItem } from "@/components/shop"

export default function App() {
  const [page, setPage]       = useState("home")
  const [pkg, setPkg]         = useState<Package | null>(null)
  const [cart, setCart]       = useState<CartItem[]>([])
  const [cartOpen, setCartOpen] = useState(false)

  const go = useCallback((p: string) => setPage(p), [])
  const cartCount = cart.reduce((s, i) => s + i.qty, 0)

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [page])

  // ── Render page content — cart state NOT in deps so adding
  //    items never triggers a page remount / transition flash
  const renderPage = () => {
    switch (page) {
      case "home":           return <Home go={go} setPkg={setPkg} />
      case "experience":     return <Experience go={go} />
      case "restaurant":     return <Restaurant go={go} />
      case "menu":           return <MenuPage go={go} />
      case "shop":           return <Shop cart={cart} setCart={setCart} />
      case "reservations":   return <Reservations go={go} setPkg={setPkg} />
      case "contact":        return <Contact />
      case "package-detail": return <PkgDetail pkg={pkg} go={go} />
      default:               return <Home go={go} setPkg={setPkg} />
    }
  }

  return (
    <div className="min-h-screen bg-[#080202] text-white antialiased">
      <Nav
        page={page}
        go={go}
        cartCount={cartCount}
        onCartOpen={() => setCartOpen(true)}
      />

      <CartDrawer
        cart={cart}
        setCart={setCart}
        open={cartOpen}
        setOpen={setCartOpen}
      />

      <AnimatePresence mode="wait">
        <motion.main
          key={page}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          {renderPage()}
        </motion.main>
      </AnimatePresence>

      <Footer go={go} />
    </div>
  )
}
