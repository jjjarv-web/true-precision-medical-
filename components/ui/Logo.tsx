import Image, { type ImageProps } from 'next/image'

export type LogoVariant = 'light' | 'dark'

type LogoProps = Omit<ImageProps, 'src' | 'alt'> & {
  variant?: LogoVariant
  alt?: string
}

const LOGO_SRC = '/logo/true-precision-medical-logo.svg'

export default function Logo({
  variant = 'light',
  alt = 'True Precision Medical',
  className,
  ...props
}: LogoProps) {
  const variantClass = variant === 'dark' ? 'brightness-0 saturate-100' : ''
  const mergedClassName = [className, variantClass].filter(Boolean).join(' ')

  return <Image src={LOGO_SRC} alt={alt} className={mergedClassName} {...props} />
}
