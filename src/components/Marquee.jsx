import { motion } from 'framer-motion'

const ITEMS = ['Speed', '÷', 'Accuracy', '×', 'Concentration', '+', 'Memory', '−', 'Confidence', '=', 'Love for Numbers', '√']

export default function Marquee() {
  const row = [...ITEMS, ...ITEMS]
  return (
    <div className="marquee" aria-hidden="true">
      <motion.div
        className="marquee__track"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 28, ease: 'linear', repeat: Infinity }}
      >
        {row.map((t, i) => (
          <span key={i} className={t.length === 1 ? 'marquee__sym' : ''}>
            {t}
          </span>
        ))}
      </motion.div>
    </div>
  )
}
