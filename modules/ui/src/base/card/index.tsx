import { ComponentPropsWithRef } from 'react'

import { cn } from '@utils/cn'

const Card = ({ ref, className, ...props }: ComponentPropsWithRef<'div'>) => (
  <div ref={ref} className={cn('bg-card text-card-foreground rounded-xl border shadow-sm', className)} {...props} />
)

const CardHeader = ({ ref, className, ...props }: ComponentPropsWithRef<'div'>) => (
  <div ref={ref} className={cn('flex flex-col space-y-1.5 p-6', className)} {...props} />
)

const CardTitle = ({ ref, className, ...props }: ComponentPropsWithRef<'div'>) => (
  <div ref={ref} className={cn('leading-none font-semibold tracking-tight', className)} {...props} />
)

const CardDescription = ({ ref, className, ...props }: ComponentPropsWithRef<'div'>) => (
  <div ref={ref} className={cn('text-muted-foreground text-sm', className)} {...props} />
)

const CardContent = ({ ref, className, ...props }: ComponentPropsWithRef<'div'>) => (
  <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
)

const CardFooter = ({ ref, className, ...props }: ComponentPropsWithRef<'div'>) => (
  <div ref={ref} className={cn('flex items-center p-6 pt-0', className)} {...props} />
)

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
