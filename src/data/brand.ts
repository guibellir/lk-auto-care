/** Brand, services, service areas, and FAQ — single source of truth */

export const brand = {
  name: 'LK Auto Care',
  shortName: 'LK',
  legalName: 'LK Premium Auto Care',
  tagline: 'Premium Auto Care',
  slogan: 'Shine that stops traffic',
  established: 2022,
  city: 'Everett',
  state: 'Massachusetts',
  stateCode: 'MA',
  country: 'US',
  countryCode: 'US',
  /** Update when phone is confirmed */
  phone: '' as string,
  phoneDisplay: '' as string,
  /** Update when email is confirmed */
  email: 'hello@lkautocare.com',
  /** Instagram handle without @ — update when live */
  instagram: 'lkautocare',
  /** WhatsApp digits only with country code, e.g. 17815551234 — leave empty until set */
  whatsapp: '' as string,
  priceRange: '$$',
}

export function getSiteUrl(): string {
  const fromEnv = import.meta.env.VITE_SITE_URL as string | undefined
  if (fromEnv) return fromEnv.replace(/\/$/, '')
  if (typeof window !== 'undefined') return window.location.origin
  return 'https://lkautocare.com'
}

export type Service = {
  id: string
  name: string
  shortName: string
  description: string
  longDescription: string
  highlights: string[]
  icon: 'detail' | 'polish' | 'led' | 'exhaust' | 'remap'
  seoKeywords: string
}

export const services: Service[] = [
  {
    id: 'auto-detail',
    name: 'Interior & Exterior Detailing',
    shortName: 'Auto Detailing',
    description:
      'Full inside-and-out detailing that restores depth, clarity, and that just-detailed feel every time you open the door.',
    longDescription:
      'Our signature auto detail covers cabin deep-clean, leather and fabric care, glass, wheels, and a precise exterior wash and protection finish — ideal for daily drivers and show cars across Everett and Greater Boston.',
    highlights: [
      'Interior deep clean & decontamination',
      'Exterior wash, clay & protect',
      'Wheels, tires & glass',
      'Cabin odor & residue removal',
    ],
    icon: 'detail',
    seoKeywords:
      'auto detailing Everett MA, car detailing Greater Boston, interior exterior detail',
  },
  {
    id: 'polishing',
    name: 'Paint Correction & Polishing',
    shortName: 'Polishing',
    description:
      'Multi-stage polish that levels swirls and haze so paint reflects light the way it was meant to.',
    longDescription:
      'We correct oxidation, light scratches, and swirl marks with professional machine polishing, then refine the finish for a deep, wet-look gloss that holds up on Massachusetts roads.',
    highlights: [
      'Swirl & haze removal',
      'Single or multi-stage correction',
      'Machine polish for lasting clarity',
      'Optional ceramic-ready prep',
    ],
    icon: 'polish',
    seoKeywords:
      'car polish Everett, paint correction Boston MA, swirl removal Medford',
  },
  {
    id: 'led-headlights',
    name: 'LED Headlight Conversion',
    shortName: 'LED Headlights',
    description:
      'Brighter, cleaner light output with modern LED upgrades that look sharp and improve night visibility.',
    longDescription:
      'Upgrade outdated halogen setups to efficient LED headlights for a modern look and safer night driving — installed with care for fitment and beam pattern.',
    highlights: [
      'Modern LED brightness',
      'Cleaner light color temperature',
      'Professional fitment',
      'Improved night visibility',
    ],
    icon: 'led',
    seoKeywords:
      'LED headlight replacement Everett MA, headlight conversion Boston',
  },
  {
    id: 'exhaust',
    name: 'Exhaust System Replacement',
    shortName: 'Exhaust',
    description:
      'Performance-minded exhaust work for sound, flow, and reliability — from stock refresh to upgraded systems.',
    longDescription:
      'We replace worn exhaust components and install upgraded systems so your car breathes better, sounds right, and stays reliable through New England winters.',
    highlights: [
      'Stock or upgraded systems',
      'Leak & corrosion repair path',
      'Sound & flow balance',
      'Quality fitment & hardware',
    ],
    icon: 'exhaust',
    seoKeywords:
      'exhaust replacement Everett MA, car exhaust Boston, muffler shop near me',
  },
  {
    id: 'engine-remap',
    name: 'Engine Remap / ECU Tuning',
    shortName: 'Engine Remap',
    description:
      'Smart ECU remapping tuned for response, power delivery, and drivability on your specific vehicle.',
    longDescription:
      'Unlock refined throttle response and optimized power with professional engine remap services — calibrated for street use and responsible performance gains.',
    highlights: [
      'Throttle & power optimization',
      'Vehicle-specific mapping',
      'Street-focused drivability',
      'Consultation before flash',
    ],
    icon: 'remap',
    seoKeywords:
      'engine remap Everett MA, ECU tune Boston, car tuning Greater Boston',
  },
]

/** Primary service area + surrounding cities (expand anytime) */
export const serviceAreas = [
  { name: 'Everett', primary: true },
  { name: 'Medford', primary: false },
  { name: 'Melrose', primary: false },
  { name: 'Boston', primary: false },
  { name: 'Brookline', primary: false },
  { name: 'Somerville', primary: false },
  { name: 'Newton', primary: false },
  { name: 'Watertown', primary: false },
  { name: 'Cambridge', primary: false },
  { name: 'Malden', primary: false },
  { name: 'Chelsea', primary: false },
  { name: 'Revere', primary: false },
] as const

export const faqItems = [
  {
    question: 'Where is LK Auto Care based?',
    answer:
      'We are based in Everett, Massachusetts, and serve drivers across Greater Boston — including Medford, Melrose, Boston, Brookline, Somerville, Newton, Watertown, and nearby cities.',
  },
  {
    question: 'What services do you offer?',
    answer:
      'We specialize in interior and exterior auto detailing, paint polishing and correction, LED headlight conversion, exhaust system replacement, and engine remap / ECU tuning.',
  },
  {
    question: 'Do you only serve Everett?',
    answer:
      'No. Everett is our home base, but we regularly work with clients from Medford, Melrose, Boston, Brookline, Somerville, Newton, Watertown, Cambridge, Malden, Chelsea, Revere, and surrounding towns.',
  },
  {
    question: 'How do I book a detail or service?',
    answer:
      'Reach out through the contact form or call/message us with your vehicle, preferred service, and city. We will confirm availability and recommend the right package.',
  },
  {
    question: 'How long does a full detail take?',
    answer:
      'Most interior and exterior details take several hours depending on vehicle size and condition. Polishing, LED installs, exhaust work, and remaps vary — we share timing when you book.',
  },
  {
    question: 'Can you work on performance and appearance upgrades together?',
    answer:
      'Yes. Many clients combine detailing or polishing with LED headlights, exhaust upgrades, or engine remap. Tell us your goals and we will plan a clear service path.',
  },
] as const

export const stats = [
  { value: String(brand.established), label: 'Established' },
  { value: '5+', label: 'Core services' },
  { value: '12+', label: 'Cities served' },
  { value: '100%', label: 'Premium focus' },
] as const

export const processSteps = [
  {
    step: '01',
    title: 'Tell us your goal',
    description:
      'Share your vehicle, city, and whether you want a detail, polish, LEDs, exhaust, or remap.',
  },
  {
    step: '02',
    title: 'Get a clear plan',
    description:
      'We recommend the right package, timing, and finish level — no guesswork, no upsell fluff.',
  },
  {
    step: '03',
    title: 'We deliver the shine',
    description:
      'Precision work with premium products and careful craftsmanship from cabin to paint to performance.',
  },
] as const
