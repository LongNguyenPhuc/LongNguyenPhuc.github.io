'use client'

import { ComponentPropsWithRef } from 'react'
import { Root, Image, Fallback } from '@radix-ui/react-avatar'

import { cn } from '@utils/cn'

const Avatar = ({ ref, className, ...props }: ComponentPropsWithRef<typeof Root>) => (
  <Root
    ref={ref}
    className={cn('relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full', className)}
    {...props}
  />
)

const AvatarImage = ({ ref, className, ...props }: ComponentPropsWithRef<typeof Image>) => (
  <Image ref={ref} className={cn('aspect-square h-full w-full', className)} {...props} />
)

const AvatarFallback = ({ ref, className, ...props }: ComponentPropsWithRef<typeof Fallback>) => (
  <Fallback
    ref={ref}
    className={cn('bg-muted flex h-full w-full items-center justify-center rounded-full', className)}
    {...props}
  />
)

export { Avatar, AvatarImage, AvatarFallback }
