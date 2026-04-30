'use client'

import { useEffect, useRef } from 'react'
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const TILE_URL  = 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
const TILE_ATTR = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'

// Fallback used only if no locations are passed
const DEFAULT_CENTER: [number, number] = [33.5, -111.98]
const DEFAULT_ZOOM = 8

const PIN_STYLES = `
  .tpm-pin-wrapper { outline: none !important; border: none !important; background: none !important; }
  .tpm-pin { cursor: pointer; display: inline-block; }
  .tpm-pin svg {
    transition: transform 0.2s cubic-bezier(0.34,1.56,0.64,1), filter 0.15s ease;
    transform-origin: 50% 100%;
    filter: drop-shadow(0 2px 3px rgba(0,0,0,0.28));
  }
  .tpm-pin:hover svg {
    transform: scale(1.22) translateY(-3px);
    filter: drop-shadow(0 5px 8px rgba(0,0,0,0.38));
  }
  .tpm-pin.selected svg {
    transform: scale(1.28) translateY(-4px);
    filter: drop-shadow(0 6px 10px rgba(0,0,0,0.42));
  }
  .tpm-pin.bounce svg {
    animation: tpm-pin-bounce 0.42s cubic-bezier(0.36,0.07,0.19,0.97) forwards;
  }
  @keyframes tpm-pin-bounce {
    0%   { transform: scale(1)    translateY(0); }
    28%  { transform: scale(1.38) translateY(-10px); }
    55%  { transform: scale(0.93) translateY(0); }
    76%  { transform: scale(1.16) translateY(-4px); }
    100% { transform: scale(1.28) translateY(-4px); }
  }
`

function createPin(active: boolean, label: string) {
  // Active = TPM teal, inactive = near-black (same teardrop shape as ARC Joint)
  const fill = active ? '#4DCCE8' : '#0E0E0E'
  const dot  = active ? '#ffffff' : '#ffffff'
  return L.divIcon({
    className: 'tpm-pin-wrapper',
    iconSize:   [26, 34],
    iconAnchor: [13, 34],
    popupAnchor: [0, -32],
    html: `<div class="tpm-pin${active ? ' selected' : ''}">
      <svg xmlns="http://www.w3.org/2000/svg" width="26" height="34" viewBox="0 0 24 32"
           role="img" focusable="false" aria-label="${label}">
        <path d="M12 0C6.48 0 2 4.48 2 10c0 7.5 10 22 10 22s10-14.5 10-22C22 4.48 17.52 0 12 0z" fill="${fill}"/>
        <circle cx="12" cy="10" r="4" fill="${dot}"/>
      </svg>
    </div>`,
  })
}

// Fits the map to all markers on first load
function FitBounds({ locations }: { locations: Array<{ lat: number; lng: number }> }) {
  const map    = useMap()
  const fitted = useRef(false)

  useEffect(() => {
    if (fitted.current || locations.length === 0) return
    const bounds = L.latLngBounds(locations.map((l) => [l.lat, l.lng]))
    map.fitBounds(bounds, { padding: [48, 48], maxZoom: 10 })
    fitted.current = true
  }, [locations, map])

  return null
}

// Zoom control anchored to bottom-right (matches ARC Joint)
function ZoomControl() {
  const map = useMap()
  useEffect(() => {
    const control = L.control.zoom({ position: 'bottomright' })
    control.addTo(map)
    return () => { control.remove() }
  }, [map])
  return null
}

// Flies to the active location when selection changes
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

  // Inject pin CSS once
  useEffect(() => {
    const id = 'tpm-map-pin-styles'
    if (!document.getElementById(id)) {
      const style = document.createElement('style')
      style.id = id
      style.textContent = PIN_STYLES
      document.head.appendChild(style)
    }
  }, [])

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

      <FitBounds locations={locations} />
      <ZoomControl />

      {active && (
        <MapController lat={active.lat} lng={active.lng} zoom={12} />
      )}

      {locations.map((loc) => (
        <Marker
          key={loc.id}
          position={[loc.lat, loc.lng]}
          icon={createPin(loc.id === activeId, loc.id)}
          eventHandlers={{
            click: (e) => {
              // Bounce animation
              const pin = (e.target as L.Marker).getElement()?.querySelector<HTMLElement>('.tpm-pin')
              if (pin) {
                pin.classList.remove('bounce')
                void (pin as HTMLElement & { offsetWidth: number }).offsetWidth
                pin.classList.add('bounce')
              }
              onSelect(loc.id)
            },
          }}
        />
      ))}
    </MapContainer>
  )
}
