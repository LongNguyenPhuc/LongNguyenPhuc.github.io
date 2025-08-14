import type { ImageSizeType } from './_types'

export const imageSizes: ImageSizeType[] = [
  { deviceType: 'desktop', maxWidth: null, minWidth: 1280 },
  { deviceType: 'tablet', maxWidth: 1280, minWidth: 640 },
  { deviceType: 'mobile', maxWidth: 640, minWidth: 0 }
]
