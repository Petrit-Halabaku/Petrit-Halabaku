'use client'

import { useState, useCallback } from 'react'
import { type Project, fmt } from '@/src/data/projects'

const TAG_CLASS =
  'rounded border border-border px-[7px] py-[2px] font-mono text-[10px] tracking-[0.03em] text-text-subtle'

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
      className="cursor-pointer border-t border-border bg-transparent transition-colors duration-150 hover:bg-[rgba(255,255,255,0.018)]"
      onClick={() => setOpen(o => !o)}
    >
      <div className="grid grid-cols-[120px_1fr_auto] items-start gap-5 px-2.5 py-[18px] max-sm:grid-cols-[1fr_auto]">
        <div className="whitespace-nowrap pt-[3px] font-mono text-[11px] text-text-subtle max-sm:hidden">
          {fmt(project.date)}
        </div>
        <div onMouseEnter={onEnter} onMouseLeave={onLeave}>
          <div className="mb-[3px] flex items-center gap-2">
            <span className="text-[15px] font-semibold tracking-[-0.01em] text-text-main">
              {project.title}
            </span>
          </div>
          <div className="text-[13px] leading-[1.6] text-text-muted">{project.desc}</div>
          <div className="mt-2 flex flex-wrap gap-[5px]">
            {project.tech.map(t => (
              <span key={t} className={TAG_CLASS}>{t}</span>
            ))}
          </div>
        </div>
        <button
          className="flex h-7 w-7 shrink-0 cursor-pointer items-center justify-center rounded-md border border-border bg-surface-2 text-text-muted transition-[border-color,color,transform] duration-200"
          style={{ transform: open ? 'rotate(180deg)' : 'none' }}
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
          className="mx-2.5 mb-4 flex flex-wrap items-center justify-between gap-4 rounded-lg border border-border bg-surface-2 px-4 py-3.5"
          onClick={e => e.stopPropagation()}
        >
          <p className="min-w-[180px] flex-1 text-[13px] leading-[1.75] text-text-muted">
            {project.desc}
          </p>
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-md border border-[rgba(0,212,255,0.22)] bg-cyan-dim px-4 py-2 font-mono text-[11px] text-cyan-brand no-underline transition-[background,border-color] duration-200 hover:border-[rgba(0,212,255,0.45)] hover:bg-[rgba(0,212,255,0.14)]"
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
    </div>
  )
}
