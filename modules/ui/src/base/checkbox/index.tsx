'use client'

import type { ComponentPropsWithRef } from 'react'
import { Root, Indicator } from '@radix-ui/react-checkbox'
import { Check } from 'lucide-react'

import { cn } from '@utils/cn'

const Checkbox = ({ className, ...props }: ComponentPropsWithRef<typeof Root>) => (
  <Root
    className={cn(
      'peer border-primary focus-visible:ring-ring data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground h-4 w-4 shrink-0 cursor-pointer rounded-sm border shadow-sm focus-visible:ring-1 focus-visible:outline-hidden disabled:cursor-not-allowed disabled:opacity-50',
      className
    )}
    {...props}
  >
    <Indicator className={cn('flex items-center justify-center text-current')}>
      <Check className='h-4 w-4' />
    </Indicator>
  </Root>
)

export { Checkbox }
