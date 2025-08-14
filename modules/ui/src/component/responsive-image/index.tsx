'use client'
// eslint-disable-next-line @nx/enforce-module-boundaries
import links from '../../../../../libs/links/index'
// import links from '@links/index'
//================================================================
import { cn } from '@utils/cn'
import { ResponsiveImageProps, ImageSourceAttributesType, transformImageSrcToWebpFormat, imageSizes } from './libs'
import { useCallback, useMemo, useState } from 'react'
import { Skeleton } from '@lib-ui/base/skeleton'
import { cva } from 'class-variance-authority'
import { ImageOff } from 'lucide-react'

const imgClassName = cva('aria-hidden:hidden aria-hidden:w-0 aria-hidden:h-0', {
  variants: {
    variant: {
      contain: 'max-h-full object-contain object-center',
      cover: 'w-full h-full object-cover object-center'
    }
  },
  defaultVariants: { variant: 'contain' }
})

export function ResponsiveImage(props: ResponsiveImageProps) {
  const { src, classNames, type, alt, disableErrorHandling = false, ...imgProps } = props
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const [isImageError, setIsImageError] = useState(false)

  const isStaticImage = useMemo(() => !src.includes(links.imageEndpoint), [src])
  const placeholderImageSrcMemo = useMemo<string>(
    () => (!isStaticImage ? `url(${transformImageSrcToWebpFormat(src, 'preload')})` : src),
    [isStaticImage, src]
  )
  const imageSrcList = useMemo<ImageSourceAttributesType[]>(() => {
    if (isStaticImage) return []
    return imageSizes.map(({ deviceType, minWidth }) => ({
      srcSet: transformImageSrcToWebpFormat(src, deviceType),
      media: `(min-width: ${minWidth}px)`
    }))
  }, [isStaticImage, src])

  const onLoad = useCallback(
    (element: HTMLImageElement | null) => {
      if (!element?.complete) return
      setIsImageLoaded(true)
      if (disableErrorHandling) return
      fetch(element.src).then((res) => {
        // fetch has a redirected attribute to indicate redirection but server didn't indicate a 302 res.redirected
        if (!res.headers.get('content-type')?.includes('image')) setIsImageError(true)
      })
    },
    [disableErrorHandling]
  )

  return (
    <div className={cn('image-container', classNames?.container)}>
      <picture
        data-hidden={!isImageLoaded || isImageError}
        className={cn(
          'flex h-full w-full items-center justify-center',
          'data-[hidden=true]:h-0 data-[hidden=true]:w-0 data-[hidden=true]:[&>img]:hidden',
          classNames?.picture
        )}
      >
        {imageSrcList.map(({ srcSet, media }) => (
          <source key={srcSet + media} srcSet={srcSet} media={media} />
        ))}

        <img
          ref={onLoad}
          alt={alt || 'images'}
          src={src}
          className={cn(imgClassName({ variant: type }), classNames?.img)}
          onLoad={(e) => onLoad(e.currentTarget)}
          onError={() => {
            setIsImageLoaded(true)
            if (disableErrorHandling) return
            setIsImageError(true)
          }}
          {...imgProps}
        />
      </picture>

      {/* Placeholder */}
      <div
        className={cn('image-placeholder bg-cover bg-no-repeat', imgClassName({ variant: type }), classNames?.img)}
        aria-hidden={isImageLoaded}
        style={{ backgroundImage: placeholderImageSrcMemo }}
        children={<Skeleton className={cn(classNames?.picture, classNames?.img)} />}
      />

      <div
        aria-hidden={!isImageError}
        className={cn('image-error flex items-center justify-center', imgClassName({ variant: type }), classNames?.img)}
        children={<ImageOff className='text-primary h-1/2 w-1/2' />}
      />
    </div>
  )
}
