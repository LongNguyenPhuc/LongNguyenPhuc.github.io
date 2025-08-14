'use client'
import { Fallback } from '@lib-ui/layout'
import { ComponentPropsWithoutRef, useCallback, useEffect, useRef, useState } from 'react'

export function ScrollLoadWrapper({ className, children, ...rest }: ComponentPropsWithoutRef<'div'>) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const handleScroll = useCallback((element: HTMLDivElement | null) => {
    if (!element || typeof window === 'undefined') return
    const elementTop = element.getBoundingClientRect().top
    const elementHeight = element.offsetHeight
    const windowScroll = window.innerHeight + window.pageYOffset

    if (windowScroll > elementTop + elementHeight / 2) setIsVisible(true)

    return
  }, [])

  useEffect(() => handleScroll(ref.current), [handleScroll])
  useEffect(() => {
    const scrollEventHandler = (_e: Event) => handleScroll(ref.current)
    if (!isVisible) window.addEventListener('scroll', scrollEventHandler)
    return () => window.removeEventListener('scroll', scrollEventHandler)
  }, [handleScroll, isVisible])

  return (
    <div ref={ref} className={className} {...rest}>
      {isVisible ? children : <Fallback className='h-20 py-12' />}
    </div>
  )
}
