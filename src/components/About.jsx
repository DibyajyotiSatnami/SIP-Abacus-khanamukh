import { motion } from 'framer-motion'
import { SectionTitle } from './Reveal'
import { FEATURES } from '../data'

const container = { hidden: {}, show: { transition: { staggerChildren: 0.09 } } }
const card = {
  hidden: { opacity: 0, y: 50, rotateX: -25 },
  show: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
}

export default function About() {
  return (
    <section className="section section--cream" id="about">
      <div className="container">
        <SectionTitle
          kicker="Why SIP Abacus"
          title="Want to Make Your Child Fall In Love With"
          highlight="Numbers?"
          sub="SIP Abacus — success assured. Our programme turns arithmetic into a game of beads, patterns and imagination, building skills that last a lifetime."
        />
        <motion.div
          className="features"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
        >
          {FEATURES.map((f) => (
            <motion.article
              key={f.title}
              className="feature"
              variants={card}
              whileHover={{ y: -10, rotate: -1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 18 }}
            >
              <motion.div
                className="feature__icon"
                whileHover={{ rotate: 360, scale: 1.15 }}
                transition={{ duration: 0.6 }}
              >
                {f.icon}
              </motion.div>
              <h3>{f.title}</h3>
              <p>{f.text}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
