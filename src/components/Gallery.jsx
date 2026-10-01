import { useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { SectionTitle } from './Reveal'
import { GALLERY } from '../data'

function TiltCard({ item, onOpen, index }) {
  const x = useMotionValue(0.5)
  const y = useMotionValue(0.5)
  const rx = useSpring(useTransform(y, [0, 1], [10, -10]), { stiffness: 200, damping: 20 })
  const ry = useSpring(useTransform(x, [0, 1], [-10, 10]), { stiffness: 200, damping: 20 })

  return (
    <motion.button
      type="button"
      className={`gallery__item ${item.wide ? 'is-wide' : ''}`}
      style={{ rotateX: rx, rotateY: ry }}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect()
        x.set((e.clientX - r.left) / r.width)
        y.set((e.clientY - r.top) / r.height)
      }}
      onPointerLeave={() => {
        x.set(0.5)
        y.set(0.5)
      }}
      onClick={() => onOpen(item)}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      aria-label={`Open image: ${item.alt}`}
    >
      <motion.img layoutId={item.src} src={item.src} alt={item.alt} loading="lazy" />
    </motion.button>
  )
}

export default function Gallery() {
  const [open, setOpen] = useState(null)

  return (
    <section className="section section--cream" id="gallery">
      <div className="container">
        <SectionTitle kicker="Gallery" title="Life at" highlight="SIP Abacus" sub="A peek at our campaigns and our colourful classroom." />
        <div className="gallery">
          {GALLERY.map((g, i) => (
            <TiltCard key={g.src} item={g} index={i} onOpen={setOpen} />
          ))}
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            className="lightbox"
            onClick={() => setOpen(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label={open.alt}
          >
            <motion.img layoutId={open.src} src={open.src} alt={open.alt} />
            <button type="button" className="lightbox__close" aria-label="Close">
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
