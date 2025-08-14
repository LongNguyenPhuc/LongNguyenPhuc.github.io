import type { ImageSrcSets, ImageSizeType } from './_types'
import { imageSizes } from './_constants'

export function transformImageSrcToWebpFormat(
  imageSrc: string,
  deviceType: ImageSizeType['deviceType'] | 'preload' | 'preview'
) {
  const imageSrcSplit = imageSrc.split('.')
  const imageSrcSplitLength = imageSrcSplit?.length

  imageSrcSplit[imageSrcSplitLength - 2] += `_${deviceType}`
  imageSrcSplit[imageSrcSplitLength - 1] = 'webp'

  return imageSrcSplit.join('.')
}

export function getImageSrcSets(src: string): ImageSrcSets {
  const // Split string
    splitSrc = src.split('.'),
    cloneSplit = [...splitSrc],
    length = splitSrc?.length

  cloneSplit[length - 2] += `_preload`
  cloneSplit[length - 1] = 'webp'
  return [
    { link: cloneSplit.join('.'), maxWidth: undefined },
    ...imageSizes.map(({ deviceType, maxWidth }) => {
      const result = [...splitSrc]
      result[length - 2] += `_${deviceType}`
      result[length - 1] = 'webp'

      return {
        link: result.join('.'),
        maxWidth
      }
    })
  ]
}
