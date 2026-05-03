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
    <main className="relative z-[1] mx-auto max-w-max-page px-6 pb-20">

      {/* Page hero */}
      <div className="animate-fade-up mb-10 border-b border-border pb-9 pt-14">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="mb-1.5 flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-cyan-brand">
              <span className="text-text-subtle">//</span> portfolio
            </div>
            <h1 className="text-[28px] font-bold tracking-[-0.02em] text-text-main">All Projects</h1>
          </div>
          <Link
            href="/"
            className="mt-2 font-mono text-[11px] text-text-subtle no-underline transition-colors hover:text-cyan-brand"
          >
            ← back home
          </Link>
        </div>
        <p className="mt-2.5 max-w-[500px] text-sm leading-[1.75] text-text-muted">
          Projects built across e-commerce, health data, geo-mapping, and deep tech. Hover any card to see the live link.
        </p>
      </div>

      {/* Filter */}
      <div className="animate-fade-up [animation-delay:0.1s] mb-8 flex flex-wrap gap-1.5">
        {CATEGORIES.map(c => {
          const active = filter === c
          return (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`cursor-pointer rounded-md border px-3.5 py-1.5 font-mono text-[11px] transition-[border-color,color,background] duration-200 ${
                active
                  ? 'border-cyan-brand bg-cyan-dim text-cyan-brand'
                  : 'border-border bg-surface text-text-muted'
              }`}
            >
              {c}
            </button>
          )
        })}
        <span className="ml-2 flex items-center font-mono text-[11px] text-text-subtle">
          {filtered.length} project{filtered.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Card grid */}
      <div className="animate-fade-up [animation-delay:0.2s] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ">
        {filtered.length === 0 ? (
          <div className="col-span-full py-[60px] text-center font-mono text-xs text-text-subtle">
            // no projects in this category
          </div>
        ) : (
          filtered.map(p => <ProjectCard key={p.id} project={p} />)
        )}
      </div>
    </main>
  )
}
