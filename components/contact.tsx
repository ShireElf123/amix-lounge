"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Instagram, Facebook, Sparkles } from "lucide-react"
import { Btn, Reveal, Divider, Label } from "@/components/shared"
import { G, PACKAGES } from "@/lib/data"

export const Contact = () => {
  const [form, setForm] = useState({ name: "", phone: "", email: "", pkg: "", msg: "" })
  const [sent, setSent] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  const [errors, setErrors] = useState<Record<string, boolean>>({})

  const handleSubmit = () => {
    const e: Record<string, boolean> = {}
    if (!form.name.trim())  e.name  = true
    if (!form.phone.trim()) e.phone = true
    if (Object.keys(e).length) { setErrors(e); return }
    setErrors({})
    setSent(true)
  }

  return (
    <div className="pt-32 md:pt-52 pb-20 md:pb-36 min-h-screen px-6 md:px-20" style={{ background: G.dark }}>
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <div className="mb-20">
            <Label>Get In Touch</Label>
            <h1 className="text-6xl md:text-[8rem] font-serif text-white tracking-tighter leading-none">
              Reserve
              <br />
              <span className="italic" style={{ color: G.gold }}>
                Your Night
              </span>
            </h1>
            <Divider className="mt-10 max-w-xs" />
          </div>
        </Reveal>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-28">
          <Reveal dir="left">
            {sent ? (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="py-20">
                <div
                  className="w-14 h-14 border-2 flex items-center justify-center mb-6"
                  style={{ borderColor: G.gold }}
                >
                  <Sparkles size={24} style={{ color: G.gold }} />
                </div>
                <h3 className="text-3xl font-serif text-white mb-3">Request Received</h3>
                <p className="text-gray-400 font-light">
                  {"We'll be in touch shortly to confirm your booking. See you at Amix Lounge!"}
                </p>
              </motion.div>
            ) : (
              <div className="space-y-5">
                {[
                  { name: "name", placeholder: "Your Name *", type: "text" },
                  { name: "phone", placeholder: "Phone Number *", type: "tel" },
                  { name: "email", placeholder: "Email Address", type: "email" },
                ].map((f) => (
                  <input
                    key={f.name}
                    type={f.type}
                    name={f.name}
                    placeholder={f.placeholder}
                    value={form[f.name as keyof typeof form]}
                    onChange={handleChange}
                    className={`w-full bg-transparent border-b text-white placeholder-gray-600 py-4 text-sm outline-none transition-colors font-light tracking-wider ${errors[f.name] ? "border-[#C0392B]" : "border-white/10 focus:border-[#C9A84C]"}`}
                  />
                ))}
                <select
                  name="pkg"
                  value={form.pkg}
                  onChange={handleChange}
                  className="w-full bg-[#110606] border-b border-white/10 focus:border-[#C9A84C] text-gray-500 py-4 text-sm outline-none transition-colors font-light"
                >
                  <option value="">Select a Package</option>
                  {PACKAGES.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} — {p.price}
                    </option>
                  ))}
                </select>
                <textarea
                  name="msg"
                  placeholder="Special requests or occasion?"
                  value={form.msg}
                  onChange={handleChange}
                  rows={4}
                  className="w-full bg-transparent border-b border-white/10 focus:border-[#C9A84C] text-white placeholder-gray-600 py-4 text-sm outline-none transition-colors font-light resize-none"
                />
                <div className="pt-4 flex flex-col gap-3">
                  <Btn onClick={handleSubmit} className="w-full">
                    Submit Request <ArrowRight size={13} />
                  </Btn>
                  <a
                    href="https://wa.me/27611897753?text=Hi%20Amix%20Lounge!%20I%27d%20like%20to%20make%20a%20reservation."
                    target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-4 text-[9px] uppercase tracking-[0.4em] font-bold border transition-all duration-300"
                    style={{ borderColor: "#25D36640", color: "#25D366", background: "#25D36610" }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    Book via WhatsApp
                  </a>
                </div>
              </div>
            )}
          </Reveal>
          <Reveal dir="right" delay={0.2}>
            <div className="space-y-12">
              {[
                {
                  label: "Location",
                  lines: ["13 End Street, Kempton Park", "Gauteng, South Africa"],
                },
                {
                  label: "Opening Hours",
                  lines: ["Friday & Saturday — 7PM to Late", "Special events by arrangement"],
                },
              ].map((r, i) => (
                <div key={i}>
                  <p className="text-[9px] uppercase tracking-[0.6em] text-gray-500 mb-3">{r.label}</p>
                  {r.lines.map((l, j) => (
                    <p key={j} className="text-white font-light text-base mb-1">
                      {l}
                    </p>
                  ))}
                  {i < 1 && <Divider className="mt-10" />}
                </div>
              ))}
              <Divider />
              <div>
                <p className="text-[9px] uppercase tracking-[0.6em] text-gray-500 mb-5">Follow Us</p>
                <div className="flex gap-7">
                  {[
                    { icon: <Instagram size={20} />, label: "@amixlounge", href: "https://instagram.com/amixlounge" },
                    { icon: <Facebook size={20} />, label: "AMIXLOUNGE", href: "https://facebook.com/AMIXLOUNGE" },
                  ].map((s, i) => (
                    <a
                      key={i}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-gray-400 hover:text-[#C9A84C] transition-colors text-[9px] uppercase tracking-wider group"
                    >
                      <span className="group-hover:scale-110 transition-transform">{s.icon}</span>
                      {s.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  )
}
