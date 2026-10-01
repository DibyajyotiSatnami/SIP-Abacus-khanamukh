import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { SectionTitle } from './Reveal'

const LEVELS = {
  easy: { label: 'Beginner', digits: 1, count: 4, speed: 1100 },
  medium: { label: 'Junior', digits: 1, count: 6, speed: 800 },
  hard: { label: 'Champion', digits: 2, count: 5, speed: 900 },
}

function makeNumbers({ digits, count }) {
  const min = digits === 1 ? 1 : 10
  const max = digits === 1 ? 9 : 99
  return Array.from({ length: count }, () => min + Math.floor(Math.random() * (max - min + 1)))
}

export default function FlashChallenge() {
  const [level, setLevel] = useState('easy')
  const [phase, setPhase] = useState('idle') // idle | countdown | flash | answer | result
  const [numbers, setNumbers] = useState([])
  const [index, setIndex] = useState(-1)
  const [countdown, setCountdown] = useState(3)
  const [guess, setGuess] = useState('')
  const [score, setScore] = useState({ right: 0, played: 0 })
  const inputRef = useRef(null)

  const total = numbers.reduce((s, n) => s + n, 0)
  const correct = Number(guess) === total

  const start = () => {
    setNumbers(makeNumbers(LEVELS[level]))
    setGuess('')
    setIndex(-1)
    setCountdown(3)
    setPhase('countdown')
  }

  useEffect(() => {
    if (phase !== 'countdown') return
    const t = setTimeout(() => {
      if (countdown === 0) {
        setPhase('flash')
        setIndex(0)
      } else setCountdown((c) => c - 1)
    }, 650)
    return () => clearTimeout(t)
  }, [phase, countdown])

  useEffect(() => {
    if (phase !== 'flash') return
    const t = setTimeout(() => {
      if (index + 1 >= numbers.length) setPhase('answer')
      else setIndex((i) => i + 1)
    }, LEVELS[level].speed)
    return () => clearTimeout(t)
  }, [phase, index, numbers.length, level])

  useEffect(() => {
    if (phase === 'answer') inputRef.current?.focus()
  }, [phase])

  const submit = (e) => {
    e.preventDefault()
    if (guess === '') return
    setScore((s) => ({ right: s.right + (Number(guess) === total ? 1 : 0), played: s.played + 1 }))
    setPhase('result')
  }

  return (
    <section className="section section--cream" id="challenge">
      <div className="container">
        <SectionTitle
          kicker="Mental Maths Game"
          title="Flash Anzan"
          highlight="Challenge"
          sub="Numbers flash one after another — add them in your head! This is how SIP Abacus students train lightning‑fast mental arithmetic."
        />

        <div className="flash">
          <div className="flash__levels" role="radiogroup" aria-label="Difficulty">
            {Object.entries(LEVELS).map(([key, l]) => (
              <button
                key={key}
                type="button"
                role="radio"
                aria-checked={level === key}
                className={`flash__level ${level === key ? 'is-active' : ''}`}
                disabled={phase === 'countdown' || phase === 'flash'}
                onClick={() => setLevel(key)}
              >
                {level === key && <motion.span layoutId="level-pill" className="flash__pill" />}
                <span>{l.label}</span>
              </button>
            ))}
          </div>

          <div className="flash__screen">
            <AnimatePresence mode="wait">
              {phase === 'idle' && (
                <motion.div key="idle" className="flash__center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <p className="flash__hint">
                    {LEVELS[level].count} numbers · {LEVELS[level].digits}-digit · {(LEVELS[level].speed / 1000).toFixed(1)}s each
                  </p>
                  <motion.button
                    type="button"
                    className="btn btn--red btn--big"
                    onClick={start}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    animate={{ boxShadow: ['0 0 0 0 rgba(227,30,36,.5)', '0 0 0 18px rgba(227,30,36,0)'] }}
                    transition={{ boxShadow: { duration: 1.4, repeat: Infinity } }}
                  >
                    ▶ Start
                  </motion.button>
                </motion.div>
              )}

              {phase === 'countdown' && (
                <motion.div
                  key={`cd-${countdown}`}
                  className="flash__number flash__number--count"
                  initial={{ scale: 2.4, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.4, opacity: 0 }}
                  transition={{ duration: 0.35 }}
                >
                  {countdown || 'Go!'}
                </motion.div>
              )}

              {phase === 'flash' && (
                <motion.div
                  key={`n-${index}`}
                  className="flash__number"
                  initial={{ scale: 0.3, opacity: 0, rotate: -10 }}
                  animate={{ scale: 1, opacity: 1, rotate: 0 }}
                  exit={{ scale: 1.6, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 380, damping: 20 }}
                >
                  {numbers[index]}
                </motion.div>
              )}

              {phase === 'answer' && (
                <motion.form
                  key="answer"
                  className="flash__center"
                  onSubmit={submit}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <label htmlFor="flash-guess" className="flash__hint">What is the total?</label>
                  <input
                    id="flash-guess"
                    ref={inputRef}
                    className="flash__input"
                    inputMode="numeric"
                    autoComplete="off"
                    value={guess}
                    onChange={(e) => setGuess(e.target.value.replace(/\D/g, '').slice(0, 4))}
                  />
                  <button type="submit" className="btn btn--red">Check ✓</button>
                </motion.form>
              )}

              {phase === 'result' && (
                <motion.div
                  key="result"
                  className="flash__center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <motion.div
                    className={`flash__verdict ${correct ? 'is-right' : 'is-wrong'}`}
                    initial={{ rotate: correct ? -20 : 0, x: 0 }}
                    animate={correct ? { rotate: 0, scale: [1, 1.2, 1] } : { x: [0, -12, 12, -8, 8, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    {correct ? '🎉 Brilliant!' : '🤔 Almost!'}
                  </motion.div>
                  <p className="flash__sum">
                    {numbers.map((n, i) => (
                      <motion.span key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.08 }}>
                        {i > 0 && ' + '}
                        {n}
                      </motion.span>
                    ))}
                    <motion.b initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 + numbers.length * 0.08 }}>
                      {' '}= {total}
                    </motion.b>
                  </p>
                  {correct && <Confetti />}
                  <button type="button" className="btn btn--red" onClick={start}>Play again ↻</button>
                </motion.div>
              )}
            </AnimatePresence>

            {phase === 'flash' && (
              <div className="flash__dots" aria-hidden="true">
                {numbers.map((_, i) => (
                  <span key={i} className={i <= index ? 'on' : ''} />
                ))}
              </div>
            )}
          </div>

          <p className="flash__score">
            Score: <b>{score.right}</b> / {score.played}
          </p>
        </div>
      </div>
    </section>
  )
}

const CONFETTI = ['+', '×', '÷', '−', '=', '★', '5', '9']

function Confetti() {
  return (
    <div className="confetti" aria-hidden="true">
      {Array.from({ length: 26 }, (_, i) => {
        const angle = (i / 26) * Math.PI * 2
        const dist = 120 + (i % 5) * 30
        return (
          <motion.span
            key={i}
            initial={{ x: 0, y: 0, opacity: 1, scale: 0.5 }}
            animate={{ x: Math.cos(angle) * dist, y: Math.sin(angle) * dist + 60, opacity: 0, scale: 1.3, rotate: 360 }}
            transition={{ duration: 1.4, ease: 'easeOut' }}
            style={{ color: i % 2 ? '#e31e24' : '#ff8a00' }}
          >
            {CONFETTI[i % CONFETTI.length]}
          </motion.span>
        )
      })}
    </div>
  )
}
