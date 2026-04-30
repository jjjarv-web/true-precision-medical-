'use client'

import { useEffect, useRef } from 'react'
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const TILE_URL  = 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
const TILE_ATTR = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'

const DEFAULT_CENTER: [number, number] = [33.5, -111.98]
const DEFAULT_ZOOM = 10

function createPin(active: boolean) {
  const size = active ? 16 : 10
  const glow = active
    ? 'rgba(77,204,232,0.75)'
    : 'rgba(77,204,232,0.28)'
  const bg = active ? '#4DCCE8' : 'rgba(77,204,232,0.5)'
  const border = active ? '#4DCCE8' : 'rgba(77,204,232,0.35)'

  return L.divIcon({
    html: `<div style="
      width:${size}px;height:${size}px;
      border-radius:50%;
      background:${bg};
      border:2px solid ${border};
      box-shadow:0 0 ${active ? 20 : 8}px ${glow};
      cursor:pointer;
    "></div>`,
    className: '',
    iconSize:   [size, size],
    iconAnchor: [size / 2, size / 2],
  })
}

function MapController({ lat, lng, zoom }: { lat: number; lng: number; zoom: number }) {
  const map  = useMap()
  const prev = useRef('')

  useEffect(() => {
    const key = `${lat},${lng}`
    if (key === prev.current) return
    prev.current = key
    map.flyTo([lat, lng], zoom, { duration: 1.1, easeLinearity: 0.25 })
  }, [lat, lng, zoom, map])

  return null
}

interface Loc { id: string; lat: number; lng: number }

interface Props {
  locations: Loc[]
  activeId:  string | null
  onSelect:  (id: string) => void
}

export default function LeafletMap({ locations, activeId, onSelect }: Props) {
  const active = activeId ? locations.find((l) => l.id === activeId) : null

  return (
    <MapContainer
      center={DEFAULT_CENTER}
      zoom={DEFAULT_ZOOM}
      style={{ height: '100%', width: '100%', background: '#F9F7F4' }}
      zoomControl={false}
      attributionControl={false}
      scrollWheelZoom={false}
      dragging={!L.Browser.mobile}
    >
      <TileLayer url={TILE_URL} attribution={TILE_ATTR} detectRetina />

      {active && (
        <MapController lat={active.lat} lng={active.lng} zoom={11} />
      )}

      {locations.map((loc) => (
        <Marker
          key={loc.id}
          position={[loc.lat, loc.lng]}
          icon={createPin(loc.id === activeId)}
          eventHandlers={{ click: () => onSelect(loc.id) }}
        />
      ))}
    </MapContainer>
  )
}
