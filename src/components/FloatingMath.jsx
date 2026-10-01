import { motion } from 'framer-motion'

const SYMBOLS = ['+', '−', '×', '÷', '=', 'π', '√', '∑', '%', '∞', '7', '3', '9', '5', '2', '8', '½', '∆']

// Deterministic pseudo-random so the layout is stable between renders.
function rand(seed) {
  const x = Math.sin(seed * 9301 + 49297) * 233280
  return x - Math.floor(x)
}

export default function FloatingMath({ count = 22, className = '' }) {
  const items = Array.from({ length: count }, (_, i) => ({
    char: SYMBOLS[i % SYMBOLS.length],
    left: rand(i + 1) * 100,
    top: rand(i + 101) * 100,
    size: 18 + rand(i + 201) * 46,
    duration: 6 + rand(i + 301) * 8,
    delay: rand(i + 401) * 4,
    drift: 20 + rand(i + 501) * 40,
    spin: (rand(i + 601) - 0.5) * 90,
  }))

  return (
    <div className={`floating-math ${className}`} aria-hidden="true">
      {items.map((it, i) => (
        <motion.span
          key={i}
          style={{ left: `${it.left}%`, top: `${it.top}%`, fontSize: it.size }}
          initial={{ opacity: 0, scale: 0.4 }}
          animate={{
            opacity: [0, 0.55, 0.55, 0],
            y: [0, -it.drift, -it.drift * 2],
            rotate: [0, it.spin, it.spin * 2],
            scale: [0.6, 1, 0.8],
          }}
          transition={{ duration: it.duration, delay: it.delay, repeat: Infinity, ease: 'easeInOut' }}
        >
          {it.char}
        </motion.span>
      ))}
    </div>
  )
}
