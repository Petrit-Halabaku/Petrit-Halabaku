'use client'

import Link from 'next/link'
import { EXPERIENCES, SKILLS } from '@/src/data/experiences'

const chipStyle: React.CSSProperties = {
  fontFamily: 'var(--font-mono)',
  fontSize: 10,
  color: 'var(--cyan)',
  border: '1px solid rgba(0,212,255,0.18)',
  borderRadius: 4,
  padding: '2px 7px',
  background: 'rgba(0,212,255,0.04)',
}

export default function ExperiencePage() {
  return (
    <main style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '0 24px 80px', position: 'relative', zIndex: 1 }}>

      {/* Page hero */}
      <div className="fade-up" style={{ padding: '56px 0 36px', borderBottom: '1px solid var(--border)', marginBottom: 48 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--cyan)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ color: 'var(--text-3)' }}>//</span> career
            </div>
            <h1 style={{ fontSize: 28, fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.02em' }}>Experience &amp; Skills</h1>
          </div>
          <Link
            href="/"
            style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-3)', textDecoration: 'none', marginTop: 8, transition: 'color 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--cyan)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-3)')}
          >
            ← back home
          </Link>
        </div>
        <p style={{ fontSize: 14, color: 'var(--text-2)', lineHeight: 1.75, maxWidth: 500, marginTop: 10 }}>
          6+ years building products across the stack — from pixel-perfect frontends to scalable APIs. Currently leading engineering at DCoding Labs in Chicago.
        </p>
      </div>

      {/* Two-column grid */}
      <div className="fade-up delay-1 content-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: 48, alignItems: 'start' }}>

        {/* Timeline */}
        <div style={{ position: 'relative' }}>
          {/* Vertical line */}
          <div style={{ position: 'absolute', left: 8, top: 8, bottom: 0, width: 1, background: 'linear-gradient(to bottom, var(--cyan) 0%, var(--border) 60%, transparent 100%)' }} />

          {EXPERIENCES.map((exp, i) => (
            <div
              key={i}
              className="timeline-item"
              style={{ paddingLeft: 34, paddingBottom: i < EXPERIENCES.length - 1 ? 40 : 0, position: 'relative' }}
            >
              {/* Dot */}
              <div
                style={{
                  position: 'absolute',
                  left: 4,
                  top: 7,
                  width: 9,
                  height: 9,
                  borderRadius: '50%',
                  background: 'var(--bg)',
                  border: `2px solid ${i === 0 ? 'var(--cyan)' : 'var(--border-hover)'}`,
                  boxShadow: i === 0 ? '0 0 10px rgba(0,212,255,0.45)' : 'none',
                  transition: 'border-color 0.2s',
                }}
              />

              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', marginBottom: 8 }}>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--text)', letterSpacing: '-0.01em' }}>{exp.role}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--cyan)', marginTop: 2 }}>{exp.company}</div>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-3)' }}>{exp.period}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-3)', marginTop: 2 }}>{exp.location}</div>
                </div>
              </div>

              <ul style={{ listStyle: 'none', marginTop: 10, display: 'flex', flexDirection: 'column', gap: 6 }}>
                {exp.bullets.map((b, j) => (
                  <li key={j} style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.7, paddingLeft: 14, position: 'relative' }}>
                    <span style={{ position: 'absolute', left: 0, color: 'var(--text-3)' }}>›</span>
                    {b}
                  </li>
                ))}
              </ul>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginTop: 10 }}>
                {exp.tech.map(t => <span key={t} style={chipStyle}>{t}</span>)}
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar */}
        <div className="fade-up delay-2" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--cyan)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 2, display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ color: 'var(--text-3)' }}>//</span> capabilities
          </div>
          <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', letterSpacing: '-0.01em', marginBottom: 6 }}>Skills</div>

          {SKILLS.map(s => (
            <div
              key={s.name}
              style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '14px 16px', transition: 'border-color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--border-hover)')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
            >
              <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text)', marginBottom: 3 }}>{s.name}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-3)', lineHeight: 1.5 }}>{s.desc}</div>
            </div>
          ))}

          <div style={{ height: 1, background: 'var(--border)', margin: '8px 0' }} />

          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--cyan)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 2, display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ color: 'var(--text-3)' }}>//</span> education
          </div>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)', marginBottom: 2 }}>BSc Computer Science</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--cyan)', marginBottom: 4 }}>University of Prishtina</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-3)' }}>2014 – 2018</div>
          </div>

          <div style={{ height: 1, background: 'var(--border)', margin: '8px 0' }} />

          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: 20, textAlign: 'center', marginTop: 4 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', marginBottom: 6 }}>Open to opportunities</div>
            <div style={{ fontSize: 12, color: 'var(--text-2)', marginBottom: 16, lineHeight: 1.6 }}>Looking for full-time roles and freelance projects.</div>
            <a
              href="https://linkedin.com/in/petrit-halabaku"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                background: 'var(--cyan-dim)',
                border: '1px solid rgba(0,212,255,0.22)',
                borderRadius: 6,
                padding: '8px 18px',
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                color: 'var(--cyan)',
                textDecoration: 'none',
                transition: 'background 0.2s, border-color 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,212,255,0.14)'; e.currentTarget.style.borderColor = 'rgba(0,212,255,0.4)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'var(--cyan-dim)'; e.currentTarget.style.borderColor = 'rgba(0,212,255,0.22)' }}
            >
              Get in touch →
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) { .content-grid { grid-template-columns: 1fr !important; } }
        @media (max-width: 768px) { main > div[style*="padding: '56px"] { padding: '36px 0 28px' !important; } }
      `}</style>
    </main>
  )
}
