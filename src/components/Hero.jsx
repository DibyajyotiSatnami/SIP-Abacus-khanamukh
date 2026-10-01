import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Abacus from './Abacus'
import FloatingMath from './FloatingMath'
import { CENTRE } from '../data'

const line = {
  hidden: { opacity: 0, y: 40 },
  show: (i) => ({ opacity: 1, y: 0, transition: { delay: 0.15 + i * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] } }),
}

const SUMS = [
  [125, 348],
  [2048, 1024],
  [999, 1],
  [314, 159],
  [4567, 3210],
  [72, 28],
  [1500, 2750],
]

export default function Hero() {
  const [step, setStep] = useState(0)
  const [paused, setPaused] = useState(false)
  const [manual, setManual] = useState(0)

  // Cycle: show a, then a + b = total, on the abacus.
  useEffect(() => {
    if (paused) return
    const t = setInterval(() => setStep((s) => (s + 1) % (SUMS.length * 2)), 2200)
    return () => clearInterval(t)
  }, [paused])

  const [a, b] = SUMS[Math.floor(step / 2)]
  const showTotal = step % 2 === 1
  const value = paused ? manual : showTotal ? a + b : a

  return (
    <section className="hero" id="top">
      <FloatingMath />
      <div className="hero__blob" aria-hidden="true" />
      <div className="container hero__grid">
        <div className="hero__copy">
          <motion.p className="hero__eyebrow" variants={line} custom={0} initial="hidden" animate="show">
            {CENTRE.branch} · Guwahati
          </motion.p>
          <h1 className="hero__title">
            <motion.span variants={line} custom={1} initial="hidden" animate="show" className="hero__line">
              We <span className="hl">Promise</span> to
            </motion.span>
            <motion.span variants={line} custom={2} initial="hidden" animate="show" className="hero__line">
              Make Your Child
            </motion.span>
            <motion.span
              className="hero__5x"
              initial={{ opacity: 0, scale: 0.3, rotate: -12 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ delay: 0.5, type: 'spring', stiffness: 160, damping: 12 }}
            >
              5x
            </motion.span>
            <motion.span variants={line} custom={4} initial="hidden" animate="show" className="hero__line">
              Better
            </motion.span>
          </h1>
          <motion.p className="hero__sub" variants={line} custom={5} initial="hidden" animate="show">
            Improve speed &amp; accuracy of arithmetic skills in your child with our abacus &amp; mental‑maths programme.
          </motion.p>
          <motion.div className="hero__actions" variants={line} custom={6} initial="hidden" animate="show">
            <a className="btn btn--white" href="#contact">
              Book a Free Demo <span className="chev">»</span>
            </a>
            <a className="btn btn--outline" href={CENTRE.phoneHref}>
              📞 {CENTRE.phoneDisplay}
            </a>
          </motion.div>
        </div>

        <motion.div
          className="hero__card"
          initial={{ opacity: 0, y: 60, rotate: 4 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ delay: 0.4, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="hero__card-head">
            <span className="dot" /> Live abacus
            <button
              type="button"
              className="chip"
              onClick={() => {
                setManual(value)
                setPaused((p) => !p)
              }}
            >
              {paused ? '▶ Auto play' : '✋ Try it yourself'}
            </button>
          </div>
          <div className="hero__equation" aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.span
                key={paused ? 'manual' : step}
                initial={{ opacity: 0, y: 14, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -14, filter: 'blur(4px)' }}
                transition={{ duration: 0.3 }}
              >
                {paused ? (
                  <>Tap the beads → <b>{manual}</b></>
                ) : showTotal ? (
                  <>{a} + {b} = <b>{a + b}</b></>
                ) : (
                  <>{a} + {b} = <b>?</b></>
                )}
              </motion.span>
            </AnimatePresence>
          </div>
          <Abacus value={value} onChange={setManual} interactive={paused} />
        </motion.div>
      </div>

      <svg className="hero__wave" viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0,64 C240,120 480,0 720,48 C960,96 1200,24 1440,64 L1440,120 L0,120 Z" fill="var(--cream)" />
      </svg>
    </section>
  )
}
