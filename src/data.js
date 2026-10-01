export const CENTRE = {
  name: 'SIP Abacus Khanamukh / Maligaon',
  branch: 'Boripara, Maligaon Centre',
  phoneDisplay: '+91 87218 11184',
  phoneHref: 'tel:+918721811184',
  whatsapp: 'https://wa.me/918721811184?text=' +
    encodeURIComponent('Hello SIP Abacus Maligaon, I would like to know more about the abacus programme for my child.'),
  address: 'Ayush Apartment, Ranigate, Guwahati, Assam 781017',
  plusCode: '4J27+P9 Guwahati, Assam',
  mapsQuery: 'Sip Abacus Khanamukh Maligaon, Ayush Apartment, Ranigate, Guwahati, Assam 781017',
  rating: 5.0,
  reviewCount: 4,
}

export const mapsLink =
  'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(CENTRE.mapsQuery)
export const mapsEmbed =
  'https://www.google.com/maps?q=' + encodeURIComponent(CENTRE.mapsQuery) + '&output=embed'

export const NAV = [
  { id: 'about', label: 'Why Us' },
  { id: 'abacus', label: 'Abacus' },
  { id: 'challenge', label: 'Flash Maths' },
  { id: 'programme', label: 'Programme' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'reviews', label: 'Reviews' },
  { id: 'contact', label: 'Contact' },
]

export const FEATURES = [
  { icon: '⚡', title: 'Speed', text: 'Children calculate faster than a calculator once the abacus lives in their mind.' },
  { icon: '🎯', title: 'Accuracy', text: 'Step‑by‑step bead logic builds precise, error‑free arithmetic habits.' },
  { icon: '🧠', title: 'Concentration', text: 'Visualising beads trains focus, attention span and working memory.' },
  { icon: '💪', title: 'Confidence', text: 'Every level cleared makes your child braver in class and in exams.' },
  { icon: '👂', title: 'Listening Skills', text: 'Oral sums sharpen listening, recall and quick response.' },
  { icon: '❤️', title: 'Love for Numbers', text: 'Our programme can make your child LOVE NUMBERS — maths becomes play.' },
]

export const STATS = [
  { value: 5, suffix: 'x', label: 'Better, we promise' },
  { value: 5.0, decimals: 1, suffix: '★', label: 'Google rating' },
  { value: 4, suffix: '', label: 'Five‑star reviews' },
  { value: 100, suffix: '%', label: 'Success assured' },
]

export const LEVELS = [
  { step: '01', title: 'Meet the Abacus', text: 'Bead values, finger movements and number sense through fun counting games.' },
  { step: '02', title: 'Small & Big Friends', text: 'Addition and subtraction with the friends‑of‑5 and friends‑of‑10 formulas.' },
  { step: '03', title: 'Mental Visualisation', text: 'Kids start solving sums on an imaginary abacus — no tool in hand.' },
  { step: '04', title: 'Multiplication & Division', text: 'Multi‑digit operations become quick and systematic.' },
  { step: '05', title: 'Flash Anzan & Speed', text: 'Flash numbers, oral sums and timed drills build lightning speed and accuracy.' },
]

export const GALLERY = [
  { src: `${import.meta.env.BASE_URL}images/promise-5x.jpg`, alt: 'We promise to make your child 5x better — SIP Abacus Boripara, Maligaon Centre' },
  { src: `${import.meta.env.BASE_URL}images/speed-accuracy.jpg`, alt: 'Improve speed and accuracy of arithmetic skills in your child with our programme' },
  { src: `${import.meta.env.BASE_URL}images/love-numbers.jpg`, alt: 'Want to make your child fall in love with numbers? Contact SIP Abacus Maligaon' },
  { src: `${import.meta.env.BASE_URL}images/triangle-puzzle.jpg`, alt: 'Count the number of triangles puzzle by SIP Abacus' },
  { src: `${import.meta.env.BASE_URL}images/classroom.jpg`, alt: 'Colourful SIP Abacus classroom decorations', wide: true },
]

// Reviews as listed on Google Maps (only Shuddha Das left written text).
export const REVIEWS = [
  { name: 'Shuddha Das', meta: '8 reviews · 1 photo', when: '6 months ago', text: 'Overall Good' },
  { name: 'Dibakar Das', meta: '2 reviews', when: '4 months ago', text: '' },
  { name: 'Gagan Thakuria', meta: '5 reviews · 2 photos', when: '8 months ago', text: '' },
]
