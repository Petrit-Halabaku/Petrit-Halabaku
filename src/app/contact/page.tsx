'use client'

import Link from 'next/link'
import { useRef, useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import emailjs from '@emailjs/browser'

type SubmitStatus = 'idle' | 'success' | 'error'
type FieldErrors = { name?: string; email?: string; message?: string }

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const FIELD_CLASS =
  'w-full rounded-[10px] border border-border bg-surface px-3.5 py-2.5 font-mono text-[12px] text-text-main placeholder:text-text-subtle outline-none transition-colors duration-200 hover:border-border-hover focus:border-cyan-brand focus:bg-[rgba(0,212,255,0.03)]'

const LABEL_CLASS =
  'mb-1.5 flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-cyan-brand'

const ERROR_CLASS = 'mt-1.5 font-mono text-[10px] text-[#ff6a6a]'

export default function ContactPage() {
  const router = useRouter()
  const formRef = useRef<HTMLFormElement>(null)
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle')
  const [pending, setPending] = useState(false)
  const [errors, setErrors] = useState<FieldErrors>({})

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitStatus('idle')

    const form = formRef.current
    if (!form) return

    const data = new FormData(form)
    if (data.get('company')) {
      setSubmitStatus('success')
      form.reset()
      return
    }

    const name = String(data.get('from_name') ?? '').trim()
    const email = String(data.get('reply_to') ?? '').trim()
    const message = String(data.get('message') ?? '').trim()

    const nextErrors: FieldErrors = {}
    if (name.length < 2) nextErrors.name = 'Please enter your name.'
    if (!EMAIL_RE.test(email)) nextErrors.email = 'Please enter a valid email.'
    if (message.length < 10) nextErrors.message = 'Message should be at least 10 characters.'

    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) {
      setSubmitStatus('error')
      return
    }

    setPending(true)
    try {
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '',
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '',
        form,
        process.env.NEXT_PUBLIC_EMAILJS_USER_ID || '',
      )
      form.reset()
      setSubmitStatus('success')
      setTimeout(() => router.push('/'), 2000)
    } catch (error) {
      console.error('Error sending email:', error)
      setSubmitStatus('error')
    } finally {
      setPending(false)
    }
  }

  const statusMessage =
    submitStatus === 'success'
      ? 'Thanks — I’ll be in touch soon.'
      : submitStatus === 'error'
        ? Object.keys(errors).length > 0
          ? 'Please fix the highlighted fields.'
          : 'Could not send right now. Please try again later.'
        : ''

  return (
    <main className="relative z-[1] mx-auto max-w-max-page px-6 pb-20">
      <div className="animate-fade-up mb-12 border-b border-border pb-9 pt-14 max-md:pb-7 max-md:pt-9">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="mb-1.5 flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-cyan-brand">
              <span className="text-text-subtle">//</span> contact
            </div>
            <h1 className="text-[28px] font-bold tracking-[-0.02em] text-text-main">
              Get in touch
            </h1>
          </div>
          <Link
            href="/"
            className="mt-2 font-mono text-[11px] text-text-subtle no-underline transition-colors hover:text-cyan-brand"
          >
            ← back home
          </Link>
        </div>
        <p className="mt-2.5 max-w-[500px] text-sm leading-[1.75] text-text-muted">
          Have a project in mind, a role to discuss, or just want to say hi? Drop a note below and I’ll get back to you.
        </p>
      </div>

      <div className="animate-fade-up [animation-delay:0.1s] grid grid-cols-[1fr_280px] items-start gap-12 max-md:grid-cols-1">
        <form ref={formRef} onSubmit={onSubmit} className="flex flex-col gap-5" noValidate>
          <input
            type="text"
            name="company"
            tabIndex={-1}
            autoComplete="off"
            className="absolute left-[-9999px] h-0 w-0 opacity-0"
            aria-hidden="true"
          />

          <div>
            <label htmlFor="name" className={LABEL_CLASS}>
              <span className="text-text-subtle">//</span> name
            </label>
            <input
              id="name"
              name="from_name"
              type="text"
              required
              minLength={2}
              autoComplete="name"
              className={FIELD_CLASS}
              placeholder="Your name"
              aria-invalid={Boolean(errors.name)}
            />
            {errors.name && <div className={ERROR_CLASS}>{errors.name}</div>}
          </div>

          <div>
            <label htmlFor="email" className={LABEL_CLASS}>
              <span className="text-text-subtle">//</span> email
            </label>
            <input
              id="email"
              name="reply_to"
              type="email"
              required
              autoComplete="email"
              className={FIELD_CLASS}
              placeholder="you@domain.com"
              aria-invalid={Boolean(errors.email)}
            />
            {errors.email && <div className={ERROR_CLASS}>{errors.email}</div>}
          </div>

          <div>
            <label htmlFor="message" className={LABEL_CLASS}>
              <span className="text-text-subtle">//</span> message
            </label>
            <textarea
              id="message"
              name="message"
              required
              minLength={10}
              rows={7}
              className={`${FIELD_CLASS} resize-y leading-[1.7]`}
              placeholder="What are you working on?"
              aria-invalid={Boolean(errors.message)}
            />
            {errors.message && <div className={ERROR_CLASS}>{errors.message}</div>}
          </div>

          <div className="flex items-center gap-4">
            <button
              type="submit"
              disabled={pending}
              className="inline-flex items-center gap-1.5 rounded-md border border-[rgba(0,212,255,0.22)] bg-cyan-dim px-[18px] py-2 font-mono text-[11px] text-cyan-brand no-underline transition-[background,border-color,opacity] duration-200 hover:border-[rgba(0,212,255,0.4)] hover:bg-[rgba(0,212,255,0.14)] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {pending ? 'sending…' : 'send message →'}
            </button>

            <p
              aria-live="polite"
              className={`font-mono text-[11px] ${submitStatus === 'success'
                  ? 'text-cyan-brand'
                  : submitStatus === 'error'
                    ? 'text-[#ff6a6a]'
                    : 'text-text-subtle'
                }`}
            >
              {statusMessage}
            </p>
          </div>
        </form>

        <aside className="animate-fade-up [animation-delay:0.2s] flex flex-col gap-2.5">
          <div className="mb-0.5 flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-cyan-brand">
            <span className="text-text-subtle">//</span> elsewhere
          </div>

          <a
            href="mailto:phalabaku@gmail.com"
            className="rounded-[10px] border border-border bg-surface px-4 py-3.5 no-underline transition-colors duration-200 hover:border-border-hover"
          >
            <div className="mb-[3px] text-xs font-semibold text-text-main">Email</div>
            <div className="font-mono text-[10px] leading-[1.5] text-text-subtle">
              phalabaku@gmail.com
            </div>
          </a>

          <a
            href="https://linkedin.com/in/petrit-halabaku"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-[10px] border border-border bg-surface px-4 py-3.5 no-underline transition-colors duration-200 hover:border-border-hover"
          >
            <div className="mb-[3px] text-xs font-semibold text-text-main">LinkedIn</div>
            <div className="font-mono text-[10px] leading-[1.5] text-text-subtle">
              /in/petrit-halabaku
            </div>
          </a>

          <a
            href="https://github.com/Petrit-Halabaku"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-[10px] border border-border bg-surface px-4 py-3.5 no-underline transition-colors duration-200 hover:border-border-hover"
          >
            <div className="mb-[3px] text-xs font-semibold text-text-main">GitHub</div>
            <div className="font-mono text-[10px] leading-[1.5] text-text-subtle">
              @Petrit-Halabaku
            </div>
          </a>

          <div className="my-2 h-px bg-border" />

          <div className="rounded-xl border border-border bg-surface p-5">
            <div className="mb-1.5 text-sm font-semibold text-text-main">Response time</div>
            <div className="text-xs leading-[1.6] text-text-muted">
              Usually within 1–2 business days.
            </div>
          </div>
        </aside>
      </div>
    </main>
  )
}