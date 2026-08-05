export default function Footer() {
  const links = [
    { label: 'IMDb',      href: 'https://www.imdb.com/name/nm2040426/' },
    { label: 'Vimeo',     href: 'https://vimeo.com/davidmcdougall' },
    { label: 'LinkedIn',  href: 'https://www.linkedin.com/in/david-mcdougall-7861287/' },
    { label: 'Instagram', href: 'https://www.instagram.com/mcdougall.studio/' },
    { label: 'X',         href: 'https://x.com/DavidMcDougall0' },
  ]

  return (
    <footer className="section-pad" style={{
      padding: '40px 40px 48px',
      maxWidth: 1200,
      margin: '0 auto',
    }}>
      {/* Top divider */}
      <div style={{
        height: '0.5px',
        background: 'linear-gradient(90deg, transparent, var(--border) 20%, var(--border) 80%, transparent)',
        marginBottom: 40,
      }} />

      <div className="footer-row" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        {/* Left: wordmark + copyright */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <span style={{
            fontFamily: 'var(--font-display)',
            fontSize: 13,
            letterSpacing: '0.22em',
            color: 'rgba(232,226,213,0.65)',
          }}>
            mcdougall.studio
          </span>
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 9,
            letterSpacing: '0.15em',
            color: 'rgba(232,226,213,0.6)',
          }}>
            © {new Date().getFullYear()} David McDougall. All rights reserved.
          </p>
        </div>

        {/* Right: social links */}
        <div className="footer-social" style={{ display: 'flex', gap: 28, alignItems: 'center' }}>
          {links.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="me noopener noreferrer"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 9,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'rgba(232,226,213,0.65)',
                transition: 'color 0.3s cubic-bezier(0.32,0.72,0,1)',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--gold)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(232,226,213,0.65)')}
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
