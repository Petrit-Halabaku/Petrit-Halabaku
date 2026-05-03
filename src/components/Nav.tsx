'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

const LINKS = [
  { href: '/', label: 'home' },
  { href: '/projects', label: 'projects' },
  { href: '/experience', label: 'experience' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <nav className="sticky top-0 z-[999] border-b border-border bg-[rgba(7,9,13,0.88)] backdrop-blur-xl">
      <div className="relative mx-auto flex h-14 max-w-max-page items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 no-underline">
          <Image
            src="/uploads/logo-white.png"
            alt="PH"
            width={30}
            height={30}
            className="w-auto opacity-90 brightness-100 "
            // style={{ width: 'auto' }}
          />
        </Link>

        {/* Desktop links */}
        <div className="nav-links-desktop flex items-center gap-7 max-sm:hidden">
          {LINKS.map(({ href, label }) => {
            const active = pathname === href
            return (
              <Link
                key={href}
                href={href}
                className={`relative whitespace-nowrap font-mono text-[11px] lowercase tracking-[0.06em] no-underline transition-colors ${
                  active ? 'text-text-main' : 'text-text-muted'
                }`}
              >
                {label}
                {active && (
                  <span className="absolute -bottom-1 left-0 right-0 h-px bg-cyan-brand" />
                )}
              </Link>
            )
          })}
          <a
            href="https://linkedin.com/in/petrit-halabaku"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md border border-[rgba(0,212,255,0.2)] bg-cyan-dim px-3 py-[5px] font-mono text-[11px] text-cyan-brand no-underline transition-[background,border-color] duration-200 hover:border-[rgba(0,212,255,0.4)] hover:bg-[rgba(0,212,255,0.14)]"
          >
            hire me →
          </a>
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setOpen(o => !o)}
          aria-label="menu"
          className="nav-burger-btn hidden cursor-pointer flex-col gap-[5px] border-none bg-transparent p-1.5 max-sm:flex"
        >
          {[0, 1, 2].map(i => (
            <span
              key={i}
              className="block h-[1.5px] w-[22px] rounded-sm bg-text-muted transition-all duration-200"
              style={{
                transform:
                  open && i === 0
                    ? 'translateY(6.5px) rotate(45deg)'
                    : open && i === 2
                    ? 'translateY(-6.5px) rotate(-45deg)'
                    : 'none',
                opacity: open && i === 1 ? 0 : 1,
              }}
            />
          ))}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="absolute left-0 right-0 top-14 z-[99] flex flex-col border-b border-border bg-[rgba(13,17,23,0.98)] backdrop-blur-xl">
          {LINKS.map(({ href, label }) => {
            const active = pathname === href
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className={`border-b border-border px-6 py-3.5 font-mono text-xs tracking-[0.06em] no-underline transition-[color,background] duration-200 ${
                  active ? 'bg-[rgba(0,212,255,0.04)] text-cyan-brand' : 'text-text-muted'
                }`}
              >
                {label}
              </Link>
            )
          })}
          <a
            href="https://linkedin.com/in/petrit-halabaku"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="px-6 py-3.5 font-mono text-xs tracking-[0.06em] text-text-muted no-underline transition-[color,background] duration-200"
          >
            hire me
          </a>
        </div>
      )}
    </nav>
  )
}
