'use client'

import * as React from 'react'
import * as TabsPrimitive from '@radix-ui/react-tabs'

import { cn } from '@utils/cn'

const Tabs = TabsPrimitive.Root

const TabsList = ({ ref, className, ...props }: React.ComponentPropsWithRef<typeof TabsPrimitive.List>) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn('text-muted-foreground inline-flex h-9 items-center justify-center rounded-lg p-1', className)}
    {...props}
  />
)

const TabsTrigger = ({ ref, className, ...props }: React.ComponentPropsWithRef<typeof TabsPrimitive.Trigger>) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      'inline-flex cursor-pointer items-center justify-center whitespace-nowrap',
      'ring-offset-background px-3 py-1 text-sm font-medium transition-all',
      'focus-visible:ring-ring focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden',
      'hover:border-b-accent hover:text-accent-foreground hover:border-b-4',
      'disabled:pointer-events-none disabled:opacity-50',
      'data-[state=active]:border-b-primary data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:border-b-4',
      className
    )}
    {...props}
  />
)

const TabsContent = ({ ref, className, ...props }: React.ComponentPropsWithRef<typeof TabsPrimitive.Content>) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      'ring-offset-background focus-visible:ring-ring mt-2 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden',
      className
    )}
    {...props}
  />
)

export { Tabs, TabsList, TabsTrigger, TabsContent }
