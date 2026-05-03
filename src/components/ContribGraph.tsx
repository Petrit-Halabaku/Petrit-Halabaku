'use client'

import { useEffect, useMemo, useState } from 'react'
import { ActivityCalendar, type Activity, type ThemeInput } from 'react-activity-calendar'

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
    />
  )
}
