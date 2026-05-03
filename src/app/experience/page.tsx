'use client'

import Link from 'next/link'
import { EDUCATION, formatEducationPeriod } from '@/src/data/education'
import { EXPERIENCES, SKILLS } from '@/src/data/experiences'

const CHIP_CLASS =
  'rounded border border-[rgba(0,212,255,0.18)] bg-[rgba(0,212,255,0.04)] px-[7px] py-[2px] font-mono text-[10px] text-cyan-brand'

export default function ExperiencePage() {
  return (
    <main className="relative z-[1] mx-auto max-w-max-page px-6 pb-20">

      {/* Page hero */}
      <div className="animate-fade-up mb-12 border-b border-border pb-9 pt-14 max-md:pb-7 max-md:pt-9">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="mb-1.5 flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-cyan-brand">
              <span className="text-text-subtle">//</span> career
            </div>
            <h1 className="text-[28px] font-bold tracking-[-0.02em] text-text-main">Experience &amp; Skills</h1>
          </div>
          <Link
            href="/"
            className="mt-2 font-mono text-[11px] text-text-subtle no-underline transition-colors hover:text-cyan-brand"
          >
            ← back home
          </Link>
        </div>
        <p className="mt-2.5 max-w-[500px] text-sm leading-[1.75] text-text-muted">
          7+ years building products across the stack — from pixel-perfect frontends to scalable APIs. Currently leading engineering at DCoding Labs in Chicago.
        </p>
      </div>

      {/* Two-column grid */}
      <div className="animate-fade-up [animation-delay:0.1s] grid grid-cols-[1fr_280px] items-start gap-12 max-md:grid-cols-1">

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute bottom-0 left-2 top-2 w-px bg-[linear-gradient(to_bottom,var(--color-cyan-brand)_0%,var(--color-border)_60%,transparent_100%)]" />

          {EXPERIENCES.map((exp, i) => (
            <div
              key={i}
              className={`timeline-item relative pl-[34px] ${i < EXPERIENCES.length - 1 ? 'pb-10' : ''}`}
            >
              {/* Dot */}
              <div
                className={`absolute left-1 top-[7px] h-[9px] w-[9px] rounded-full border-2 bg-bg transition-colors duration-200 ${
                  i === 0
                    ? 'border-cyan-brand shadow-[0_0_10px_rgba(0,212,255,0.45)]'
                    : 'border-border-hover'
                }`}
              />

              <div className="mb-2 flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="text-[15px] font-semibold tracking-[-0.01em] text-text-main">{exp.role}</div>
                  <div className="mt-0.5 font-mono text-[11px] text-cyan-brand">{exp.company}</div>
                </div>
                <div className="shrink-0 text-right">
                  <div className="font-mono text-[10px] text-text-subtle">{exp.period}</div>
                  <div className="mt-0.5 font-mono text-[10px] text-text-subtle">{exp.location}</div>
                </div>
              </div>

              <ul className="mt-2.5 flex list-none flex-col gap-1.5">
                {exp.bullets.map((b, j) => (
                  <li key={j} className="relative pl-3.5 text-[13px] leading-[1.7] text-text-muted">
                    <span className="absolute left-0 text-text-subtle">›</span>
                    {b}
                  </li>
                ))}
              </ul>

              <div className="mt-2.5 flex flex-wrap gap-[5px]">
                {exp.tech.map(t => <span key={t} className={CHIP_CLASS}>{t}</span>)}
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar */}
        <div className="animate-fade-up [animation-delay:0.2s] flex flex-col gap-2.5">
          <div className="mb-0.5 flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-cyan-brand">
            <span className="text-text-subtle">//</span> capabilities
          </div>
          <div className="mb-1.5 text-sm font-semibold tracking-[-0.01em] text-text-main">Skills</div>

          {SKILLS.map(s => (
            <div
              key={s.name}
              className="rounded-[10px] border border-border bg-surface px-4 py-3.5 transition-colors duration-200 hover:border-border-hover"
            >
              <div className="mb-[3px] text-xs font-semibold text-text-main">{s.name}</div>
              <div className="font-mono text-[10px] leading-[1.5] text-text-subtle">{s.desc}</div>
            </div>
          ))}

          <div className="my-2 h-px bg-border" />

          <div className="mb-0.5 flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-cyan-brand">
            <span className="text-text-subtle">//</span> education
          </div>
          {EDUCATION.map((edu, i) => (
            <div
              key={`${edu.institution}-${edu.periodFrom}-${edu.periodTo}`}
              className={`rounded-[10px] border border-border bg-surface p-4 ${i < EDUCATION.length - 1 ? 'mb-2.5' : ''}`}
            >
              <div className="mb-0.5 text-[13px] font-semibold text-text-main">{edu.degree}</div>
              <div className="mb-1 font-mono text-[10px] text-cyan-brand">{edu.institution}</div>
              <div className="font-mono text-[10px] text-text-subtle">
                {[formatEducationPeriod(edu), edu.location].filter(Boolean).join(' · ')}
              </div>
              {edu.details?.length ? (
                <ul className="mt-2.5 flex list-none flex-col gap-1">
                  {edu.details.map((d, j) => (
                    <li key={j} className="relative pl-3 text-xs leading-[1.6] text-text-muted">
                      <span className="absolute left-0 text-text-subtle">›</span>
                      {d}
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          ))}

          <div className="my-2 h-px bg-border" />

          <div className="mt-1 rounded-xl border border-border bg-surface p-5 text-center">
            <div className="mb-1.5 text-sm font-semibold text-text-main">Open to opportunities</div>
            <div className="mb-4 text-xs leading-[1.6] text-text-muted">Looking for full-time roles and freelance projects.</div>
            <a
              href="https://linkedin.com/in/petrit-halabaku"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-md border border-[rgba(0,212,255,0.22)] bg-cyan-dim px-[18px] py-2 font-mono text-[11px] text-cyan-brand no-underline transition-[background,border-color] duration-200 hover:border-[rgba(0,212,255,0.4)] hover:bg-[rgba(0,212,255,0.14)]"
            >
              Get in touch →
            </a>
          </div>
        </div>
      </div>
    </main>
  )
}
