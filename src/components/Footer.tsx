'use client'

import { getSiteFullName } from '@/src/lib/site'

export default function Footer() {
  const fullName = getSiteFullName()

  return (
    <footer className="relative z-[1] mx-auto flex w-full max-w-max-page flex-wrap items-center justify-between gap-3 border-t border-border px-6 py-7">
      <span className="font-mono text-[11px] text-text-subtle">
        © {new Date().getFullYear()}
        {fullName ? ` ${fullName}` : ''}
      </span>
      <div className="flex gap-5">
        {[
          { label: 'LinkedIn', href: 'https://linkedin.com/in/petrit-halabaku' },
          { label: 'GitHub', href: 'https://github.com/Petrit-Halabaku' },
        ].map(({ label, href }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[11px] text-text-subtle no-underline transition-colors duration-200 hover:text-cyan-brand"
          >
            {label}
          </a>
        ))}
      </div>
    </footer>
  )
}
