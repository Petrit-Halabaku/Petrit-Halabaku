import { memo } from 'react'

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const CONTRIB_COLORS = ['#161b22', '#0d3d2e', '#006d40', '#26a641', '#39d353']

const CONTRIB_DATA = (() => {
  let s = 42
  const lcg = (n: number) => (n * 1664525 + 1013904223) & 0xffffffff
  return Array.from({ length: 52 * 7 }, () => {
    s = lcg(s)
    const r = (s >>> 0) / 0xffffffff
    return r < 0.48 ? 0 : r < 0.62 ? 1 : r < 0.76 ? 2 : r < 0.88 ? 3 : 4
  })
})()

const ContribGraph = memo(function ContribGraph() {
  const today = new Date()
  const monthLabels: { w: number; label: string }[] = []
  for (let w = 0; w < 52; w++) {
    const d = new Date(today)
    d.setDate(d.getDate() - (51 - w) * 7)
    if (d.getDate() <= 7) monthLabels.push({ w, label: MONTH_NAMES[d.getMonth()] })
  }

  return (
    <div>
      <div className="relative mb-1 h-3.5">
        {monthLabels.map(({ w, label }) => (
          <span
            key={w}
            className="absolute font-mono text-[9px] text-text-subtle"
            style={{ left: w * 13 }}
          >
            {label}
          </span>
        ))}
      </div>
      <div className="flex gap-0.5">
        {Array.from({ length: 52 }, (_, w) => (
          <div key={w} className="flex flex-col gap-0.5">
            {Array.from({ length: 7 }, (_, d) => (
              <div
                key={d}
                className="h-[11px] w-[11px] shrink-0 rounded-sm"
                style={{ background: CONTRIB_COLORS[CONTRIB_DATA[w * 7 + d]] }}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="mt-2 flex items-center justify-end gap-1">
        <span className="font-mono text-[9px] text-text-subtle">Less</span>
        {CONTRIB_COLORS.map((c, i) => (
          <div key={i} className="h-2.5 w-2.5 rounded-sm" style={{ background: c }} />
        ))}
        <span className="font-mono text-[9px] text-text-subtle">More</span>
      </div>
    </div>
  )
})

export default ContribGraph
