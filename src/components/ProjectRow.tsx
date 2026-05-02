'use client'

import { useState, useCallback, useRef } from 'react'
import { type Project, fmt } from '@/src/data/projects'

const TAG_STYLE: React.CSSProperties = {
  fontFamily: 'var(--font-mono)',
  fontSize: 10,
  color: 'var(--text-3)',
  border: '1px solid var(--border)',
  borderRadius: 4,
  padding: '2px 7px',
  letterSpacing: '0.03em',
}

interface Props {
  project: Project
  previewRef: React.RefObject<HTMLDivElement | null>
  previewImgRef: React.RefObject<HTMLImageElement | null>
}

export default function ProjectRow({ project, previewRef, previewImgRef }: Props) {
  const [open, setOpen] = useState(false)

  const onEnter = useCallback(() => {
    if (previewImgRef.current) previewImgRef.current.src = project.image
    previewRef.current?.classList.add('visible')
  }, [project.image, previewRef, previewImgRef])

  const onLeave = useCallback(() => {
    previewRef.current?.classList.remove('visible')
  }, [previewRef])

  return (
    <div
      style={{
        borderTop: '1px solid var(--border)',
        transition: 'background 0.15s',
        cursor: 'pointer',
      }}
      onClick={() => setOpen(o => !o)}
      onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.018)')}
      onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '120px 1fr auto',
          gap: 20,
          alignItems: 'start',
          padding: '18px 10px',
        }}
        className="project-row-inner"
      >
        <div
          className="project-date"
          style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-3)', paddingTop: 3, whiteSpace: 'nowrap' }}
        >
          {fmt(project.date)}
        </div>
        <div onMouseEnter={onEnter} onMouseLeave={onLeave}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
            <span style={{ fontSize: 15, fontWeight: 600, color: 'var(--text)', letterSpacing: '-0.01em' }}>
              {project.title}
            </span>
          </div>
          <div style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.6 }}>{project.desc}</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginTop: 8 }}>
            {project.tech.map(t => (
              <span key={t} style={TAG_STYLE}>{t}</span>
            ))}
          </div>
        </div>
        <button
          style={{
            background: 'var(--surface-2)',
            border: '1px solid var(--border)',
            borderRadius: 6,
            width: 28,
            height: 28,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: 'var(--text-2)',
            transition: 'border-color 0.2s, color 0.2s, transform 0.2s',
            flexShrink: 0,
            transform: open ? 'rotate(180deg)' : 'none',
          }}
          onClick={e => { e.stopPropagation(); setOpen(o => !o) }}
          aria-label="expand"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
      </div>

      {open && (
        <div
          style={{
            margin: '0 10px 16px',
            padding: '14px 16px',
            background: 'var(--surface-2)',
            border: '1px solid var(--border)',
            borderRadius: 8,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 16,
            flexWrap: 'wrap',
          }}
          onClick={e => e.stopPropagation()}
        >
          <p style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.75, flex: 1, minWidth: 180 }}>
            {project.desc}
          </p>
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              background: 'var(--cyan-dim)',
              border: '1px solid rgba(0,212,255,0.22)',
              borderRadius: 6,
              padding: '8px 16px',
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              color: 'var(--cyan)',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
              flexShrink: 0,
              transition: 'background 0.2s, border-color 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(0,212,255,0.14)'
              e.currentTarget.style.borderColor = 'rgba(0,212,255,0.45)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'var(--cyan-dim)'
              e.currentTarget.style.borderColor = 'rgba(0,212,255,0.22)'
            }}
          >
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
            live site
          </a>
        </div>
      )}

      <style>{`
        @media (max-width: 640px) {
          .project-row-inner { grid-template-columns: 1fr auto !important; }
          .project-date { display: none !important; }
        }
      `}</style>
    </div>
  )
}
