import { motion } from 'framer-motion'

const BEAD_H = 26
const GAP = 2
const BEAM_TOP = 72
const ROD_H = 250
const HEAVEN_OFF = 10
const HEAVEN_ON = BEAM_TOP - BEAD_H - 4
const EARTH_ON = (i) => BEAM_TOP + 14 + i * (BEAD_H + GAP)
const EARTH_OFF = (i) => EARTH_ON(i) + 40

const spring = { type: 'spring', stiffness: 420, damping: 26 }

function Rod({ digit, onChange, place, interactive }) {
  const heaven = digit >= 5
  const earth = digit % 5

  const toggleHeaven = () => onChange(heaven ? digit - 5 : digit + 5)
  const clickEarth = (i) => {
    const next = i < earth ? i : i + 1
    onChange((heaven ? 5 : 0) + next)
  }

  return (
    <div className="rod" style={{ height: ROD_H }}>
      <div className="rod__stick" />
      <motion.button
        type="button"
        className="bead bead--heaven"
        aria-label={`${place}: five bead ${heaven ? 'on' : 'off'}`}
        disabled={!interactive}
        onClick={toggleHeaven}
        animate={{ y: heaven ? HEAVEN_ON : HEAVEN_OFF }}
        transition={spring}
        whileHover={interactive ? { scale: 1.08 } : undefined}
        whileTap={interactive ? { scale: 0.92 } : undefined}
      />
      {[0, 1, 2, 3].map((i) => (
        <motion.button
          type="button"
          key={i}
          className="bead"
          aria-label={`${place}: one bead ${i + 1} ${i < earth ? 'on' : 'off'}`}
          disabled={!interactive}
          onClick={() => clickEarth(i)}
          animate={{ y: i < earth ? EARTH_ON(i) : EARTH_OFF(i) }}
          transition={{ ...spring, delay: (i < earth ? i : 3 - i) * 0.02 }}
          whileHover={interactive ? { scale: 1.08 } : undefined}
          whileTap={interactive ? { scale: 0.92 } : undefined}
        />
      ))}
      <span className="rod__digit">{digit}</span>
    </div>
  )
}

const PLACES = ['Ones', 'Tens', 'Hundreds', 'Thousands', 'Ten-thousands', 'Lakhs', 'Ten-lakhs']

export default function Abacus({ value, onChange, rods = 5, interactive = true }) {
  const digits = String(Math.max(0, Math.floor(value))).padStart(rods, '0').slice(-rods).split('').map(Number)

  const setDigit = (idx, d) => {
    const next = [...digits]
    next[idx] = d
    onChange?.(Number(next.join('')))
  }

  return (
    <div className="abacus" role="group" aria-label={`Abacus showing ${value}`}>
      <div className="abacus__beam" style={{ top: BEAM_TOP + 4 }} />
      <div className="abacus__rods">
        {digits.map((d, idx) => (
          <Rod
            key={idx}
            digit={d}
            place={PLACES[rods - 1 - idx] ?? `Rod ${idx + 1}`}
            interactive={interactive}
            onChange={(nd) => setDigit(idx, nd)}
          />
        ))}
      </div>
    </div>
  )
}
