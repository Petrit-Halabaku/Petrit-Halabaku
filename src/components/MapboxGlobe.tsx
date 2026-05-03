'use client'

import { useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

const MapboxGlobe = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<mapboxgl.Map | null>(null)
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
      <style jsx global>{`
        .mapboxgl-ctrl-logo,
        .mapboxgl-ctrl-attrib {
          display: none !important;
        }
      `}</style>
    </div>
  )
}

export default MapboxGlobe
