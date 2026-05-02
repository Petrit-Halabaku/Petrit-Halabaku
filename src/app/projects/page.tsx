'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import ProjectCard from '@/src/components/ProjectCard'
import { PROJECTS, CATEGORIES } from '@/src/data/projects'

export default function ProjectsPage() {
  const [filter, setFilter] = useState<string>('All')

  useEffect(() => {
    const glow = document.querySelector<HTMLDivElement>('.cursor-glow-el')
    const h = (e: MouseEvent) => {
      if (glow) { glow.style.left = e.clientX + 'px'; glow.style.top = e.clientY + 'px' }
    }
    window.addEventListener('mousemove', h, { passive: true })
    return () => window.removeEventListener('mousemove', h)
  }, [])

  const filtered = filter === 'All' ? PROJECTS : PROJECTS.filter(p => p.category === filter)

  return (
    <main style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '0 24px 80px', position: 'relative', zIndex: 1 }}>

      {/* Page hero */}
      <div className="fade-up" style={{ padding: '56px 0 36px', borderBottom: '1px solid var(--border)', marginBottom: 40 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--cyan)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ color: 'var(--text-3)' }}>//</span> portfolio
            </div>
            <h1 style={{ fontSize: 28, fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.02em' }}>All Projects</h1>
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
          Projects built across e-commerce, health data, geo-mapping, and deep tech. Hover any card to see the live link.
        </p>
      </div>

      {/* Filter */}
      <div className="fade-up delay-1" style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 32 }}>
        {CATEGORIES.map(c => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              color: filter === c ? 'var(--cyan)' : 'var(--text-2)',
              background: filter === c ? 'var(--cyan-dim)' : 'var(--surface)',
              border: `1px solid ${filter === c ? 'var(--cyan)' : 'var(--border)'}`,
              borderRadius: 6,
              padding: '6px 14px',
              cursor: 'pointer',
              transition: 'border-color 0.2s, color 0.2s, background 0.2s',
            }}
          >
            {c}
          </button>
        ))}
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-3)', display: 'flex', alignItems: 'center', marginLeft: 8 }}>
          {filtered.length} project{filtered.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Card grid */}
      <div
        className="fade-up delay-2 cards-grid"
        style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}
      >
        {filtered.length === 0 ? (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '60px 0', fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-3)' }}>
            // no projects in this category
          </div>
        ) : (
          filtered.map(p => <ProjectCard key={p.id} project={p} />)
        )}
      </div>

      <style>{`
        @media (max-width: 768px) { .cards-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 480px) { .cards-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </main>
  )
}
