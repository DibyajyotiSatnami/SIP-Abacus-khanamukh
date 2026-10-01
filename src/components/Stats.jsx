import { motion } from 'framer-motion'
import Counter from './Counter'
import { STATS } from '../data'

// Sine wave path for the background animation
function wave(amp, freq, phase, w = 1440, h = 300) {
  let d = `M0 ${h / 2}`
  for (let x = 0; x <= w; x += 12) {
    d += ` L${x} ${(h / 2 + Math.sin((x / w) * Math.PI * 2 * freq + phase) * amp).toFixed(1)}`
  }
  return d
}

export default function Stats() {
  return (
    <section className="stats">
      <svg className="stats__waves" viewBox="0 0 1440 300" preserveAspectRatio="none" aria-hidden="true">
        {[
          [60, 2, 0, 0.35],
          [40, 3, 1, 0.25],
          [80, 1.5, 2, 0.18],
        ].map(([a, f, p, o], i) => (
          <motion.path
            key={i}
            d={wave(a, f, p)}
            fill="none"
            stroke="#fff"
            strokeWidth="2"
            strokeOpacity={o}
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2.4, delay: i * 0.3, ease: 'easeInOut' }}
          />
        ))}
      </svg>
      <div className="container stats__grid">
        {STATS.map((s, i) => (
          <motion.div
            key={s.label}
            className="stat"
            initial={{ opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12, type: 'spring', stiffness: 200, damping: 15 }}
          >
            <div className="stat__value">
              <Counter value={s.value} decimals={s.decimals} suffix={s.suffix} />
            </div>
            <div className="stat__label">{s.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
