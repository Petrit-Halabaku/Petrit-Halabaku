'use client'

export default function Footer() {
  return (
    <footer
      style={{
        position: 'relative',
        zIndex: 1,
        maxWidth: 'var(--max-w)',
        margin: '0 auto',
        padding: '28px 24px',
        borderTop: '1px solid var(--border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 12,
        width: '100%',
      }}
    >
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-3)' }}>
        © 2025 Petrit Halabaku
      </span>
      <div style={{ display: 'flex', gap: 20 }}>
        {[
          { label: 'LinkedIn', href: 'https://linkedin.com/in/petrit-halabaku' },
          { label: 'GitHub', href: 'https://github.com/Petrit-Halabaku' },
        ].map(({ label, href }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-3)', textDecoration: 'none', transition: 'color 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--cyan)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-3)')}
          >
            {label}
          </a>
        ))}
      </div>
    </footer>
  )
}
