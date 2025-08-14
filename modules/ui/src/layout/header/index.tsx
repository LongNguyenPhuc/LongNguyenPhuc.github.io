'use client'
import { useState, useEffect, useRef } from 'react'
import { FC, ReactNode } from 'react'
import { cn } from '@utils/cn'
import { cva } from 'class-variance-authority'
import { ClassValue } from 'clsx'
import { LogoComponent, LogoComponentProps } from '../logo-component'

export const headerVariants = cva('flex h-full items-center', {
  variants: {
    variant: {
      default: 'justify-between gap-2 p-2',
      admin: 'justify-between gap-2 p-2',
      auth: 'justify-between bg-background border-none mb-2'
    }
  },
  defaultVariants: {
    variant: 'default'
  }
})

export function Header(props: HeaderProps) {
  const { variant = 'default', className, logo, id, children, LogoWrapper } = props
  const [isScrolled, setIsScrolled] = useState(false)
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsScrolled(!entry.isIntersecting)
      },
      { threshold: 0 }
    )

    if (headerRef.current) {
      observer.observe(headerRef.current)
    }

    return () => {
      if (headerRef.current) {
        observer.unobserve(headerRef.current)
      }
    }
  }, [])

  return (
    <>
      <div ref={headerRef} className='invisible absolute h-[100px] w-full cursor-none' />
      <header
        id={id}
        // className={cn('header-base bg-primary', variant === 'admin' && 'header-sticky border-b', className)}
        className={cn(
          'header-base transition-all duration-300',
          isScrolled ? 'bg-primary shadow-md' : 'bg-transparent',
          variant === 'admin' && 'header-sticky border-b',
          className
        )}
      >
        <div className={cn(headerVariants({ variant }), 'container flex items-center justify-between')}>
          {/* Logo */}
          <LogoComponent variant={variant} logo={logo} LogoWrapper={LogoWrapper} />

          {/* self defined layout */}
          {children}
        </div>
      </header>
    </>
  )
}

export type HeaderProps = HeaderVariants &
  LogoComponentProps & {
    id?: string
    className?: ClassValue
    children?: ReactNode
  }

type HeaderVariants = DefaultVariant | AdminVariant | AuthVariant

type DefaultVariant = {
  variant: 'default'
}

type AdminVariant = {
  variant: 'admin'
}

type AuthVariant = {
  variant: 'auth'
}

export type Menu = {
  link: string
  Icon: FC<{ className?: string }>
  label: string
}
