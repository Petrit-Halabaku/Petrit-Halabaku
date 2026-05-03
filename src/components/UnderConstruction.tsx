import { Construction, Wrench } from 'lucide-react'

export default function UnderConstruction() {
  return (
    <main className="relative z-[1] mx-auto flex min-h-[calc(100vh-3.5rem)] max-w-max-page flex-col items-center justify-center px-6 pb-20 text-center">
      <div className="animate-fade-up flex flex-col items-center">
        <div className="mb-1.5 flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-cyan-brand">
          <span className="text-text-subtle">//</span> work in progress
        </div>

        <div className="animate-fade-up [animation-delay:0.1s] relative mb-6 flex h-20 w-20 items-center justify-center rounded-xl border border-border bg-surface">
          <Construction
            className="h-10 w-10 text-cyan-brand"
            strokeWidth={1.5}
            aria-hidden
          />
          <span className="absolute -bottom-2 -right-2 flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-surface-2">
            <Wrench
              className="h-4 w-4 text-text-muted"
              strokeWidth={1.5}
              aria-hidden
            />
          </span>
        </div>

        <h1 className="animate-fade-up [animation-delay:0.15s] mb-3 max-w-md text-[clamp(28px,4.5vw,40px)] font-bold leading-[1.1] tracking-[-0.03em] text-text-main">
          Under construction<span className="animate-blink text-cyan-brand">_</span>
        </h1>

        <p className="animate-fade-up [animation-delay:0.2s] mb-8 max-w-md text-sm leading-[1.85] text-text-muted">
          This page is being built. Check back soon — meanwhile, the rest of
          the site is live.
        </p>

        <div className="animate-fade-up [animation-delay:0.25s] flex flex-wrap items-center justify-center gap-3">
          <span className="animate-badge-pulse inline-flex items-center gap-2 rounded-full border border-[rgba(0,229,123,0.3)] bg-green-dim px-3.5 py-1.5 font-mono text-[11px] text-green-brand">
            <span className="animate-pulse-dot block h-1.5 w-1.5 shrink-0 rounded-full bg-green-brand" />
            shipping soon
          </span>
        </div>
      </div>
    </main>
  )
}
