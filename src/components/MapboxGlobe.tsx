'use client'

import { useEffect, useRef, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

const MapboxGlobe = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<mapboxgl.Map | null>(null)
  const [loaded, setLoaded] = useState(false)
  const myCoordinates: [number, number] = [21.14818001266148, 42.65780283614316]
  // const myCoordinates: [number, number] = [21.1878, 42.6494]

  useEffect(() => {
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || ''

    if (mapRef.current || !mapContainerRef.current) return

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      projection: 'globe',
      center: myCoordinates,
      zoom: 4.5,
      style: 'mapbox://styles/mapbox/streets-v12',
    })

    const attributionControl = (map as unknown as {
      _controls: mapboxgl.IControl[]
    })._controls.find((ctrl) => ctrl instanceof mapboxgl.AttributionControl)
    if (attributionControl) {
      map.removeControl(attributionControl)
    }

    mapRef.current = map

    map.addControl(
      new mapboxgl.AttributionControl({ compact: true, customAttribution: '' }),
    )

    const size = 100

    const pulsingDot = {
      width: size,
      height: size,
      data: new Uint8ClampedArray(size * size * 4),
      context: null as CanvasRenderingContext2D | null,

      onAdd: function () {
        const canvas = document.createElement('canvas')
        canvas.width = this.width
        canvas.height = this.height
        this.context = canvas.getContext('2d')
      },

      render: function () {
        if (!this.context) return false

        const duration = 1000
        const t = (performance.now() % duration) / duration

        const radius = (size / 2) * 0.3
        const outerRadius = (size / 2) * 0.7 * t + radius
        const context = this.context

        context.clearRect(0, 0, this.width, this.height)
        context.beginPath()
        context.arc(
          this.width / 2,
          this.height / 2,
          outerRadius,
          0,
          Math.PI * 2,
        )
        context.fillStyle = `rgba(255, 200, 200, ${1 - t})`
        context.fill()

        context.beginPath()
        context.arc(this.width / 2, this.height / 2, radius, 0, Math.PI * 2)
        context.fillStyle = 'rgba(255, 100, 100, 1)'
        context.strokeStyle = 'white'
        context.lineWidth = 2 + 4 * (1 - t)
        context.fill()
        context.stroke()

        this.data = context.getImageData(
          0,
          0,
          this.width,
          this.height,
        ).data

        if (mapRef.current) {
          mapRef.current.triggerRepaint()
        }

        return true
      },
    }

    map.on('style.load', () => {
      map.setFog({})
    })

    map.on('load', () => {
      if (!mapRef.current) return
      setLoaded(true)

      mapRef.current.addImage('pulsing-dot', pulsingDot, { pixelRatio: 2 })

      mapRef.current.addSource('dot-point', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: myCoordinates,
              },
              properties: null,
            },
          ],
        },
      })

      mapRef.current.addLayer({
        id: 'layer-with-pulsing-dot',
        type: 'symbol',
        source: 'dot-point',
        layout: {
          'icon-image': 'pulsing-dot',
        },
      })
    })

    return () => {
      mapRef.current?.remove()
      mapRef.current = null
    }
  }, [])

  return (
    <div className="relative h-full w-full">
      <div ref={mapContainerRef} className="h-full w-full" />
      <div
        aria-hidden
        className={`globe-skeleton pointer-events-none absolute inset-0 transition-opacity duration-700 ${
          loaded ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <div className="globe-skeleton__bg" />
        <div className="globe-skeleton__grid" />
        <div className="globe-skeleton__sphere" />
        <div className="globe-skeleton__shimmer" />
        <div className="globe-skeleton__dot" />
        <div className="globe-skeleton__label">
          <span className="text-text-subtle">//</span> locating&nbsp;signal
          <span className="globe-skeleton__caret">_</span>
        </div>
      </div>
      <style jsx global>{`
        .mapboxgl-ctrl-logo,
        .mapboxgl-ctrl-attrib {
          display: none !important;
        }
      `}</style>
      <style jsx>{`
        .globe-skeleton {
          background: var(--color-surface);
          overflow: hidden;
        }
        .globe-skeleton__bg {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(
              120% 80% at 50% 50%,
              rgba(0, 212, 255, 0.06) 0%,
              rgba(13, 17, 23, 0) 60%
            ),
            linear-gradient(180deg, #0d1117 0%, #0a0e14 100%);
        }
        .globe-skeleton__grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(
              to right,
              rgba(28, 35, 50, 0.55) 1px,
              transparent 1px
            ),
            linear-gradient(
              to bottom,
              rgba(28, 35, 50, 0.55) 1px,
              transparent 1px
            );
          background-size: 32px 32px;
          mask-image: radial-gradient(
            70% 90% at 50% 50%,
            #000 30%,
            transparent 80%
          );
          opacity: 0.7;
        }
        .globe-skeleton__sphere {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 220px;
          height: 220px;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          background:
            radial-gradient(
              circle at 35% 35%,
              rgba(0, 212, 255, 0.18) 0%,
              rgba(0, 212, 255, 0.04) 35%,
              rgba(0, 0, 0, 0) 70%
            );
          border: 1px solid rgba(0, 212, 255, 0.18);
          box-shadow:
            inset 0 0 60px rgba(0, 212, 255, 0.08),
            0 0 40px rgba(0, 212, 255, 0.06);
          animation: globe-pulse 2.4s ease-in-out infinite;
        }
        .globe-skeleton__shimmer {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            110deg,
            transparent 30%,
            rgba(0, 212, 255, 0.07) 50%,
            transparent 70%
          );
          transform: translateX(-100%);
          animation: globe-shimmer 2.2s ease-in-out infinite;
        }
        .globe-skeleton__dot {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--color-cyan-brand);
          transform: translate(-50%, -50%);
          box-shadow:
            0 0 0 0 rgba(0, 212, 255, 0.5),
            0 0 12px rgba(0, 212, 255, 0.6);
          animation: globe-ping 1.6s ease-out infinite;
        }
        .globe-skeleton__label {
          position: absolute;
          left: 14px;
          bottom: 12px;
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          font-size: 10px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--color-cyan-brand);
          opacity: 0.85;
        }
        .globe-skeleton__caret {
          margin-left: 2px;
          animation: globe-blink 1.1s step-end infinite;
        }
        @keyframes globe-pulse {
          0%,
          100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.85;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.04);
            opacity: 1;
          }
        }
        @keyframes globe-shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        @keyframes globe-ping {
          0% {
            box-shadow:
              0 0 0 0 rgba(0, 212, 255, 0.45),
              0 0 12px rgba(0, 212, 255, 0.6);
          }
          80%,
          100% {
            box-shadow:
              0 0 0 22px rgba(0, 212, 255, 0),
              0 0 12px rgba(0, 212, 255, 0);
          }
        }
        @keyframes globe-blink {
          50% {
            opacity: 0;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .globe-skeleton__sphere,
          .globe-skeleton__shimmer,
          .globe-skeleton__dot,
          .globe-skeleton__caret {
            animation: none;
          }
        }
      `}</style>
    </div>
  )
}

export default MapboxGlobe
