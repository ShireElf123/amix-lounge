// ═══════════════════════════════════════════════
// BRAND TOKENS
// ═══════════════════════════════════════════════
export const G = {
  crimson:       "#7A0000",
  crimsonMid:    "#A01010",
  crimsonBright: "#C0392B",
  gold:          "#C8A951",
  goldLight:     "#E2C97E",
  goldDim:       "#8B7535",
  dark:          "#080202",
  surface0:      "#0E0404",
  surface1:      "#140606",
  surface2:      "#1C0A0A",
  text:          "#F0EAE0",
  muted:         "#7A6A60",
  border:        "rgba(200,169,81,0.12)",
  borderHover:   "rgba(200,169,81,0.35)",
}

const Q = "auto=format&fit=crop&q=85"

// ═══════════════════════════════════════════════
// IMAGES
// ═══════════════════════════════════════════════
export const IMG = {
  // ── BRAND ──
  logo:    "https://res.cloudinary.com/dfuibw321/image/upload/v1778888492/file_00000000b930722fb01c9821c42f3094_pecxib.png",
  hero:    "https://res.cloudinary.com/dfuibw321/image/upload/v1778888304/Untitled_design_12_rr1v6x.png",

  // ── FOOD — original kota kept, new real client food photos added ──
  kota:    "https://res.cloudinary.com/dfuibw321/image/upload/v1778888257/air-fryer-kota_gonih1.webp",
  kota2:   "https://res.cloudinary.com/dfuibw321/image/upload/v1780509225/kota_2_fewncb.jpg",
  burger1: "https://res.cloudinary.com/dfuibw321/image/upload/v1780509301/ham_burger_n_chips_erlddv.jpg",
  burger2: "https://res.cloudinary.com/dfuibw321/image/upload/v1780509225/ham_burger_n_chips_vcbzow.jpg",
  wors:    "https://res.cloudinary.com/dfuibw321/image/upload/v1780509227/wors_short_rib_and_pap_shemiu.jpg",
  wings:   "https://res.cloudinary.com/dfuibw321/image/upload/v1780509226/wings_n_chipsfries_www3h5.jpg",
  chicken1:"https://res.cloudinary.com/dfuibw321/image/upload/v1780509226/full_chicken_and_chips_qdeh1t.jpg",
  chicken2:"https://res.cloudinary.com/dfuibw321/image/upload/v1780509225/full_chicken_and_chips_2_oueesd.jpg",
  mystery: "https://res.cloudinary.com/dfuibw321/image/upload/v1780509223/2b931dca-fbf5-46c9-bdac-f7e141d205a0_jte5ud.jpg",
  platter: "/food/platter.jpg",
  wingsTray: "/food/wings-tray.jpg",

  // ── VENUE — original Unsplash kept for atmosphere, real client photos added ──
  crowd:   "https://res.cloudinary.com/dfuibw321/image/upload/v1780511654/cinematic_lounge_scene_with_blurred_peaople_in_the_back_rryjrh.png",
  live:    "https://res.cloudinary.com/dfuibw321/image/upload/v1780509244/Live_Entertainment_j4zufe.jpg",
  dj:      "https://res.cloudinary.com/dfuibw321/image/upload/v1780511189/celleb_on_dj_decks_luqew0.png",
  djeddie: "https://res.cloudinary.com/dfuibw321/image/upload/v1780511673/dj_eddie-e_host_ikxdwo.png",
  celeb:   "https://res.cloudinary.com/dfuibw321/image/upload/v1780511179/celleb_performing_1_nnr3ez.png",
  bar:     `https://images.unsplash.com/photo-1470337458703-46ad1756a187?${Q}&w=1200`,
  barReal: "https://res.cloudinary.com/dfuibw321/image/upload/v1780511186/bar_k8iw1c.png",
  vip:     `https://images.unsplash.com/photo-1414235077428-338989a2e8c0?${Q}&w=1200`,
  lounge:  `https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?${Q}&w=1200`,
  ladies1: "https://res.cloudinary.com/dfuibw321/image/upload/v1780511654/ladies_a0sxsh.png",
  ladies2: "https://res.cloudinary.com/dfuibw321/image/upload/v1780511633/ladies_2_ukmy0d.png",

  // ── DRINKS — proper cocktail/beer Unsplash, NOT the bar venue photo ──
  cocktail:`https://images.unsplash.com/photo-1551024709-8f23befc6f87?${Q}&w=800`,
  beer:    `https://images.unsplash.com/photo-1608270586620-248524c67de9?${Q}&w=800`,

  // ── SIDES ──
  fries:   `https://images.unsplash.com/photo-1573080496219-bb080dd4f877?${Q}&w=800`,

  fallback:`https://images.unsplash.com/photo-1504674900247-0877df9cc836?${Q}&w=800`,
}

// WhatsApp
export const WA_NUMBER = "27611897753"
export const waLink = (item: string, price: number) =>
  `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(`Hi Amix Lounge! I'd like to order: ${item} (R${price}). Please confirm availability.`)}`

// ═══════════════════════════════════════════════
// SHOP ITEMS — each item gets its own distinct image
// ═══════════════════════════════════════════════
export interface ShopItem {
  id: string
  category: string
  badge?: string | null
  name: string
  price: number
  desc: string
  img: string
  tags: string[]
  featured?: boolean
}

export const SHOP_ITEMS: ShopItem[] = [
  // ── KOTA BAR — kota & kota2 alternate so no duplicates ──
  { id:"kota-r25", category:"Kota Bar", badge:null, name:"Starter Kota", price:25,
    desc:"The classic. Achar, chips, polony & viana in a fresh quarter loaf.",
    img:IMG.kota, tags:["Achar","Chips","Polony","Viana"] },
  { id:"kota-r30", category:"Kota Bar", badge:null, name:"Cheesy Kota", price:30,
    desc:"Everything in the Starter, with a generous layer of melted cheese.",
    img:IMG.kota2, tags:["Achar","Chips","Polony","Viana","Cheese"] },
  { id:"kota-r35", category:"Kota Bar", badge:null, name:"Egg & Cheese Kota", price:35,
    desc:"Achar, chips and polony stacked with egg and cheese.",
    img:IMG.kota, tags:["Achar","Chips","Polony","Egg","Cheese"] },
  { id:"kota-r40", category:"Kota Bar", badge:"Popular", name:"Half Russian Kota", price:40,
    desc:"Chips, polony, half Russian sausage, cheese and egg. The upgrade.",
    img:IMG.kota2, tags:["Achar","Chips","Polony","½ Russian","Cheese","Egg"] },
  { id:"kota-r45", category:"Kota Bar", badge:null, name:"Viana Stack", price:45,
    desc:"The full combo — viana, cheese and egg together at last.",
    img:IMG.kota, tags:["Achar","Chips","Polony","Viana","Cheese","Egg"] },
  { id:"kota-r50", category:"Kota Bar", badge:"🔥 Hot Pick", name:"Full Russian Kota", price:50,
    desc:"Viana, egg, full Russian sausage and cheese. No compromises.",
    img:IMG.kota2, tags:["Achar","Chips","Polony","Viana","Egg","Full Russian","Cheese"] },
  { id:"kota-r65", category:"Kota Bar", badge:"👑 Boss", name:"The Boss Kota", price:65,
    desc:"Loaded to the absolute limit. Viana, egg, Full Russian, pattie and cheese. This is it.",
    img:IMG.kota, tags:["Achar","Chips","Polony","Viana","Egg","Full Russian","Pattie","Cheese"], featured:true },

  // ── GRILLS & MAINS — each has its own unique photo ──
  { id:"burger-1", category:"Grills & Mains", badge:"⭐ Must Try", name:"Burger & Chips", price:85,
    desc:"Juicy beef patty, fresh build, served with a generous portion of golden slap chips.",
    img:IMG.burger1, tags:["Beef","Chips","Fresh"], featured:true },
  { id:"burger-2", category:"Grills & Mains", badge:null, name:"Classic Burger & Chips", price:75,
    desc:"The no-nonsense burger. Stacked, sauced and served right.",
    img:IMG.burger2, tags:["Beef","Chips","Classic"] },
  { id:"wors-rib", category:"Grills & Mains", badge:"🔥 Kasi Favourite", name:"Wors, Short Rib & Pap", price:120,
    desc:"Traditional boerewors and short rib, slow-cooked to perfection, served with stiff pap.",
    img:IMG.wors, tags:["Boerewors","Short Rib","Pap","Traditional"], featured:true },
  { id:"full-chicken-1", category:"Grills & Mains", badge:"Best Value", name:"Full Chicken & Chips", price:110,
    desc:"A whole rotisserie chicken, perfectly seasoned, with a mountain of chips on the side.",
    img:IMG.chicken1, tags:["Full Chicken","Chips","Rotisserie"] },
  { id:"full-chicken-2", category:"Grills & Mains", badge:null, name:"Chicken Feast", price:110,
    desc:"Golden-fried full chicken and chips. Family style. No cutlery needed.",
    img:IMG.chicken2, tags:["Full Chicken","Chips","Fried"] },

  // ── WINGS & SIDES ──
  { id:"wings-chips", category:"Wings & Sides", badge:"🔥 Hot Pick", name:"Wings & Chips", price:75,
    desc:"Crispy, saucy wings with golden slap chips. The ultimate lounge snack.",
    img:IMG.wingsTray, tags:["Wings","Chips","Crispy"], featured:true },
  { id:"sides-fries-m", category:"Wings & Sides", badge:null, name:"Medium Chips", price:25,
    desc:"Golden, crispy slap chips. Medium portion.",
    img:IMG.fries, tags:["Medium","Crispy"] },
  { id:"sides-fries-l", category:"Wings & Sides", badge:"Best Value", name:"Large Chips", price:45,
    desc:"The big one. Loaded large portion of our signature slap chips.",
    img:IMG.fries, tags:["Large","Crispy"] },
  { id:"mystery-plate", category:"Wings & Sides", badge:"Chef's Special", name:"Chef's Plate", price:95,
    desc:"The kitchen's daily special. Ask your server what's on tonight.",
    img:IMG.mystery, tags:["Special","Daily","Chef"] },

  // ── DRINKS — proper drink images, NOT venue bar photo ──
  { id:"drinks-cocktail", category:"Drinks", badge:null, name:"Signature Cocktail", price:85,
    desc:"Ask the bar for today's special. Crafted fresh, served ice cold.",
    img:IMG.cocktail, tags:["Cocktail","Signature"] },
  { id:"drinks-beer", category:"Drinks", badge:"Bestseller", name:"Ice Cold Beer", price:35,
    desc:"Ice cold draught. The perfect companion for any Kota.",
    img:IMG.beer, tags:["Beer","Draught"] },

  // ── PLATTERS ──
  { id:"platter-ballers", category:"Platters", badge:"⭐ Fan Favourite", name:"Ballers Platter", price:250,
    desc:"The legendary Ballers Platter. As seen on Tripadvisor reviews. Built to share, built to impress.",
    img:IMG.platter, tags:["Sharing","Premium","Legendary"], featured:true },
  { id:"platter-wings", category:"Platters", badge:null, name:"Wings Platter", price:120,
    desc:"Crispy, saucy wings. A crowd pleaser for any table.",
    img:IMG.wingsTray, tags:["Sharing","Chicken"] },
]

export const SHOP_CATEGORIES = ["All","Kota Bar","Grills & Mains","Wings & Sides","Drinks","Platters"]

// ═══════════════════════════════════════════════
// VIP PACKAGES
// ═══════════════════════════════════════════════
export interface Package {
  id: string
  name: string
  tier: string
  price: number
  img: string
  perks: string[]
}

export const PACKAGES: Package[] = [
  { id:"pkg-standard", name:"Social Table", tier:"Standard", price:500, img:IMG.lounge,
    perks:["Table for up to 6","Welcome round","Full menu access","Reserved spot"] },
  { id:"pkg-vip", name:"VIP Booth", tier:"VIP", price:1500, img:IMG.vip,
    perks:["Premium booth","Bottle service","Dedicated waiter","Priority entry"] },
  { id:"pkg-ultra", name:"ULTRA Reserve", tier:"Ultra VIP", price:4000, img:IMG.crowd,
    perks:["Front-stage booth","Champagne package","Full night service","Complimentary platter"] },
]

// ═══════════════════════════════════════════════
// KOTA MENU
// ═══════════════════════════════════════════════
export const KOTAS = [
  { price:"R25", items:["Achar","Chips","Polony","Viana"] },
  { price:"R30", items:["Achar","Chips","Polony","Viana","Cheese"] },
  { price:"R35", items:["Achar","Chips","Polony","Egg","Cheese"] },
  { price:"R40", items:["Achar","Chips","Polony","½ Russian","Cheese","Egg"] },
  { price:"R45", items:["Achar","Chips","Polony","Viana","Cheese","Egg"] },
  { price:"R50", items:["Achar","Chips","Polony","Viana","Egg","Full Russian","Cheese"] },
  { price:"R65", items:["Achar","Chips","Polony","Viana","Egg","Full Russian","Pattie","Cheese"], featured:true },
]

export const ADDONS = [
  { name:"Medium Chips", price:"R25" },
  { name:"Large Chips",  price:"R45" },
  { name:"Viana",        price:"R7"  },
  { name:"Cheese",       price:"R5"  },
  { name:"Egg",          price:"R5"  },
  { name:"Russian",      price:"R20" },
  { name:"Polony",       price:"R2"  },
]
