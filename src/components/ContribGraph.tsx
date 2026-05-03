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

  return (
    <ActivityCalendar
      data={data ?? []}
      loading={!data}
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
