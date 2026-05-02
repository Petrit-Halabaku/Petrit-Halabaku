'use client'

import { useRef, useEffect, useState, useCallback } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import Image from 'next/image'
import ContribGraph from '@/src/components/ContribGraph'
import ProjectRow from '@/src/components/ProjectRow'
import { PROJECTS } from '@/src/data/projects'

const LeafletMap = dynamic(() => import('@/src/components/LeafletMap'), { ssr: false })


export default function HomePage() {
  const bentoRef = useRef<HTMLDivElement>(null)
  const [bentoH, setBentoH] = useState(0)
  const previewRef = useRef<HTMLDivElement>(null)
  const previewImgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const measure = () => {
      if (bentoRef.current) setBentoH(bentoRef.current.offsetHeight)
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  useEffect(() => {
    const preview = previewRef.current
    if (!preview) return
    const handler = (e: MouseEvent) => {
      if (preview.classList.contains('visible')) {
        preview.style.left = e.clientX + 22 + 'px'
        preview.style.top = e.clientY + 22 + 'px'
      }
    }
    window.addEventListener('mousemove', handler, { passive: true })
    return () => window.removeEventListener('mousemove', handler)
  }, [])

  return (
    <>
      {/* Mouse-follow project preview */}
      <div
        ref={previewRef}
        style={{
          position: 'fixed',
          zIndex: 9999,
          pointerEvents: 'none',
          borderRadius: 8,
          overflow: 'hidden',
          border: '1px solid var(--border-hover)',
          boxShadow: '0 8px 36px rgba(0,0,0,0.6)',
          width: 260,
          height: 148,
          display: 'none',
        }}
        className="mouse-preview"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={previewImgRef}
          src={undefined}
          alt=""
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      </div>

      <main style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '0 24px 80px', position: 'relative', zIndex: 1 }}>

        {/* HERO */}
        <section className="fade-up" style={{ padding: '64px 0 0', display: 'grid', gridTemplateColumns: '1fr 200px', gap: 40, alignItems: 'start' }}>
          <div>
            <div
              className="fade-up"
              style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--cyan)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 6 }}
            >
              <span style={{ color: 'var(--text-3)' }}>//</span> full stack engineer
            </div>
            <h1
              className="fade-up delay-1"
              style={{ fontSize: 'clamp(34px,5.5vw,52px)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.08, color: 'var(--text)', marginBottom: 6 }}
            >
              Petrit<br />Halabaku
            </h1>
            <div
              className="fade-up delay-2"
              style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--cyan)', marginBottom: 18, letterSpacing: '0.04em' }}
            >
              React · Node.js · TypeScript<span style={{ animation: 'blink 1.1s step-end infinite' }}>_</span>
            </div>
            <p
              className="fade-up delay-2"
              style={{ fontSize: 14, lineHeight: 1.85, color: 'var(--text-2)', maxWidth: 500, marginBottom: 28 }}
            >
              Senior Frontend Engineer with 7+ years of experience building secure, scalable systems across e-commerce, health data, and deep tech. I ship products that matter with teams that care.
            </p>
            <Link
              href="/experience"
              className="fade-up delay-3 available-badge"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                border: '1px solid rgba(0,229,123,0.3)',
                borderRadius: 100,
                padding: '6px 14px',
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                color: 'var(--green)',
                textDecoration: 'none',
                background: 'var(--green-dim)',
                transition: 'box-shadow 0.3s, border-color 0.3s',
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--green)', animation: 'pulse-dot 2s ease-in-out infinite', flexShrink: 0, display: 'block' }} />
              Available for work
            </Link>
          </div>
          <div
            className="fade-up delay-2 profile-wrap-desktop"
            style={{ position: 'relative', width: 180 }}
          >
            <div
              style={{
                width: 170,
                height: 200,
                borderRadius: 14,
                overflow: 'hidden',
                border: '1px solid var(--border)',
                background: 'var(--surface)',
              }}
            >
              <Image
                src="/uploads/piti.png"
                alt="Petrit Halabaku"
                width={170}
                height={200}
                priority
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }}
              />
            </div>
            {/* Corner accents */}
            {[
              { style: { top: -3, left: -3, borderWidth: '2px 0 0 2px' } },
              { style: { top: -3, right: -3, borderWidth: '2px 2px 0 0' } },
              { style: { bottom: -3, left: -3, borderWidth: '0 0 2px 2px' } },
              { style: { bottom: -3, right: -3, borderWidth: '0 2px 2px 0' } },
            ].map((c, i) => (
              <div
                key={i}
                style={{ position: 'absolute', width: 11, height: 11, borderColor: 'var(--cyan)', borderStyle: 'solid', ...c.style }}
              />
            ))}
          </div>
        </section>

        {/* BENTO */}
        <div className="fade-up delay-3 bento-wrap-outer" style={{ position: 'relative', marginTop: 40 }}>
          <div
            ref={bentoRef}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}
            className="bento-grid"
          >
            {/* LinkedIn */}
            <div
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 12,
                padding: 20,
                gridColumn: 'span 1',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: 130,
                transition: 'border-color 0.25s',
              }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--border-hover)')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
            >
              <div>
                <div style={{ width: 34, height: 34, borderRadius: 8, background: 'var(--surface-2)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
                  <svg viewBox="0 0 24 24" fill="#0a78c8" width="18" height="18">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect x="2" y="9" width="4" height="12" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-2)', marginBottom: 10 }}>@petrit-halabaku</div>
              </div>
              <a
                href="https://linkedin.com/in/petrit-halabaku"
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 6, padding: '6px 12px', fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text)', textDecoration: 'none', transition: 'border-color 0.2s, color 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--cyan)'; e.currentTarget.style.color = 'var(--cyan)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text)' }}
              >
                Connect →
              </a>
            </div>

            {/* GitHub graph */}
            <div
              style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: 20, gridColumn: 'span 3', display: 'flex', flexDirection: 'column', gap: 10, transition: 'border-color 0.25s' }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--border-hover)')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--cyan)', letterSpacing: '0.14em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ color: 'var(--text-3)' }}>//</span> github contributions
                </div>
                <a
                  href="https://github.com/Petrit-Halabaku"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-3)', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--cyan)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-3)')}
                >
                  @Petrit-Halabaku ↗
                </a>
              </div>
              <ContribGraph />
            </div>

            {/* Leaflet map */}
            <div
              style={{ gridColumn: 'span 3', overflow: 'hidden', padding: 0, minHeight: 180, borderRadius: 12, border: '1px solid var(--border)', transition: 'border-color 0.2s', position: 'relative' }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--border-hover)')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
            >
              <LeafletMap />
            </div>

            {/* Location */}
            <div
              style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: 20, gridColumn: 'span 1', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 8, transition: 'border-color 0.25s' }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--border-hover)')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
            >
              <div style={{ fontSize: 26, lineHeight: 1 }}>🇽🇰</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>Prishtina</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-2)' }}>Kosovo · Remote OK</div>
            </div>

            {/* Stats */}
            <div
              style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, gridColumn: 'span 4', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', transition: 'border-color 0.25s' }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--border-hover)')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
            >
              {[
                { num: '7', em: '+', desc: 'years experience' },
                { num: '6', em: '+', desc: 'shipped projects' },
                { num: '4', em: '', desc: 'companies' },
              ].map(({ num, em, desc }, i, arr) => (
                <div key={desc} style={{ padding: '16px 20px', borderRight: i < arr.length - 1 ? '1px solid var(--border)' : 'none' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 26, fontWeight: 600, color: 'var(--text)', lineHeight: 1 }}>
                    {num}<em style={{ color: 'var(--cyan)', fontStyle: 'normal' }}>{em}</em>
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--text-2)', marginTop: 4 }}>{desc}</div>
                </div>
              ))}
            </div>

            {/* GitHub */}
            <div
              style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: 20, gridColumn: 'span 1', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: 130, transition: 'border-color 0.25s' }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--border-hover)')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
            >
              <div>
                <div style={{ width: 34, height: 34, borderRadius: 8, background: 'var(--surface-2)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" width="18" height="18">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                  </svg>
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-2)', marginBottom: 10 }}>@Petrit-Halabaku</div>
              </div>
              <a
                href="https://github.com/Petrit-Halabaku"
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 6, padding: '6px 12px', fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text)', textDecoration: 'none', transition: 'border-color 0.2s, color 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--cyan)'; e.currentTarget.style.color = 'var(--cyan)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text)' }}
              >
                Follow →
              </a>
            </div>
          </div>
        </div>

        {/* PROJECTS */}
        <section className="fade-up delay-4" style={{ marginTop: 56 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--cyan)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ color: 'var(--text-3)' }}>//</span> selected work
              </div>
              <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.02em' }}>Projects</h2>
            </div>
            <Link
              href="/projects"
              style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-2)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 5, transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--cyan)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-2)')}
            >
              view all <span>→</span>
            </Link>
          </div>
          <div style={{ borderBottom: '1px solid var(--border)' }}>
            {PROJECTS.map(p => (
              <ProjectRow key={p.id} project={p} previewRef={previewRef} previewImgRef={previewImgRef} />
            ))}
          </div>
        </section>

        {/* CTA */}
        <div
          className="fade-up delay-4"
          style={{
            marginTop: 56,
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 14,
            padding: '32px 28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 24,
            flexWrap: 'wrap',
          }}
        >
          <div>
            <div style={{ fontSize: 19, fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.02em', marginBottom: 4 }}>
              Let&apos;s build something great.
            </div>
            <div style={{ fontSize: 13, color: 'var(--text-2)' }}>Open to full-time roles and freelance projects.</div>
          </div>
          <a
            href="https://linkedin.com/in/petrit-halabaku"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: 'var(--cyan-dim)',
              border: '1px solid rgba(0,212,255,0.25)',
              borderRadius: 8,
              padding: '10px 22px',
              fontFamily: 'var(--font-mono)',
              fontSize: 12,
              color: 'var(--cyan)',
              textDecoration: 'none',
              transition: 'background 0.2s, border-color 0.2s, box-shadow 0.2s',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(0,212,255,0.14)'
              e.currentTarget.style.borderColor = 'rgba(0,212,255,0.45)'
              e.currentTarget.style.boxShadow = '0 0 18px rgba(0,212,255,0.12)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'var(--cyan-dim)'
              e.currentTarget.style.borderColor = 'rgba(0,212,255,0.25)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            Get in touch →
          </a>
        </div>
      </main>

      <style>{`
        .mouse-preview.visible { display: block !important; }
        @media (max-width: 640px) {
          section[style*="grid-template-columns: 1fr 200px"] {
            grid-template-columns: 1fr !important;
            padding-top: 40px !important;
          }
          .profile-wrap-desktop { display: none !important; }
          .bento-brace-desktop { display: none !important; }
          .bento-grid { grid-template-columns: 1fr 1fr !important; }
          .bento-grid > *[style*="span 3"],
          .bento-grid > *[style*="span 4"] { grid-column: span 2 !important; }
          .bento-grid > *[style*="span 1"] { grid-column: span 1 !important; }
        }
      `}</style>
    </>
  )
}
