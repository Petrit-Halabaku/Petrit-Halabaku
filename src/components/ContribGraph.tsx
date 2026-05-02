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
      <div style={{ position: 'relative', height: 14, marginBottom: 4 }}>
        {monthLabels.map(({ w, label }) => (
          <span
            key={w}
            style={{
              position: 'absolute',
              left: w * 13,
              fontFamily: 'var(--font-mono)',
              fontSize: 9,
              color: 'var(--text-3)',
            }}
          >
            {label}
          </span>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 2 }}>
        {Array.from({ length: 52 }, (_, w) => (
          <div key={w} style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {Array.from({ length: 7 }, (_, d) => (
              <div
                key={d}
                style={{
                  width: 11,
                  height: 11,
                  borderRadius: 2,
                  background: CONTRIB_COLORS[CONTRIB_DATA[w * 7 + d]],
                  flexShrink: 0,
                }}
              />
            ))}
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 8, justifyContent: 'flex-end' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text-3)' }}>Less</span>
        {CONTRIB_COLORS.map((c, i) => (
          <div key={i} style={{ width: 10, height: 10, borderRadius: 2, background: c }} />
        ))}
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text-3)' }}>More</span>
      </div>
    </div>
  )
})

export default ContribGraph
