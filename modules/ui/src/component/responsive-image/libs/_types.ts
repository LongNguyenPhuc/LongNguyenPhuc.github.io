import { DetailedHTMLProps, SourceHTMLAttributes } from 'react'

export type ResponsiveImageProps = {
  src: string
  alt?: string
  type?: 'contain' | 'cover'
  classNames?: {
    container?: string
    picture?: string
    img?: string
  }
  disableErrorHandling?: boolean
} & Omit<
  DetailedHTMLProps<SourceHTMLAttributes<HTMLImageElement>, HTMLImageElement>,
  'className' | 'onLoad' | 'src' | 'aria-hidden'
>

export type ImageSrcSets = { link: string; maxWidth: number | undefined | null }[]
export type ImageSizeType = {
  deviceType: 'desktop' | 'tablet' | 'mobile'
  maxWidth: number | null
  minWidth: number
}
export type ImageSourceAttributesType = {
  srcSet: string
  media?: string
}
