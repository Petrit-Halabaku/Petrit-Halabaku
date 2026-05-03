'use client'

import { useRef, useEffect, useCallback } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import Image from 'next/image'
import ProjectRow from '@/src/components/ProjectRow'
import { PROJECTS } from '@/src/data/projects'
import { getSiteFullName, splitHeroName } from '@/src/lib/site'

const MapboxGlobe = dynamic(() => import('@/src/components/MapboxGlobe'), { ssr: false })
const ContribGraph = dynamic(() => import('@/src/components/ContribGraph'), { ssr: false })


export default function HomePage() {
  const siteFullName = getSiteFullName()
  const heroName = splitHeroName(siteFullName)
  const bentoRef = useRef<HTMLDivElement>(null)
  const previewRef = useRef<HTMLDivElement>(null)
  const previewImgRef = useRef<HTMLImageElement>(null)

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
        className="mouse-preview pointer-events-none fixed z-[9999] hidden h-[148px] w-[260px] overflow-hidden rounded-lg border border-border-hover shadow-[0_8px_36px_rgba(0,0,0,0.6)]"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={previewImgRef}
          src={undefined}
          alt=""
          className="block h-full w-full object-cover"
        />
      </div>

      <main className="relative z-[1] mx-auto max-w-max-page px-6 pb-20">

        {/* HERO */}
        <section className="animate-fade-up grid grid-cols-[1fr_200px] items-start gap-10 pt-16 max-sm:grid-cols-1 max-sm:pt-10">
          <div>
            <div className="animate-fade-up mb-1.5 flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-cyan-brand">
              <span className="text-text-subtle">//</span> full stack engineer
            </div>
            <h1 className="animate-fade-up [animation-delay:0.1s] mb-1.5 text-[clamp(34px,5.5vw,52px)] font-bold leading-[1.08] tracking-[-0.03em] text-text-main">
              {heroName.line1 ? (
                <>
                  {heroName.line1}
                  <br />
                  {heroName.line2}
                </>
              ) : (
                heroName.line2
              )}
            </h1>
            <div className="animate-fade-up [animation-delay:0.2s] mb-[18px] font-mono text-xs tracking-[0.04em] text-cyan-brand">
              React · Node.js · TypeScript<span className="animate-blink">_</span>
            </div>
            <p className="animate-fade-up [animation-delay:0.2s] mb-7 max-w-[500px] text-sm leading-[1.85] text-text-muted">
              Senior Frontend Engineer with 7+ years of experience building secure, scalable systems across e-commerce, health data, and deep tech. I ship products that matter with teams that care.
            </p>
            <Link
              href="/experience"
              className="animate-fade-up [animation-delay:0.3s] available-badge inline-flex items-center gap-2 rounded-full border border-[rgba(0,229,123,0.3)] bg-green-dim px-3.5 py-1.5 font-mono text-[11px] text-green-brand no-underline transition-[box-shadow,border-color] duration-300"
            >
              <span className="animate-pulse-dot block h-1.5 w-1.5 shrink-0 rounded-full bg-green-brand" />
              Available for work
            </Link>
          </div>
          <div className="animate-fade-up [animation-delay:0.2s] profile-wrap-desktop relative w-[180px] max-sm:hidden">
            <div className="h-[200px] w-[170px] overflow-hidden rounded-[14px] border border-border bg-surface">
              <Image
                src="/uploads/piti.png"
                alt={siteFullName || 'Profile photo'}
                width={170}
                height={200}
                priority
                className="h-full w-full object-cover object-[center_top]"
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
                className="absolute h-[11px] w-[11px] border-solid border-cyan-brand"
                style={c.style}
              />
            ))}
          </div>
        </section>

        {/* BENTO */}
        <div className="animate-fade-up [animation-delay:0.3s] bento-wrap-outer relative mt-10">
          <div
            ref={bentoRef}
            className="bento-grid grid grid-cols-4 gap-2.5 max-sm:grid-cols-2"
          >
            {/* LinkedIn */}
            <div className="col-span-1 flex min-h-[158px] flex-col justify-between gap-4 rounded-xl border border-border bg-surface p-6 transition-colors hover:border-border-hover">
              <div className="flex flex-col gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-surface-2">
                  <svg viewBox="0 0 24 24" fill="#0a78c8" width="24" height="24" aria-hidden>
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect x="2" y="9" width="4" height="12" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </div>
                <div className="font-mono text-xs leading-snug text-text-muted">@petrit-halabaku</div>
              </div>
              <a
                href="https://linkedin.com/in/petrit-halabaku"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-border bg-surface-2 px-4 py-2.5 font-mono text-xs font-medium text-text-main no-underline transition-colors hover:border-cyan-brand hover:text-cyan-brand"
              >
                Connect →
              </a>
            </div>

            {/* GitHub graph */}
            <div className="col-span-3 flex flex-col gap-2.5 rounded-xl border border-border bg-surface p-5 transition-colors hover:border-border-hover max-sm:col-span-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-cyan-brand">
                  <span className="text-text-subtle">//</span> github contributions
                </div>
                <a
                  href="https://github.com/Petrit-Halabaku"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[10px] text-text-subtle no-underline transition-colors hover:text-cyan-brand"
                >
                  @Petrit-Halabaku ↗
                </a>
              </div>
              <ContribGraph />
            </div>

            {/* MapLibre globe at low zoom, flat map when zoomed in */}
            <div className="relative col-span-3 min-h-[180px] overflow-hidden rounded-xl border border-border transition-colors hover:border-border-hover max-sm:col-span-2">
              <MapboxGlobe />
            </div>

            {/* GitHub (replaces former location tile) */}
            <div className="col-span-1 flex min-h-[158px] flex-col justify-between gap-4 rounded-xl border border-border bg-surface p-6 transition-colors hover:border-border-hover">
              <div className="flex flex-col gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-surface-2">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" width="24" height="24" aria-hidden>
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                  </svg>
                </div>
                <div className="font-mono text-xs leading-snug text-text-muted">@Petrit-Halabaku</div>
              </div>
              <a
                href="https://github.com/Petrit-Halabaku"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-border bg-surface-2 px-4 py-2.5 font-mono text-xs font-medium text-text-main no-underline transition-colors hover:border-cyan-brand hover:text-cyan-brand"
              >
                Follow →
              </a>
            </div>

            {/* Stats — hidden (kept in DOM); outer wrapper avoids hidden+grid display conflict */}
            <div className="hidden col-span-4 max-sm:col-span-2">
              <div className="grid grid-cols-3 rounded-xl border border-border bg-surface transition-colors hover:border-border-hover">
                {[
                  { num: '7', em: '+', desc: 'years experience' },
                  { num: '6', em: '+', desc: 'shipped projects' },
                  { num: '4', em: '', desc: 'companies' },
                ].map(({ num, em, desc }) => (
                  <div key={desc} className="px-5 py-4 border-r border-border last:border-r-0">
                    <div className="font-mono text-[26px] font-semibold leading-none text-text-main">
                      {num}<em className="not-italic text-cyan-brand">{em}</em>
                    </div>
                    <div className="mt-1 text-[11px] text-text-muted">{desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* PROJECTS */}
        <section className="animate-fade-up [animation-delay:0.45s] mt-14">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <div className="mb-1.5 flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-cyan-brand">
                <span className="text-text-subtle">//</span> selected work
              </div>
              <h2 className="text-[22px] font-bold tracking-[-0.02em] text-text-main">Projects</h2>
            </div>
            <Link
              href="/projects"
              className="flex items-center gap-1.5 font-mono text-[11px] text-text-muted no-underline transition-colors hover:text-cyan-brand"
            >
              view all <span>→</span>
            </Link>
          </div>
          <div className="border-b border-border">
            {PROJECTS.map(p => (
              <ProjectRow key={p.id} project={p} previewRef={previewRef} previewImgRef={previewImgRef} />
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="animate-fade-up [animation-delay:0.45s] mt-14 flex flex-wrap items-center justify-between gap-6 rounded-[14px] border border-border bg-surface px-7 py-8">
          <div>
            <div className="mb-1 text-[19px] font-bold tracking-[-0.02em] text-text-main">
              Let&apos;s build something great.
            </div>
            <div className="text-[13px] text-text-muted">Open to full-time roles and freelance projects.</div>
          </div>
          <a
            href="https://linkedin.com/in/petrit-halabaku"
            target="_blank"
            rel="noopener noreferrer"
            className="whitespace-nowrap rounded-lg border border-[rgba(0,212,255,0.25)] bg-cyan-dim px-[22px] py-2.5 font-mono text-xs text-cyan-brand no-underline transition-[background,border-color,box-shadow] duration-200 hover:border-[rgba(0,212,255,0.45)] hover:bg-[rgba(0,212,255,0.14)] hover:shadow-[0_0_18px_rgba(0,212,255,0.12)]"
          >
            Get in touch →
          </a>
        </div>
      </main>

      <style>{`
        .mouse-preview.visible { display: block !important; }
      `}</style>
    </>
  )
}
