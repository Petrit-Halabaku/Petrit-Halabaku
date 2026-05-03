'use client'

import { cloneElement, useEffect, useMemo, useState, type SVGProps } from 'react'
import { ActivityCalendar, type Activity, type ThemeInput } from 'react-activity-calendar'
import 'react-activity-calendar/tooltips.css'

const THEME: ThemeInput = {
  dark: ['#161b22', '#0d3d2e', '#006d40', '#26a641', '#39d353'],
  light: ['#161b22', '#0d3d2e', '#006d40', '#26a641', '#39d353'],
}

const USERNAME = process.env.NEXT_PUBLIC_GITHUB_USERNAME ?? 'Petrit-Halabaku'
const MONTHS = 10

function rangeStart(): Date {
  const d = new Date()
  d.setMonth(d.getMonth() - MONTHS)
  return d
}

function utcDate(dateStr: string): Date {
  const [y, m, d] = dateStr.split('-').map(Number)
  return new Date(Date.UTC(y, (m ?? 1) - 1, d ?? 1))
}

function githubDayOverviewUrl(username: string, isoDate: string): string {
  const q = new URLSearchParams({ tab: 'overview', from: isoDate, to: isoDate })
  return `https://github.com/${encodeURIComponent(username)}?${q}`
}

function ariaForDay(activity: Activity, formatter: Intl.DateTimeFormat): string {
  const day = formatter.format(utcDate(activity.date))
  const n = activity.count
  if (n === 0)
    return `${day}. No GitHub contributions. Opens your GitHub overview for this day in a new tab.`
  return `${day}. ${n} GitHub contribution${n === 1 ? '' : 's'}. Opens your GitHub overview for this day in a new tab.`
}

function tooltipForDay(activity: Activity, formatter: Intl.DateTimeFormat): string {
  const day = formatter.format(utcDate(activity.date))
  const n = activity.count
  if (n === 0) return `${day}\nNo GitHub contributions`
  return `${day}\n${n} GitHub contribution${n === 1 ? '' : 's'}`
}

function buildFallback(start: Date): Activity[] {
  let s = 42
  const lcg = (n: number) => (n * 1664525 + 1013904223) & 0xffffffff
  const today = new Date()
  const days = Math.floor((today.getTime() - start.getTime()) / 86400000) + 1
  return Array.from({ length: days }, (_, i) => {
    s = lcg(s)
    const r = (s >>> 0) / 0xffffffff
    const level = r < 0.48 ? 0 : r < 0.62 ? 1 : r < 0.76 ? 2 : r < 0.88 ? 3 : 4
    const d = new Date(start)
    d.setDate(start.getDate() + i)
    return {
      date: d.toISOString().slice(0, 10),
      count: level === 0 ? 0 : level * 2,
      level,
    }
  })
}

const SKELETON_WEEKS = 44
const SKELETON_DAYS = 7
const BLOCK_SIZE = 11
const BLOCK_MARGIN = 2

function ContribSkeleton() {
  const blocks = useMemo(() => {
    let s = 1337
    const lcg = () => (s = (s * 1664525 + 1013904223) & 0xffffffff)
    return Array.from({ length: SKELETON_WEEKS * SKELETON_DAYS }, () => {
      const r = (lcg() >>> 0) / 0xffffffff
      const level = r < 0.55 ? 0 : r < 0.72 ? 1 : r < 0.86 ? 2 : r < 0.95 ? 3 : 4
      return level
    })
  }, [])

  return (
    <div className="contrib-skeleton" aria-hidden>
      <div className="contrib-skeleton__months">
        {Array.from({ length: 10 }).map((_, i) => (
          <span key={i} className="contrib-skeleton__month-tick" />
        ))}
      </div>
      <div className="contrib-skeleton__body">
        <div className="contrib-skeleton__days">
          {['Mon', 'Wed', 'Fri'].map(d => (
            <span key={d} className="contrib-skeleton__day-label">
              {d}
            </span>
          ))}
        </div>
        <div className="contrib-skeleton__grid">
          {Array.from({ length: SKELETON_WEEKS }).map((_, w) => (
            <div key={w} className="contrib-skeleton__col">
              {Array.from({ length: SKELETON_DAYS }).map((_, d) => {
                const level = blocks[w * SKELETON_DAYS + d]
                return (
                  <span
                    key={d}
                    className="contrib-skeleton__block"
                    data-level={level}
                    style={{ animationDelay: `${(w * 23 + d * 41) % 1800}ms` }}
                  />
                )
              })}
            </div>
          ))}
          <div className="contrib-skeleton__shimmer" />
        </div>
      </div>
      <div className="contrib-skeleton__legend">
        <span className="text-text-subtle">//</span> syncing&nbsp;contributions
        <span className="contrib-skeleton__caret">_</span>
      </div>
      <style jsx>{`
        .contrib-skeleton {
          width: 100%;
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
        }
        .contrib-skeleton__months {
          display: flex;
          justify-content: space-between;
          padding: 0 28px 4px 28px;
          height: 13px;
        }
        .contrib-skeleton__month-tick {
          width: 22px;
          height: 6px;
          border-radius: 2px;
          background: linear-gradient(
            90deg,
            rgba(28, 35, 50, 0.6),
            rgba(42, 53, 80, 0.6)
          );
          animation: contrib-pulse 2.2s ease-in-out infinite;
        }
        .contrib-skeleton__body {
          display: flex;
          gap: 4px;
        }
        .contrib-skeleton__days {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          width: 24px;
          padding: 6px 0 6px 0;
          font-size: 9px;
          color: var(--color-text-subtle, #4a5568);
          opacity: 0.55;
        }
        .contrib-skeleton__day-label {
          line-height: 1;
        }
        .contrib-skeleton__grid {
          position: relative;
          display: flex;
          gap: ${BLOCK_MARGIN}px;
          overflow: hidden;
        }
        .contrib-skeleton__col {
          display: flex;
          flex-direction: column;
          gap: ${BLOCK_MARGIN}px;
        }
        .contrib-skeleton__block {
          width: ${BLOCK_SIZE}px;
          height: ${BLOCK_SIZE}px;
          border-radius: 2px;
          background: #161b22;
          animation: contrib-pulse 2s ease-in-out infinite;
        }
        .contrib-skeleton__block[data-level='1'] {
          background: rgba(13, 61, 46, 0.55);
        }
        .contrib-skeleton__block[data-level='2'] {
          background: rgba(0, 109, 64, 0.5);
        }
        .contrib-skeleton__block[data-level='3'] {
          background: rgba(38, 166, 65, 0.45);
        }
        .contrib-skeleton__block[data-level='4'] {
          background: rgba(57, 211, 83, 0.45);
        }
        .contrib-skeleton__shimmer {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            100deg,
            transparent 35%,
            rgba(0, 229, 123, 0.08) 50%,
            transparent 65%
          );
          transform: translateX(-100%);
          animation: contrib-shimmer 2.4s ease-in-out infinite;
          pointer-events: none;
        }
        .contrib-skeleton__legend {
          margin-top: 8px;
          padding-left: 28px;
          font-size: 10px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--color-cyan-brand);
          opacity: 0.7;
        }
        .contrib-skeleton__caret {
          margin-left: 2px;
          animation: contrib-blink 1.1s step-end infinite;
        }
        @keyframes contrib-pulse {
          0%,
          100% {
            opacity: 0.55;
          }
          50% {
            opacity: 1;
          }
        }
        @keyframes contrib-shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        @keyframes contrib-blink {
          50% {
            opacity: 0;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .contrib-skeleton__block,
          .contrib-skeleton__shimmer,
          .contrib-skeleton__month-tick,
          .contrib-skeleton__caret {
            animation: none;
          }
        }
      `}</style>
    </div>
  )
}

export default function ContribGraph() {
  const start = useMemo(rangeStart, [])
  const [data, setData] = useState<Activity[] | null>(null)
  const dayFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat(undefined, {
        timeZone: 'UTC',
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
    [],
  )

  useEffect(() => {
    let cancelled = false
    const startStr = start.toISOString().slice(0, 10)
    fetch(`https://github-contributions-api.jogruber.de/v4/${USERNAME}?y=last`)
      .then(r => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((json: { contributions: Activity[] }) => {
        if (cancelled) return
        setData(json.contributions.filter(c => c.date >= startStr))
      })
      .catch(() => {
        if (!cancelled) setData(buildFallback(start))
      })
    return () => {
      cancelled = true
    }
  }, [start])

  if (!data) return <ContribSkeleton />

  return (
    <ActivityCalendar
      data={data}
      theme={THEME}
      colorScheme="dark"
      blockSize={11}
      blockMargin={2}
      blockRadius={2}
      fontSize={10}
      showTotalCount={false}
      labels={{ legend: { less: 'Less', more: 'More' } }}
      tooltips={{
        activity: {
          text: a => tooltipForDay(a, dayFormatter),
          placement: 'top',
          hoverRestMs: 100,
          withArrow: true,
        },
      }}
      renderBlock={(block, activity) => {
        const rect = cloneElement(block, {
          style: {
            ...(block.props as SVGProps<SVGRectElement>).style,
            cursor: 'pointer',
          },
        } as SVGProps<SVGRectElement>)
        return (
          <a
            href={githubDayOverviewUrl(USERNAME, activity.date)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={ariaForDay(activity, dayFormatter)}
          >
            {rect}
          </a>
        )
      }}
    />
  )
}
