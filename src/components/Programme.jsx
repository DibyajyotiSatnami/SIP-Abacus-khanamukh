import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { SectionTitle } from './Reveal'
import { LEVELS } from '../data'

export default function Programme() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 60%'] })
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section className="section section--white" id="programme">
      <div className="container">
        <SectionTitle
          kicker="Our Programme"
          title="Improve Speed & Accuracy of"
          highlight="Arithmetic Skills"
          sub="A step‑by‑step journey from counting beads to solving sums in the blink of an eye."
        />
        <div className="timeline" ref={ref}>
          <div className="timeline__track">
            <motion.div className="timeline__fill" style={{ scaleY: lineScale }} />
          </div>
          {LEVELS.map((l, i) => (
            <motion.div
              key={l.step}
              className={`timeline__item ${i % 2 ? 'is-right' : ''}`}
              initial={{ opacity: 0, x: i % 2 ? 60 : -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.span
                className="timeline__node"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ type: 'spring', stiffness: 300, delay: 0.2 }}
              >
                {l.step}
              </motion.span>
              <div className="timeline__card">
                <h3>{l.title}</h3>
                <p>{l.text}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="promo"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
        >
          <div className="promo__copy">
            <h3>
              Our Program can make <em>your Child</em> <strong>LOVE NUMBERS.</strong>
            </h3>
            <p>Small batches, caring teachers and a colourful classroom at our Boripara, Maligaon Centre.</p>
            <a className="btn btn--white" href="#contact">
              Contact Us <span className="chev">»</span>
            </a>
          </div>
          <motion.img
            src={`${import.meta.env.BASE_URL}images/speed-accuracy.jpg`}
            alt="Improve speed and accuracy of arithmetic skills — SIP Abacus Maligaon"
            loading="lazy"
            whileHover={{ scale: 1.04, rotate: 1 }}
          />
        </motion.div>
      </div>
    </section>
  )
}
