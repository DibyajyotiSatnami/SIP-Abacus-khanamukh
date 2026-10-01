import { motion } from 'framer-motion'

export function Reveal({ children, delay = 0, y = 40, className = '', as = 'div' }) {
  const Tag = motion[as]
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </Tag>
  )
}

export function SectionTitle({ kicker, title, highlight, sub, light = false }) {
  return (
    <div className={`section-title ${light ? 'section-title--light' : ''}`}>
      {kicker && (
        <Reveal as="span" className="kicker">
          {kicker}
        </Reveal>
      )}
      <Reveal as="h2" delay={0.05}>
        {title} {highlight && <span className="hl">{highlight}</span>}
      </Reveal>
      {sub && (
        <Reveal as="p" delay={0.1}>
          {sub}
        </Reveal>
      )}
    </div>
  )
}
