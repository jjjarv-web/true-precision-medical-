import { ImageResponse } from 'next/og'
import fs from 'fs'
import path from 'path'

export const runtime = 'nodejs'
export const alt = 'True Precision Medical | Advanced Minimally Invasive Specialty Care'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/jpeg'

export default async function OGImage() {
  const img = fs.readFileSync(
    path.join(process.cwd(), 'public/images/og-homepage.jpg')
  )
  const src = `data:image/jpeg;base64,${img.toString('base64')}`

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: 'flex',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <img
          src={src}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center top',
          }}
        />
      </div>
    ),
    { ...size }
  )
}
