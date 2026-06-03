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

  const handleSubmit = () => {
    if (form.name && form.phone) setSent(true)
  }

  return (
    <div className="pt-52 pb-36 min-h-screen px-6 md:px-20" style={{ background: G.dark }}>
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
                    className="w-full bg-transparent border-b border-white/10 focus:border-[#C9A84C] text-white placeholder-gray-600 py-4 text-sm outline-none transition-colors font-light tracking-wider"
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
                <div className="pt-4">
                  <Btn onClick={handleSubmit} className="w-full">
                    Submit Request <ArrowRight size={13} />
                  </Btn>
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
