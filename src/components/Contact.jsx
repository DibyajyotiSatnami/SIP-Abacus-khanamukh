import { useState } from 'react'
import { motion } from 'framer-motion'
import { SectionTitle } from './Reveal'
import { CENTRE, mapsEmbed, mapsLink } from '../data'

export default function Contact() {
  const [form, setForm] = useState({ parent: '', child: '', age: '', phone: '' })
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const submit = (e) => {
    e.preventDefault()
    const msg =
      `Hello SIP Abacus Maligaon! I would like to book a free demo class.\n` +
      `Parent: ${form.parent}\nChild: ${form.child}\nAge: ${form.age}\nPhone: ${form.phone}`
    window.open(`${CENTRE.whatsapp.split('?')[0]}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener')
  }

  return (
    <section className="section section--cream" id="contact">
      <div className="container">
        <SectionTitle kicker="Contact Us" title="Visit our" highlight={CENTRE.branch} sub="Book a free demo class — we'd love to meet you and your child." />
        <div className="contact">
          <motion.div
            className="contact__info"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <a className="info" href={CENTRE.phoneHref}>
              <span className="info__icon">📞</span>
              <span><small>Call us</small>{CENTRE.phoneDisplay}</span>
            </a>
            <a className="info" href={CENTRE.whatsapp} target="_blank" rel="noreferrer">
              <span className="info__icon">💬</span>
              <span><small>WhatsApp</small>Chat with us</span>
            </a>
            <a className="info" href={mapsLink} target="_blank" rel="noreferrer">
              <span className="info__icon">📍</span>
              <span><small>Address</small>{CENTRE.address}</span>
            </a>
            <div className="info">
              <span className="info__icon">🧭</span>
              <span><small>Plus code</small>{CENTRE.plusCode}</span>
            </div>
            <div className="map">
              <iframe title="SIP Abacus Khanamukh / Maligaon on Google Maps" src={mapsEmbed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            </div>
          </motion.div>

          <motion.form
            className="contact__form"
            onSubmit={submit}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h3>Book a Free Demo</h3>
            <label>
              Parent's name
              <input required value={form.parent} onChange={set('parent')} autoComplete="name" />
            </label>
            <label>
              Child's name
              <input required value={form.child} onChange={set('child')} />
            </label>
            <div className="contact__row">
              <label>
                Child's age
                <input type="number" min="4" max="16" value={form.age} onChange={set('age')} />
              </label>
              <label>
                Phone
                <input type="tel" required value={form.phone} onChange={set('phone')} autoComplete="tel" />
              </label>
            </div>
            <motion.button type="submit" className="btn btn--red btn--block" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              Send via WhatsApp <span className="chev">»</span>
            </motion.button>
            <p className="contact__note">Opens WhatsApp with your details filled in.</p>
          </motion.form>
        </div>
      </div>
    </section>
  )
}
