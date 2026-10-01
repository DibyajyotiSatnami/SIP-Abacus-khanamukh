import { motion } from 'framer-motion'
import { SectionTitle } from './Reveal'
import { CENTRE, REVIEWS, mapsLink } from '../data'

function Stars({ size = 20 }) {
  return (
    <span className="stars" style={{ fontSize: size }} aria-label="5 out of 5 stars">
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.span
          key={i}
          initial={{ scale: 0, rotate: -90 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 + i * 0.08, type: 'spring', stiffness: 400, damping: 12 }}
        >
          ★
        </motion.span>
      ))}
    </span>
  )
}

export default function Reviews() {
  return (
    <section className="section section--white" id="reviews">
      <div className="container">
        <SectionTitle kicker="Reviews" title="Parents" highlight="Love Us" sub="What families say about us on Google." />
        <div className="reviews">
          <motion.div
            className="reviews__summary"
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="reviews__score">{CENTRE.rating.toFixed(1)}</div>
            <Stars size={28} />
            <p>{CENTRE.reviewCount} Google reviews</p>
            <div className="reviews__bars">
              {[5, 4, 3, 2, 1].map((n) => (
                <div key={n} className="bar">
                  <span>{n}</span>
                  <div className="bar__track">
                    <motion.div
                      className="bar__fill"
                      initial={{ width: 0 }}
                      whileInView={{ width: n === 5 ? '100%' : '0%' }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: 0.3 }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <a className="btn btn--red btn--small" href={mapsLink} target="_blank" rel="noreferrer">
              Write a review
            </a>
          </motion.div>

          <div className="reviews__list">
            {REVIEWS.map((r, i) => (
              <motion.article
                key={r.name}
                className="review"
                initial={{ opacity: 0, x: 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: i * 0.12, duration: 0.6 }}
                whileHover={{ y: -6 }}
              >
                <div className="review__avatar">{r.name[0]}</div>
                <div>
                  <h3>{r.name}</h3>
                  <p className="review__meta">{r.meta}</p>
                  <div className="review__row">
                    <Stars size={16} /> <span>{r.when}</span>
                  </div>
                  {r.text ? <p className="review__text">“{r.text}”</p> : <p className="review__text review__text--muted">Rated 5 stars</p>}
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
