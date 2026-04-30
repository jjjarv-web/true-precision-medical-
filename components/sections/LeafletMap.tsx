'use client'

import { useEffect, useRef } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const TILE_URL  = 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
const TILE_ATTR = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'

const DEFAULT_CENTER: [number, number] = [33.5, -111.98]
const DEFAULT_ZOOM = 9

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

  /* Popup overrides */
  .tpm-popup .leaflet-popup-content-wrapper {
    background: #ffffff;
    border-radius: 16px;
    padding: 0;
    box-shadow: 0 8px 40px rgba(0,0,0,0.13), 0 2px 8px rgba(0,0,0,0.07);
    border: 1px solid rgba(0,0,0,0.07);
    overflow: hidden;
  }
  .tpm-popup .leaflet-popup-content {
    margin: 0 !important;
    line-height: 1 !important;
  }
  .tpm-popup .leaflet-popup-tip-container { display: none; }
  .tpm-popup .leaflet-popup-close-button {
    top: 10px !important;
    right: 10px !important;
    color: #9A9490 !important;
    font-size: 18px !important;
    width: 24px !important;
    height: 24px !important;
    line-height: 24px !important;
    padding: 0 !important;
    border-radius: 6px !important;
    font-weight: 400 !important;
  }
  .tpm-popup .leaflet-popup-close-button:hover {
    color: #1A1814 !important;
    background: rgba(0,0,0,0.05) !important;
  }
`

function createPin(active: boolean, label: string) {
  const fill = active ? '#4DCCE8' : '#0E0E0E'
  const dot  = '#ffffff'
  return L.divIcon({
    className: 'tpm-pin-wrapper',
    iconSize:   [26, 34],
    iconAnchor: [13, 34],
    popupAnchor: [0, -38],
    html: `<div class="tpm-pin${active ? ' selected' : ''}">
      <svg xmlns="http://www.w3.org/2000/svg" width="26" height="34" viewBox="0 0 24 32"
           role="img" focusable="false" aria-label="${label}">
        <path d="M12 0C6.48 0 2 4.48 2 10c0 7.5 10 22 10 22s10-14.5 10-22C22 4.48 17.52 0 12 0z" fill="${fill}"/>
        <circle cx="12" cy="10" r="4" fill="${dot}"/>
      </svg>
    </div>`,
  })
}

function FitBounds({ locations }: { locations: Array<{ lat: number; lng: number }> }) {
  const map    = useMap()
  const fitted = useRef(false)

  useEffect(() => {
    if (fitted.current || locations.length === 0) return
    const bounds = L.latLngBounds(locations.map((l) => [l.lat, l.lng]))
    map.fitBounds(bounds, { padding: [80, 100], maxZoom: 13 })
    fitted.current = true
  }, [locations, map])

  return null
}

function ZoomControl() {
  const map = useMap()
  useEffect(() => {
    const control = L.control.zoom({ position: 'bottomright' })
    control.addTo(map)
    return () => { control.remove() }
  }, [map])
  return null
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

function PopupCloseHandler({ onClose }: { onClose: () => void }) {
  useMapEvents({ popupclose: onClose })
  return null
}

interface Loc {
  id: string
  lat: number
  lng: number
  name: string
  streetAddress?: string
  suite?: string
  city?: string
  state?: string
  postalCode?: string
  phone?: string
  phoneHref?: string
  hoursSummary?: string[]
  mapsUrl?: string
}

interface Props {
  locations: Loc[]
  activeId:  string | null
  onSelect:  (id: string | null) => void
}

export default function LeafletMap({ locations, activeId, onSelect }: Props) {
  const active = activeId ? locations.find((l) => l.id === activeId) : null

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
      <PopupCloseHandler onClose={() => onSelect(null)} />

      {active && (
        <MapController lat={active.lat} lng={active.lng} zoom={13} />
      )}

      {locations.map((loc) => {
        const street = [loc.streetAddress, loc.suite].filter(Boolean).join(', ')
        const city   = [loc.city, [loc.state, loc.postalCode].filter(Boolean).join(' ')].filter(Boolean).join(', ')
        const addr   = [street, city].filter(Boolean).join(', ')

        return (
          <Marker
            key={loc.id}
            position={[loc.lat, loc.lng]}
            icon={createPin(loc.id === activeId, loc.name)}
            eventHandlers={{
              click: (e) => {
                const pin = (e.target as L.Marker).getElement()?.querySelector<HTMLElement>('.tpm-pin')
                if (pin) {
                  pin.classList.remove('bounce')
                  void (pin as HTMLElement & { offsetWidth: number }).offsetWidth
                  pin.classList.add('bounce')
                }
                onSelect(loc.id)
              },
            }}
          >
            <Popup className="tpm-popup" closeButton minWidth={260} maxWidth={300} autoPan>
              <div style={{ padding: '18px 20px 16px', fontFamily: 'inherit' }}>

                {/* Name */}
                <p style={{ fontSize: '15px', fontWeight: 600, color: '#1A1814', lineHeight: '1.2', marginBottom: addr ? '4px' : '12px' }}>
                  {loc.name}
                </p>

                {/* Address */}
                {addr && (
                  <p style={{ fontSize: '12px', color: '#9A9490', lineHeight: '1.5', marginBottom: '14px' }}>
                    {addr}
                  </p>
                )}

                {/* Phone */}
                {loc.phone && loc.phoneHref && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <div style={{ width: '26px', height: '26px', borderRadius: '8px', background: 'rgba(0,0,0,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#9A9490" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .84h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                      </svg>
                    </div>
                    <a
                      href={loc.phoneHref}
                      style={{ fontSize: '13px', color: '#4A4440', textDecoration: 'none', fontWeight: 500 }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = '#4DCCE8')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = '#4A4440')}
                    >
                      {loc.phone}
                    </a>
                  </div>
                )}

                {/* Hours */}
                {loc.hoursSummary && loc.hoursSummary.length > 0 && (
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '14px' }}>
                    <div style={{ width: '26px', height: '26px', borderRadius: '8px', background: 'rgba(0,0,0,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '1px' }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#9A9490" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                      </svg>
                    </div>
                    <div>
                      {loc.hoursSummary.map((line) => (
                        <div key={line} style={{ fontSize: '12px', color: '#9A9490', lineHeight: '1.6' }}>{line}</div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Directions */}
                {loc.mapsUrl && (
                  <a
                    href={loc.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                      borderRadius: '10px', padding: '9px 16px',
                      fontSize: '13px', fontWeight: 600,
                      color: '#07080C', background: '#4DCCE8',
                      textDecoration: 'none', marginTop: loc.hoursSummary?.length ? '0' : '2px',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = '#6DD8EE')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = '#4DCCE8')}
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="3 11 22 2 13 21 11 13 3 11"/>
                    </svg>
                    Get Directions
                  </a>
                )}

              </div>
            </Popup>
          </Marker>
        )
      })}
    </MapContainer>
  )
}
