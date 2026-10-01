import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Abacus from './Abacus'
import { SectionTitle, Reveal } from './Reveal'

const MAX = 99999

export default function Playground() {
  const [value, setValue] = useState(2026)
  const [counting, setCounting] = useState(false)

  useEffect(() => {
    if (!counting) return
    const t = setInterval(() => setValue((v) => (v >= MAX ? 0 : v + 1)), 420)
    return () => clearInterval(t)
  }, [counting])

  const change = (v) => {
    setCounting(false)
    setValue(Math.min(MAX, Math.max(0, v)))
  }

  const digits = String(value).split('')

  return (
    <section className="section section--orange" id="abacus">
      <div className="container playground">
        <div className="playground__copy">
          <SectionTitle
            light
            kicker="Interactive"
            title="Play with a"
            highlight="Real Abacus"
            sub="Each rod is a place value. The top bead is worth 5, each bottom bead is worth 1. Tap a bead to push it to the beam — just like our students do in class!"
          />
          <Reveal className="playground__legend" delay={0.15}>
            <div><span className="legend-bead legend-bead--heaven" /> Heaven bead = 5</div>
            <div><span className="legend-bead" /> Earth bead = 1</div>
          </Reveal>
        </div>

        <Reveal className="playground__board" delay={0.1}>
          <div className="odometer" aria-live="polite" aria-label={`Value ${value}`}>
            <AnimatePresence initial={false} mode="popLayout">
              {digits.map((d, i) => (
                <motion.span
                  key={`${digits.length - i}-${d}`}
                  initial={{ y: -40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 40, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                >
                  {d}
                </motion.span>
              ))}
            </AnimatePresence>
          </div>
          <Abacus value={value} onChange={change} />
          <div className="playground__controls">
            <button type="button" className="btn btn--small btn--white" onClick={() => change(value - 1)}>
              − 1
            </button>
            <button type="button" className="btn btn--small btn--white" onClick={() => change(value + 1)}>
              + 1
            </button>
            <button type="button" className="btn btn--small btn--white" onClick={() => change(Math.floor(Math.random() * MAX))}>
              🎲 Random
            </button>
            <button type="button" className="btn btn--small btn--red" onClick={() => setCounting((c) => !c)}>
              {counting ? '⏸ Stop' : '▶ Auto count'}
            </button>
            <button type="button" className="btn btn--small btn--ghost" onClick={() => change(0)}>
              Reset
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
