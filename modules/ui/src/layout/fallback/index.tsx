// Core
import { FC } from 'react'
import { LoaderCircle } from 'lucide-react'

// App
import { cn } from '@utils/cn'

// Internal
import { type FallbackProps } from './lib'

// Component
export const Fallback: FC<FallbackProps> = (props) => {
  // Props
  const { className } = props

  // Template
  return (
    <div className={cn('flex items-center justify-center', className)}>
      <div className='relative w-fit'>
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
          <img src={props.logo ?? '/logo.webp'} alt='Logo' className='h-8 w-8' />
        </div>
        <LoaderCircle className='text-primary size-20 animate-spin' />
      </div>
    </div>
  )
}

export * from './lib'
