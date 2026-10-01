import { useState } from 'react'
import { motion } from 'framer-motion'
import { SectionTitle } from './Reveal'
import { CENTRE } from '../data'

// Outlines traced from our "Count the number of Triangles" post.
const SHAPES = [
  '440,570 263,933 615,933',
  '797,377 623,740 975,740',
  '472,640 828,643 648,1005',
  '573,640 397,1002 750,1002',
  '463,865 845,740 710,1120',
]

export default function Puzzle() {
  const [active, setActive] = useState(null)
  const [round, setRound] = useState(0)

  return (
    <section className="section section--orange puzzle" id="puzzle">
      <div className="container puzzle__grid">
        <div>
          <SectionTitle
            light
            kicker="Brain Teaser"
            title="Count the number of"
            highlight="Triangles"
            sub="Look closely — overlapping lines hide many more triangles than you first see. Tap a shape to highlight it, then send us your answer!"
          />
          <div className="puzzle__actions">
            <button type="button" className="btn btn--white" onClick={() => { setActive(null); setRound((r) => r + 1) }}>
              ↻ Redraw
            </button>
            <a className="btn btn--red" href={`${CENTRE.whatsapp.split('?')[0]}?text=${encodeURIComponent('My answer to the SIP Abacus triangle puzzle is: ')}`} target="_blank" rel="noreferrer">
              Send answer on WhatsApp
            </a>
          </div>
        </div>
        <svg key={round} className="puzzle__svg" viewBox="240 350 760 800" role="img" aria-label="Overlapping triangles puzzle">
          {SHAPES.map((pts, i) => (
            <motion.polygon
              key={i}
              points={pts}
              fill={active === i ? 'rgba(227,30,36,.35)' : 'rgba(255,255,255,0)'}
              stroke={active === i ? '#e31e24' : '#fff'}
              strokeWidth={active === i ? 7 : 4}
              strokeLinejoin="round"
              style={{ cursor: 'pointer' }}
              onClick={() => setActive(active === i ? null : i)}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ pathLength: { duration: 1.4, delay: i * 0.45, ease: 'easeInOut' }, opacity: { duration: 0.2, delay: i * 0.45 } }}
              whileHover={{ strokeWidth: 7 }}
            />
          ))}
        </svg>
      </div>
    </section>
  )
}
