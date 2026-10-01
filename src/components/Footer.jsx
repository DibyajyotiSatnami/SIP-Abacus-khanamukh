import Logo from './Logo'
import { CENTRE, NAV } from '../data'

const YEAR = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div>
          <Logo />
          <p>{CENTRE.name}<br />{CENTRE.branch}</p>
        </div>
        <nav aria-label="Footer">
          {NAV.map((n) => (
            <a key={n.id} href={`#${n.id}`}>{n.label}</a>
          ))}
        </nav>
        <div>
          <p><a href={CENTRE.phoneHref}>📞 {CENTRE.phoneDisplay}</a></p>
          <p>📍 {CENTRE.address}</p>
        </div>
      </div>
      <p className="footer__copy">© {YEAR} {CENTRE.name}. Success assured.</p>
    </footer>
  )
}
