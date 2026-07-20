/** Before / after sets for the work gallery */

export type GalleryPair = {
  id: string
  title: string
  area: string
  vehicle: string
  before: string
  after: string
  beforeAlt: string
  afterAlt: string
}

/**
 * VW Golf GTI interior detail — matched angles only.
 * Selected from full set: cockpit, front seat, rear seats, trunk.
 * Skipped: center console (no after), fold-down pass-through (no after),
 * door panel alone (no matching before).
 */
export const galleryPairs: GalleryPair[] = [
  {
    id: 'gti-cockpit',
    title: 'Driver cabin',
    area: 'Cockpit & dash',
    vehicle: 'VW Golf GTI',
    before: '/images/gallery/gti-cockpit-before.jpg',
    after: '/images/gallery/gti-cockpit-after.jpg',
    beforeAlt:
      'VW Golf GTI driver cockpit before detailing — dusty dash, dirty floor mat and seat',
    afterAlt:
      'VW Golf GTI driver cockpit after detailing — cleaned leather, mat and controls',
  },
  {
    id: 'gti-seat',
    title: 'Front seat',
    area: 'Seat, door & footwell',
    vehicle: 'VW Golf GTI',
    before: '/images/gallery/gti-seat-before.jpg',
    after: '/images/gallery/gti-seat-after.jpg',
    beforeAlt:
      'VW Golf GTI front seat before detailing — clutter, leaves on mat and dusty door panel',
    afterAlt:
      'VW Golf GTI front seat after detailing — clean seat, GTI mat and door pocket',
  },
  {
    id: 'gti-rear',
    title: 'Rear seats',
    area: 'Rear cabin',
    vehicle: 'VW Golf GTI',
    before: '/images/gallery/gti-rear-before.jpg',
    after: '/images/gallery/gti-rear-after.jpg',
    beforeAlt:
      'VW Golf GTI rear seats before detailing — dusty leather and debris on floor',
    afterAlt:
      'VW Golf GTI rear seats after detailing — cleaned leather and carpet',
  },
  {
    id: 'gti-trunk',
    title: 'Trunk',
    area: 'Cargo area',
    vehicle: 'VW Golf GTI',
    before: '/images/gallery/gti-trunk-before.jpg',
    after: '/images/gallery/gti-trunk-after.jpg',
    beforeAlt:
      'VW Golf GTI trunk before detailing — stained carpet, leaves and dust',
    afterAlt:
      'VW Golf GTI trunk after detailing — deep-cleaned cargo carpet',
  },
]
