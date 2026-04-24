export default function Footer() {
  const links = [
    { label: 'Vimeo', href: 'https://vimeo.com/PLACEHOLDER' },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/PLACEHOLDER' },
    { label: 'Instagram', href: 'https://instagram.com/PLACEHOLDER' },
  ]

  return (
    <footer style={{
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

      <div style={{
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
            color: 'rgba(232,226,213,0.2)',
          }}>
            DM STUDIO
          </span>
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 9,
            letterSpacing: '0.15em',
            color: 'rgba(232,226,213,0.2)',
          }}>
            © {new Date().getFullYear()} David McDougall. All rights reserved.
          </p>
        </div>

        {/* Right: social links */}
        <div style={{ display: 'flex', gap: 28, alignItems: 'center' }}>
          {links.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 9,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'rgba(232,226,213,0.25)',
                transition: 'color 0.3s cubic-bezier(0.32,0.72,0,1)',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--gold)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(232,226,213,0.25)')}
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
