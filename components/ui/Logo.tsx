import Image, { type ImageProps } from 'next/image'

export type LogoVariant = 'light' | 'dark'

type LogoProps = Omit<ImageProps, 'src' | 'alt'> & {
  variant?: LogoVariant
  alt?: string
}

// light = white logo for dark backgrounds; dark = dark-ink logo for light backgrounds
const LOGO_SRCS: Record<LogoVariant, string> = {
  light: '/logo/true-precision-medical-dark-bg@2x.png',
  dark: '/logo/true-precision-medical-light-bg@2x.png',
}

export default function Logo({
  variant = 'light',
  alt = 'True Precision Medical',
  className,
  ...props
}: LogoProps) {
  return <Image src={LOGO_SRCS[variant]} alt={alt} className={className} {...props} />
}
