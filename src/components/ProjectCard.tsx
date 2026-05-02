import { type Project } from '@/src/data/projects'

const TAG_STYLE: React.CSSProperties = {
  fontFamily: 'var(--font-mono)',
  fontSize: 10,
  color: 'var(--text-3)',
  border: '1px solid var(--border)',
  borderRadius: 4,
  padding: '2px 7px',
  letterSpacing: '0.03em',
}

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div
      className="proj-card"
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 12,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        transition: 'border-color 0.2s, transform 0.22s, box-shadow 0.22s',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget
        el.style.borderColor = 'var(--border-hover)'
        el.style.transform = 'translateY(-3px)'
        el.style.boxShadow = '0 10px 30px rgba(0,0,0,0.35)'
        const img = el.querySelector<HTMLImageElement>('.proj-thumb-img')
        if (img) img.style.transform = 'scale(1.04)'
        const link = el.querySelector<HTMLAnchorElement>('.proj-link')
        if (link) link.style.opacity = '1'
      }}
      onMouseLeave={e => {
        const el = e.currentTarget
        el.style.borderColor = 'var(--border)'
        el.style.transform = 'none'
        el.style.boxShadow = 'none'
        const img = el.querySelector<HTMLImageElement>('.proj-thumb-img')
        if (img) img.style.transform = 'none'
        const link = el.querySelector<HTMLAnchorElement>('.proj-link')
        if (link) link.style.opacity = '0'
      }}
    >
      <div
        style={{
          width: '100%',
          height: 148,
          overflow: 'hidden',
          background: 'var(--surface-2)',
          flexShrink: 0,
          borderBottom: '1px solid var(--border)',
          position: 'relative',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          className="proj-thumb-img"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.4s ease' }}
        />
        <span
          style={{
            position: 'absolute',
            top: 10,
            right: 10,
            fontFamily: 'var(--font-mono)',
            fontSize: 9,
            color: 'var(--cyan)',
            background: 'rgba(7,9,13,0.75)',
            border: '1px solid rgba(0,212,255,0.25)',
            borderRadius: 4,
            padding: '2px 7px',
            backdropFilter: 'blur(6px)',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
          }}
        >
          {project.category}
        </span>
      </div>
      <div style={{ padding: 16, flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', letterSpacing: '-0.01em' }}>
          {project.title}
        </div>
        <div style={{ fontSize: 12, color: 'var(--text-2)', lineHeight: 1.65, flex: 1 }}>{project.desc}</div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 8,
            marginTop: 10,
            paddingTop: 10,
            borderTop: '1px solid var(--border)',
          }}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, flex: 1 }}>
            {project.tech.map(t => (
              <span key={t} style={TAG_STYLE}>{t}</span>
            ))}
          </div>
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="proj-link"
            onClick={e => e.stopPropagation()}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 5,
              fontFamily: 'var(--font-mono)',
              fontSize: 10,
              color: 'var(--cyan)',
              textDecoration: 'none',
              flexShrink: 0,
              opacity: 0,
              transition: 'opacity 0.2s',
            }}
          >
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
            visit
          </a>
        </div>
      </div>
    </div>
  )
}
