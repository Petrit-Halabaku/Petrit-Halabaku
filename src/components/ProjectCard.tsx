import { type Project } from '@/src/data/projects'

const EASE = 'ease-[cubic-bezier(0.22,1,0.36,1)]'

const TAG_CLASS =
  `rounded border border-border px-[7px] py-[2px] font-mono text-[10px] tracking-[0.03em] text-text-subtle transition-[color,border-color,background-color] duration-500 ${EASE} group-hover:border-border-hover group-hover:text-text-muted`

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div
      className={`proj-card group relative flex flex-col overflow-hidden rounded-xl border border-border bg-surface transition-[transform,border-color,box-shadow] duration-500 ${EASE} will-change-transform  hover:border-border-hover hover:shadow-[0_18px_40px_-12px_rgba(0,0,0,0.55),0_0_0_1px_rgba(0,212,255,0.08)]`}
    >
      <span
        aria-hidden
        className={`pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-700 ${EASE} group-hover:opacity-100`}
        style={{
          background:
            'radial-gradient(120% 80% at 50% 0%, rgba(0,212,255,0.10) 0%, rgba(0,212,255,0) 55%)',
        }}
      />

      <div className="relative h-[148px] w-full shrink-0 overflow-hidden border-b border-border bg-surface-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          className={`proj-thumb-img block h-full w-full object-cover transition-transform duration-900 ${EASE} group-hover:scale-[1.06]`}
        />
        <span
          aria-hidden
          className={`pointer-events-none absolute inset-0 bg-linear-to-t from-[rgba(7,9,13,0.55)] via-transparent to-transparent opacity-60 transition-opacity duration-500 ${EASE} group-hover:opacity-90`}
        />
        <span
          aria-hidden
          className={`pointer-events-none absolute -inset-x-1/2 -top-1/2 h-[200%] w-[200%] -translate-x-full rotate-12 bg-linear-to-r from-transparent via-[rgba(0,212,255,0.10)] to-transparent transition-transform duration-1100 ${EASE} group-hover:translate-x-0`}
        />
        <span
          className={`absolute right-2.5 top-2.5 rounded border border-[rgba(0,212,255,0.25)] bg-[rgba(7,9,13,0.75)] px-[7px] py-[2px] font-mono text-[9px] uppercase tracking-[0.06em] text-cyan-brand backdrop-blur-md transition-[transform,border-color,background-color] duration-500 ${EASE} group-hover:-translate-y-0.5 group-hover:border-[rgba(0,212,255,0.55)] group-hover:bg-[rgba(7,9,13,0.9)]`}
        >
          {project.category}
        </span>
      </div>

      <div className="relative flex flex-1 flex-col gap-1.5 p-4">
        <div
          className={`text-sm font-semibold tracking-[-0.01em] text-text-main transition-colors duration-500 ${EASE} group-hover:text-cyan-brand`}
        >
          {project.title}
        </div>
        <div className="flex-1 text-xs leading-[1.65] text-text-muted">{project.desc}</div>
        <div className="mt-2.5 flex items-center justify-between gap-2 border-t border-border pt-2.5">
          <div className="flex flex-1 flex-wrap gap-1">
            {project.tech.map(t => (
              <span key={t} className={TAG_CLASS}>
                {t}
              </span>
            ))}
          </div>
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className={`proj-link inline-flex shrink-0 translate-x-1 items-center gap-1.5 font-mono text-[10px] text-cyan-brand no-underline opacity-0 transition-[opacity,transform] duration-500 ${EASE} group-hover:translate-x-0 group-hover:opacity-100`}
            onClick={e => e.stopPropagation()}
          >
            <svg
              width="11"
              height="11"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className={`transition-transform duration-500 ${EASE} group-hover:translate-x-0.5 group-hover:-translate-y-0.5`}
            >
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
