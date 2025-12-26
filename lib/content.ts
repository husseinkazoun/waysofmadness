export type SimplePage = {
  slug: string;
  title: string;
  summary?: string;
};

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/prints", label: "Prints" },
  { href: "/xprints", label: "XPrints" },
];

export const printsCategories: SimplePage[] = [
  { slug: "ashura", title: "Ashura" },
  { slug: "beqaa", title: "Beqaa" },
  { slug: "colored", title: "Colored" },
  { slug: "protests", title: "Protests" },
  { slug: "street-beirut", title: "Street Beirut" },
  { slug: "the-south", title: "The South" },
];

export const projectPages: SimplePage[] = [
  { slug: "archive-x", title: "Archive X" },
  { slug: "a-la-recherche-de-beyrouth", title: "A la recherche de Beyrouth" },
  { slug: "alternative-beirut", title: "Alternative Beirut" },
  { slug: "artevolution", title: "Artevolution" },
  { slug: "bokja", title: "Bokja" },
  { slug: "commercial-content", title: "Commercial Content" },
  { slug: "daftar-beirut", title: "Daftar Beirut" },
  { slug: "fata17", title: "Fata17" },
  { slug: "french-embassy", title: "French Embassy" },
  { slug: "fuel-project", title: "Fuel Project" },
  { slug: "i-was-naver", title: "I Was Naver" },
  { slug: "jal-el-bahr", title: "Jal el Bahr" },
  { slug: "jess-and-alex", title: "Jess and Alex" },
  { slug: "msafreen", title: "Msafreen" },
  { slug: "new-page-2", title: "New Page" },
  { slug: "noctiluca", title: "Noctiluca" },
  { slug: "shabah-el-rih", title: "Shabah el Rih" },
  { slug: "snakes-and-ladders", title: "Snakes and Ladders" },
  { slug: "southern-birds-project", title: "Southern Birds Project" },
  { slug: "store", title: "Store" },
  { slug: "storeee", title: "Store (alt)" },
  { slug: "subject-to-change", title: "Subject to Change" },
  { slug: "test9", title: "Test 9" },
  { slug: "the-bleed-zine", title: "The Bleed Zine" },
  { slug: "the-valley-of-sleep", title: "The Valley of Sleep" },
  { slug: "three-decades-and-a-climax", title: "Three Decades and a Climax" },
  { slug: "toujours-deux-editions", title: "Toujours Deux Editions" },
  { slug: "unchild-print-edition", title: "Unchild Print Edition" },
  { slug: "unchild-print-edition-1", title: "Unchild Print Edition 1" },
  { slug: "unhearable-voices", title: "Unhearable Voices" },
  { slug: "w-adrian-pepe", title: "W/ Adrian Pepe" },
  { slug: "womena", title: "Womena" },
  { slug: "womena-beirut", title: "Womena Beirut" },
  { slug: "womena-sound-of-saudi-3", title: "Womena: Sound of Saudi 3" },
  { slug: "work-1-1", title: "Work 1-1" },
  { slug: "zoukak-theatre", title: "Zoukak Theatre" },
];

// Store products are now defined in lib/store-products.ts
