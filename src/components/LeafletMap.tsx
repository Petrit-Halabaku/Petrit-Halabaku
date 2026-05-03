'use client'

import { useEffect, useRef } from 'react'

export default function LeafletMap() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    let cancelled = false
    let map: import('leaflet').Map | null = null

    ;(async () => {
      const L = (await import('leaflet')).default
      await import('leaflet/dist/leaflet.css')
      if (cancelled || !el.isConnected) return

      map = L.map(el, {
        center: [42.6026, 20.903],
        zoom: 6,
        zoomControl: false,
        scrollWheelZoom: false,
        dragging: false,
        touchZoom: false,
        doubleClickZoom: false,
        boxZoom: false,
        keyboard: false,
        attributionControl: false,
      })

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map)

      const icon = L.divIcon({
        html: `<div style="width:14px;height:14px;border-radius:50%;background:#ef4444;border:2.5px solid #fff;box-shadow:0 0 10px rgba(239,68,68,0.6);"></div>`,
        className: '',
        iconSize: [14, 14],
        iconAnchor: [7, 7],
      })

      L.marker([42.6629, 21.1655], { icon }).addTo(map)
    })()

    return () => {
      cancelled = true
      map?.remove()
    }
  }, [])

  return (
    <div ref={containerRef} className="h-[180px] w-full rounded-xl" />
  )
}
