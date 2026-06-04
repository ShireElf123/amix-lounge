"use client"

import { useState, useMemo, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Check, ShoppingCart, X, Minus, Trash2, ArrowRight, MessageCircle } from "lucide-react"
import { Img, Reveal, Divider, Label, Tag, Btn } from "@/components/shared"
import { G, SHOP_ITEMS, SHOP_CATEGORIES, waLink } from "@/lib/data"
import type { ShopItem } from "@/lib/data"

export interface CartItem extends ShopItem { qty: number }

// ─── Cart Drawer ────────────────────────────────────────
export const CartDrawer = ({
  cart, setCart, open, setOpen,
}: {
  cart: CartItem[]
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>
  open: boolean
  setOpen: (v: boolean) => void
}) => {
  const [ordered, setOrdered] = useState(false)
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0)

  const update = (id: string, delta: number) =>
    setCart(c => c.map(i => i.id === id ? { ...i, qty: Math.max(0, i.qty + delta) } : i).filter(i => i.qty > 0))

  // Build WhatsApp message for full cart
  const handleWhatsAppOrder = () => {
    if (!cart.length) return
    const lines = cart.map(i => `• ${i.name} x${i.qty} = R${i.price * i.qty}`).join("\n")
    const msg = `Hi Amix Lounge! I'd like to place an order:\n\n${lines}\n\nTotal: R${total}\n\nPlease confirm my order. 🙏`
    window.open(`https://wa.me/27611897753?text=${encodeURIComponent(msg)}`, "_blank")
    setOrdered(true)
    setTimeout(() => { setCart([]); setOrdered(false); setOpen(false) }, 3000)
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300]"
            style={{ background: "rgba(0,0,0,0.72)", backdropFilter: "blur(8px)" }}
            onClick={() => setOpen(false)}
          />
          <motion.aside
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 34 }}
            className="fixed top-0 right-0 h-full z-[400] flex flex-col w-full max-w-md border-l"
            style={{ background: G.surface1, borderColor: G.border }}
          >
            <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: G.border }}>
              <div>
                <p className="text-[8px] uppercase tracking-[0.7em] font-bold mb-0.5" style={{ color: G.gold }}>Your Order</p>
                <p className="font-serif text-white text-xl">{cart.length} item{cart.length !== 1 ? "s" : ""}</p>
              </div>
              <button onClick={() => setOpen(false)}
                className="w-9 h-9 border flex items-center justify-center transition-all duration-300"
                style={{ borderColor: G.border }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = G.gold)}
                onMouseLeave={e => (e.currentTarget.style.borderColor = G.border)}>
                <X size={15} style={{ color: G.muted }} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.length === 0 && !ordered && (
                <div className="flex flex-col items-center justify-center h-full text-center py-20">
                  <ShoppingCart size={40} style={{ color: G.goldDim }} className="mb-4 opacity-35" />
                  <p className="text-sm font-light" style={{ color: G.muted }}>Your order is empty</p>
                  <p className="text-xs mt-1" style={{ color: G.muted }}>Add items from the menu</p>
                </div>
              )}
              {ordered && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center h-full text-center py-20"
                >
                  <motion.div
                    initial={{ scale: 0 }} animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="w-16 h-16 rounded-full flex items-center justify-center mb-6 border-2"
                    style={{ background: "#25D36618", borderColor: "#25D366" }}>
                    <Check size={28} style={{ color: "#25D366" }} />
                  </motion.div>
                  <h3 className="font-serif text-2xl text-white mb-2">Sent to WhatsApp!</h3>
                  <p className="text-sm font-light" style={{ color: G.muted }}>Complete your order in WhatsApp.</p>
                </motion.div>
              )}
              <AnimatePresence>
                {cart.map(item => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 24, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex gap-4 p-4 border"
                    style={{ borderColor: G.border, background: G.surface2 }}
                  >
                    <div className="w-16 h-16 overflow-hidden shrink-0">
                      <Img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-semibold truncate">{item.name}</p>
                      <p className="text-xs font-light mt-0.5" style={{ color: G.gold }}>R{item.price} each</p>
                      <div className="flex items-center gap-3 mt-2">
                        <button onClick={() => update(item.id, -1)}
                          className="w-6 h-6 border flex items-center justify-center"
                          style={{ borderColor: G.border }}>
                          <Minus size={9} style={{ color: G.muted }} />
                        </button>
                        <span className="text-white text-xs font-bold w-4 text-center">{item.qty}</span>
                        <button onClick={() => update(item.id, 1)}
                          className="w-6 h-6 border flex items-center justify-center"
                          style={{ borderColor: G.border }}>
                          <Plus size={9} style={{ color: G.muted }} />
                        </button>
                        <button onClick={() => update(item.id, -item.qty)} className="ml-auto" style={{ color: G.muted }}>
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </div>
                    <div className="shrink-0 text-right">
                      <p className="text-white text-sm font-bold">R{item.price * item.qty}</p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {!ordered && cart.length > 0 && (
              <div className="p-6 border-t space-y-4" style={{ borderColor: G.border }}>
                <div className="flex justify-between items-center">
                  <span className="text-[8px] uppercase tracking-[0.6em] font-bold" style={{ color: G.muted }}>Total</span>
                  <span className="font-serif text-2xl text-white">R{total}</span>
                </div>
                {/* WhatsApp order CTA */}
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={handleWhatsAppOrder}
                  className="w-full py-4 flex items-center justify-center gap-3 font-black text-[9px] uppercase tracking-[0.4em] transition-all duration-300"
                  style={{ background: "#25D366", color: "#000" }}
                  whileHover={{ background: "#20bf5a" }}
                >
                  <MessageCircle size={16} />
                  Order via WhatsApp
                </motion.button>
                <p className="text-[7.5px] text-center uppercase tracking-wider" style={{ color: G.muted }}>
                  Opens WhatsApp · Confirm with the kitchen
                </p>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}

// ─── Category Pill ──────────────────────────────────────
const Pill = ({ children, active, onClick }: { children: React.ReactNode; active: boolean; onClick: () => void }) => (
  <motion.button onClick={onClick} whileTap={{ scale: 0.95 }}
    className="px-5 py-2.5 text-[8px] uppercase tracking-[0.5em] font-bold border transition-all duration-300"
    style={{
      borderColor: active ? G.gold : `${G.gold}22`,
      color: active ? "#000" : G.muted,
      background: active ? G.gold : "transparent",
    }}>
    {children}
  </motion.button>
)

// ─── Food Card ──────────────────────────────────────────
const FoodCard = ({
  item, hover, justAdded, onHoverStart, onHoverEnd, onAddToCart, i
}: {
  item: ShopItem
  hover: string | null
  justAdded: string | null
  onHoverStart: () => void
  onHoverEnd: () => void
  onAddToCart: () => void
  i: number
}) => {
  const isHovered = hover === item.id
  const isAdded = justAdded === item.id

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{ duration: 0.4, delay: i * 0.04 }}
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
      className="group flex flex-col overflow-hidden"
      style={{
        border: `1px solid ${item.featured ? `${G.gold}55` : (isHovered ? G.borderHover : G.border)}`,
        background: isHovered || item.featured ? G.surface2 : G.surface1,
        boxShadow: item.featured
          ? `0 8px 48px ${G.crimson}22, 0 0 0 1px ${G.gold}18`
          : isHovered ? `0 8px 32px rgba(0,0,0,0.5)` : "none",
        transition: "all 0.35s ease",
      }}
    >
      {/* ── Image ── */}
      <div className="relative overflow-hidden" style={{ aspectRatio: "4/3", background: G.surface2 }}>
        <Img
          src={item.img}
          alt={item.name}
          className="w-full h-full object-cover"
          style={{
            transform: isHovered ? "scale(1.08)" : "scale(1)",
            transition: "transform 0.65s cubic-bezier(0.16,1,0.3,1)",
          }}
        />
        {/* Dark gradient */}
        <div className="absolute inset-0"
          style={{ background: `linear-gradient(to top, ${G.dark}CC 0%, ${G.dark}44 40%, transparent 70%)` }} />

        {/* Cinematic vignette */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ boxShadow: "inset 0 0 60px rgba(8,2,2,0.5)" }} />

        {/* Badge */}
        {item.badge && (
          <div className="absolute top-3 left-3 z-10">
            <span className="text-[7px] uppercase tracking-[0.4em] px-2.5 py-1.5 font-bold"
              style={{
                background: item.featured ? G.gold : G.crimsonBright,
                color: item.featured ? "#000" : "#fff",
              }}>
              {item.badge}
            </span>
          </div>
        )}

        {/* Price floating bottom-right on image */}
        <div className="absolute bottom-3 right-3 z-10">
          <span
            className="font-serif text-xl font-bold px-1"
            style={{
              color: G.goldLight,
              textShadow: "0 2px 12px rgba(0,0,0,0.8)",
            }}
          >
            R{item.price}
          </span>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="flex flex-col flex-1 p-5">
        <h3 className="font-serif text-white text-xl tracking-tight leading-tight mb-1.5">{item.name}</h3>
        <p className="text-[11px] font-light leading-relaxed mb-4 flex-1" style={{ color: G.muted }}>{item.desc}</p>

        <div className="flex flex-wrap gap-1.5 mb-5">
          {item.tags.slice(0, 4).map(t => <Tag key={t}>{t}</Tag>)}
          {item.tags.length > 4 && <Tag>+{item.tags.length - 4}</Tag>}
        </div>

        {/* Two action buttons — Add to Order + WhatsApp direct */}
        <div className="flex gap-2">
          <motion.button
            onClick={onAddToCart}
            whileTap={{ scale: 0.94 }}
            className="flex-1 py-3 text-[8px] uppercase tracking-[0.35em] font-black border flex items-center justify-center gap-1.5 transition-all duration-300"
            style={{
              borderColor: isAdded ? G.gold : (isHovered ? G.goldDim : G.border),
              color: isAdded ? "#000" : G.gold,
              background: isAdded ? G.gold : "transparent",
            }}
          >
            {isAdded ? <><Check size={10} /> Added!</> : <><Plus size={10} /> Add</>}
          </motion.button>

          {/* WhatsApp instant order */}
          <motion.a
            href={waLink(item.name, item.price)}
            target="_blank"
            rel="noopener noreferrer"
            whileTap={{ scale: 0.94 }}
            whileHover={{ scale: 1.04 }}
            className="w-11 h-11 flex items-center justify-center border transition-all duration-300 shrink-0"
            style={{
              borderColor: "#25D36640",
              background: isHovered ? "#25D36618" : "transparent",
            }}
            title="Order via WhatsApp"
          >
            <MessageCircle size={15} style={{ color: "#25D366" }} />
          </motion.a>
        </div>
      </div>
    </motion.div>
  )
}

// ─── Main Shop Page ─────────────────────────────────────
export const Shop = ({
  cart, setCart,
}: {
  cart: CartItem[]
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>
}) => {
  const [cat, setCat] = useState("All")
  const [hover, setHover] = useState<string | null>(null)
  const [justAdded, setJustAdded] = useState<string | null>(null)

  const filtered = useMemo(
    () => cat === "All" ? SHOP_ITEMS : SHOP_ITEMS.filter(i => i.category === cat),
    [cat]
  )

  const addToCart = useCallback((item: ShopItem) => {
    setCart(c => {
      const ex = c.find(i => i.id === item.id)
      if (ex) return c.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i)
      return [...c, { ...item, qty: 1 }]
    })
    setJustAdded(item.id)
    setTimeout(() => setJustAdded(null), 1300)
  }, [setCart])

  const getQty = (id: string) => cart.find(i => i.id === id)?.qty ?? 0

  return (
    <div className="pt-32 md:pt-52 pb-20 md:pb-36 min-h-screen px-6 md:px-16" style={{ background: G.dark }}>
      <div className="max-w-7xl mx-auto">

        <Reveal className="mb-20">
          <Label>Amix Eats</Label>
          <h1 className="font-serif text-white tracking-tighter leading-none mb-6"
            style={{ fontSize: "clamp(4rem,9vw,8rem)" }}>
            Order<br /><span className="italic" style={{ color: G.gold }}>Online</span>
          </h1>
          <p className="font-light text-base max-w-lg leading-relaxed" style={{ color: G.muted }}>
            Add items to your order, then complete via WhatsApp. We{"'"}ll have everything ready when you arrive.
          </p>
          {/* WhatsApp badge */}
          <div className="flex items-center gap-3 mt-6 w-fit px-5 py-3 border"
            style={{ borderColor: "#25D36640", background: "#25D36610" }}>
            <MessageCircle size={14} style={{ color: "#25D366" }} />
            <span className="text-[8px] uppercase tracking-[0.5em] font-bold" style={{ color: "#25D366" }}>
              Orders confirmed via WhatsApp
            </span>
          </div>
          {/* Delivery platforms */}
          <div className="flex items-center gap-4 mt-5">
            <span className="text-[7.5px] uppercase tracking-[0.5em] font-bold" style={{ color: G.muted }}>Also on</span>
            <a href="https://www.ubereats.com" target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center px-3 py-2 border transition-all duration-300 hover:border-[#06C167]"
              style={{ borderColor: G.border, background: "#000" }}>
              <img src="/logos/ubereats.png" alt="Uber Eats" style={{ height: 22, width: "auto" }} />
            </a>
            <a href="https://www.mrdfood.com" target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center px-3 py-2 border transition-all duration-300 hover:border-[#E31837]"
              style={{ borderColor: G.border, background: "#fff", borderRadius: 4 }}>
              <img src="/logos/mrd.png" alt="Mr D" style={{ height: 22, width: "auto" }} />
            </a>
          </div>
          <Divider className="mt-10 max-w-sm opacity-40" />
        </Reveal>

        {/* Category Filter */}
        <Reveal className="flex flex-wrap gap-3 mb-16">
          {SHOP_CATEGORIES.map(c => (
            <Pill key={c} active={cat === c} onClick={() => setCat(c)}>{c}</Pill>
          ))}
        </Reveal>

        {/* Product grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((item, i) => (
              <FoodCard
                key={item.id}
                item={item}
                i={i}
                hover={hover}
                justAdded={justAdded}
                onHoverStart={() => setHover(item.id)}
                onHoverEnd={() => setHover(null)}
                onAddToCart={() => addToCart(item)}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Sticky cart summary */}
        <AnimatePresence>
          {cart.length > 0 && (
            <motion.div
              initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 80, opacity: 0 }}
              className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[150] px-6 py-4 flex items-center gap-6 border shadow-2xl"
              style={{ background: G.surface2, borderColor: G.gold, minWidth: 320, backdropFilter: "blur(20px)" }}
            >
              <ShoppingCart size={17} style={{ color: G.gold }} />
              <div className="flex-1">
                <p className="text-xs font-bold text-white">{cart.reduce((s, i) => s + i.qty, 0)} items</p>
                <p className="text-[9px]" style={{ color: G.muted }}>R{cart.reduce((s, i) => s + i.price * i.qty, 0)} total</p>
              </div>
              <button
                className="text-[8px] uppercase tracking-[0.4em] font-bold transition-opacity hover:opacity-70"
                style={{ color: G.gold }}
                onClick={() => {}}
              >
                View Cart →
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
