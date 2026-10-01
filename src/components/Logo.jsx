export default function Logo({ small = false }) {
  return (
    <div className={`logo ${small ? 'logo--small' : ''}`} aria-label="SIP Abacus — success assured">
      <div className="logo__row">
        <span className="logo__sip">
          <span className="logo__cap" aria-hidden="true">🎓</span>SIP
        </span>
        <span className="logo__abacus">abacus<sup>©</sup></span>
      </div>
      <span className="logo__tag">success assured</span>
    </div>
  )
}
