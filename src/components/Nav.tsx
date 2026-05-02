'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

const LINKS = [
  { href: '/', label: 'home' },
  { href: '/projects', label: 'projects' },
  { href: '/experience', label: 'experience' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <nav
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        background: 'rgba(7,9,13,0.88)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <div
        style={{
          maxWidth: 'var(--max-w)',
          margin: '0 auto',
          padding: '0 24px',
          height: 56,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'relative',
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <Image
            src="/uploads/logo-white.png"
            alt="PH"
            width={30}
            height={30}
            style={{ height: 30, width: 'auto', filter: 'brightness(0) invert(1)', opacity: 0.9 }}
          />
        </Link>

        {/* Desktop links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 28 }} className="nav-links-desktop">
          {LINKS.map(({ href, label }) => {
            const active = pathname === href
            return (
              <Link
                key={href}
                href={href}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 11,
                  color: active ? 'var(--text)' : 'var(--text-2)',
                  textDecoration: 'none',
                  letterSpacing: '0.06em',
                  textTransform: 'lowercase',
                  position: 'relative',
                  transition: 'color 0.2s',
                  whiteSpace: 'nowrap',
                }}
              >
                {label}
                {active && (
                  <span
                    style={{
                      position: 'absolute',
                      bottom: -4,
                      left: 0,
                      right: 0,
                      height: 1,
                      background: 'var(--cyan)',
                    }}
                  />
                )}
              </Link>
            )
          })}
          <a
            href="https://linkedin.com/in/petrit-halabaku"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: 'var(--cyan-dim)',
              border: '1px solid rgba(0,212,255,0.2)',
              borderRadius: 6,
              padding: '5px 12px',
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              color: 'var(--cyan)',
              textDecoration: 'none',
              transition: 'background 0.2s, border-color 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(0,212,255,0.14)'
              e.currentTarget.style.borderColor = 'rgba(0,212,255,0.4)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'var(--cyan-dim)'
              e.currentTarget.style.borderColor = 'rgba(0,212,255,0.2)'
            }}
          >
            hire me →
          </a>
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setOpen(o => !o)}
          aria-label="menu"
          className="nav-burger-btn"
          style={{
            display: 'none',
            flexDirection: 'column',
            gap: 5,
            cursor: 'pointer',
            background: 'none',
            border: 'none',
            padding: 6,
          }}
        >
          {[0, 1, 2].map(i => (
            <span
              key={i}
              style={{
                display: 'block',
                width: 22,
                height: 1.5,
                background: 'var(--text-2)',
                borderRadius: 2,
                transition: 'all 0.2s',
                transform:
                  open && i === 0
                    ? 'translateY(6.5px) rotate(45deg)'
                    : open && i === 2
                    ? 'translateY(-6.5px) rotate(-45deg)'
                    : 'none',
                opacity: open && i === 1 ? 0 : 1,
              }}
            />
          ))}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            position: 'absolute',
            top: 56,
            left: 0,
            right: 0,
            background: 'rgba(13,17,23,0.98)',
            backdropFilter: 'blur(24px)',
            borderBottom: '1px solid var(--border)',
            zIndex: 99,
          }}
        >
          {LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              style={{
                padding: '14px 24px',
                fontFamily: 'var(--font-mono)',
                fontSize: 12,
                color: pathname === href ? 'var(--cyan)' : 'var(--text-2)',
                textDecoration: 'none',
                borderBottom: '1px solid var(--border)',
                transition: 'color 0.2s, background 0.2s',
                letterSpacing: '0.06em',
                background: pathname === href ? 'rgba(0,212,255,0.04)' : 'transparent',
              }}
            >
              {label}
            </Link>
          ))}
          <a
            href="https://linkedin.com/in/petrit-halabaku"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            style={{
              padding: '14px 24px',
              fontFamily: 'var(--font-mono)',
              fontSize: 12,
              color: 'var(--text-2)',
              textDecoration: 'none',
              transition: 'color 0.2s, background 0.2s',
              letterSpacing: '0.06em',
            }}
          >
            hire me
          </a>
        </div>
      )}

      <style>{`
        @media (max-width: 640px) {
          .nav-links-desktop { display: none !important; }
          .nav-burger-btn { display: flex !important; }
        }
      `}</style>
    </nav>
  )
}
