export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid var(--border)',
      padding: '24px 40px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    }}>
      <p style={{
        fontFamily: 'var(--font-mono)',
        fontSize: 9,
        letterSpacing: '0.15em',
        color: 'var(--fg-dim)',
      }}>
        © {new Date().getFullYear()} David McDougall. All rights reserved.
      </p>

      <div style={{ display: 'flex', gap: 24 }}>
        {[
          { label: 'Vimeo', href: 'https://vimeo.com/PLACEHOLDER' },
          { label: 'LinkedIn', href: 'https://linkedin.com/in/PLACEHOLDER' },
          { label: 'Instagram', href: 'https://instagram.com/PLACEHOLDER' },
        ].map(({ label, href }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 9,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--fg-dim)',
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--gold)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--fg-dim)')}
          >
            {label}
          </a>
        ))}
      </div>
    </footer>
  )
}
