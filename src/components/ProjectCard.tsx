import { type Project } from '@/src/data/projects'

const TAG_CLASS =
  'rounded border border-border px-[7px] py-[2px] font-mono text-[10px] tracking-[0.03em] text-text-subtle'

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="proj-card group flex flex-col overflow-hidden rounded-xl border border-border bg-surface transition-[border-color,transform,box-shadow] duration-200 hover:-translate-y-[3px] hover:border-border-hover hover:shadow-[0_10px_30px_rgba(0,0,0,0.35)]">
      <div className="relative h-[148px] w-full shrink-0 overflow-hidden border-b border-border bg-surface-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          className="proj-thumb-img block h-full w-full object-cover transition-transform duration-400 ease-out group-hover:scale-[1.04]"
        />
        <span className="absolute right-2.5 top-2.5 rounded border border-[rgba(0,212,255,0.25)] bg-[rgba(7,9,13,0.75)] px-[7px] py-[2px] font-mono text-[9px] uppercase tracking-[0.06em] text-cyan-brand backdrop-blur-md">
          {project.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <div className="text-sm font-semibold tracking-[-0.01em] text-text-main">
          {project.title}
        </div>
        <div className="flex-1 text-xs leading-[1.65] text-text-muted">{project.desc}</div>
        <div className="mt-2.5 flex items-center justify-between gap-2 border-t border-border pt-2.5">
          <div className="flex flex-1 flex-wrap gap-1">
            {project.tech.map(t => (
              <span key={t} className={TAG_CLASS}>{t}</span>
            ))}
          </div>
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="proj-link inline-flex shrink-0 items-center gap-1.5 font-mono text-[10px] text-cyan-brand no-underline opacity-0 transition-opacity duration-200 group-hover:opacity-100"
            onClick={e => e.stopPropagation()}
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
