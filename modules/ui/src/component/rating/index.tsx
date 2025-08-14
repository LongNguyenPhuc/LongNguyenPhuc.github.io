'use client'
import { cn } from '@utils/cn'
import { uniqueId } from 'lodash-es'
import { Star, StarHalf } from 'lucide-react'
import { useEffect, useState } from 'react'

export default Rating
export function Rating(props: RatingProps) {
  const { containerClassName, className, readonly, value: controlledValue, onChange } = props

  const [value, setValue] = useState(Math.round(controlledValue ?? 0 * 2) / 2)

  useEffect(() => onChange?.(value), [value, onChange])

  return (
    <div className={cn('relative', containerClassName)}>
      {/* Base */}
      <div className='flex gap-1'>
        {Array.from({ length: 5 }, (_, i) => (
          <Star
            key={uniqueId()}
            className={cn('text-muted h-4 w-4', !readonly && 'cursor-pointer', className)}
            onClick={() => !readonly && setValue(i + 1)}
          />
        ))}
      </div>
      {/* Filled */}
      <div className='absolute top-0 flex gap-1'>
        {Array.from({ length: Math.ceil(value) }, (_, i) => {
          const Icon = value - i >= 1 ? Star : StarHalf
          return (
            <Icon
              key={i}
              className={cn('h-4 w-4 fill-yellow-400 text-yellow-400', !readonly && 'cursor-pointer', className)}
              onClick={() => !readonly && setValue((prev) => (prev === i + 1 ? prev - 1 : i + 1))}
            />
          )
        })}
      </div>
    </div>
  )
}
// value >= i - 1 && 'fill-yellow-400 text-yellow-400',

export type RatingProps = {
  containerClassName?: string
  className?: string
  value?: number
  readonly?: boolean
  onChange?: (value: number) => void
}
