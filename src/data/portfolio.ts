export type PortfolioTab = 'moving-image' | 'brand-digital' | 'tech-writing'

export interface PortfolioItem {
  id: string
  tab: PortfolioTab
  client: string
  title: string
  type: string
  badge: string
  thumb: string
  link?: string
  description?: string
}

// TODO: David — replace placeholder entries with real project data
export const portfolio: PortfolioItem[] = [
  // Moving Image
  {
    id: 'mi-01',
    tab: 'moving-image',
    client: 'BBC',
    title: 'Fault Lines',
    type: 'Broadcast Documentary',
    badge: 'BROADCAST',
    thumb: '/work/mi-01.jpg',
    description: 'Award-winning feature documentary on geopolitical fault lines.',
  },
  {
    id: 'mi-02',
    tab: 'moving-image',
    client: 'Al Jazeera',
    title: 'Crossing Borders',
    type: 'Travel Series',
    badge: 'BROADCAST',
    thumb: '/work/mi-02.jpg',
    description: '13-part travel series across four continents.',
  },
  {
    id: 'mi-03',
    tab: 'moving-image',
    client: 'AI Production',
    title: 'Neural Canvas',
    type: 'AI-Assisted Short Film',
    badge: 'AI-NATIVE',
    thumb: '/work/mi-03.jpg',
    description: 'Experimental short produced entirely with generative AI tools.',
  },
  // Brand & Digital
  {
    id: 'bd-01',
    tab: 'brand-digital',
    client: 'Emirates Airlines',
    title: 'Brand Identity Refresh',
    type: 'Brand Design',
    badge: 'BRAND',
    thumb: '/work/bd-01.jpg',
    description: 'Full identity system refresh for global airline brand.',
  },
  {
    id: 'bd-02',
    tab: 'brand-digital',
    client: 'Jumeirah',
    title: 'Digital Presence',
    type: 'Web & Digital',
    badge: 'DIGITAL',
    thumb: '/work/bd-02.jpg',
    description: 'Digital brand rollout across web and social channels.',
  },
  {
    id: 'bd-03',
    tab: 'brand-digital',
    client: 'Brand Client',
    title: 'Origin Story',
    type: 'Brand Film',
    badge: 'BRAND',
    thumb: '/work/bd-03.jpg',
    description: 'Three-minute brand film anchoring a global product launch.',
  },
  // Tech & Writing
  {
    id: 'tw-01',
    tab: 'tech-writing',
    client: 'Tech Client',
    title: 'Blockchain Whitepaper',
    type: 'Technical Writing',
    badge: 'TECH',
    thumb: '/work/tw-01.jpg',
    description: 'Deep-dive whitepaper on decentralised media distribution.',
  },
  {
    id: 'tw-02',
    tab: 'tech-writing',
    client: 'AI Studio',
    title: 'AI Production Methodology',
    type: 'Long-form Essay',
    badge: 'WRITING',
    thumb: '/work/tw-02.jpg',
    description: 'Framework for integrating generative AI into documentary production.',
  },
  {
    id: 'tw-03',
    tab: 'tech-writing',
    client: 'Brand Client',
    title: 'Strapline Case Study',
    type: 'Copy & Strategy',
    badge: 'COPY',
    thumb: '/work/tw-03.jpg',
    description: 'Strategy and language development for a global hospitality rebrand.',
  },
]
