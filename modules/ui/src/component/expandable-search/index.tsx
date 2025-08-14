'use client'
import { useComponentState, type State } from '@lib-ui/types'
import { Button } from '@lib-ui/base'
import { cn } from '@utils/cn'

import { Search } from 'lucide-react'
import { useState } from 'react'

export type ExpandableSearchProps = {
  className?: {
    container?: string
    expandButton?: string
    input?: string
  }
  placeholder?: string
} & State<string>
// Guard

export function ExpandableSearch(props: ExpandableSearchProps) {
  const { className, placeholder } = props

  const [value, setValue] = useComponentState(props)
  const [isExpand, setIsExpand] = useState(value?.length > 0)

  return (
    <div
      aria-hidden={!isExpand}
      className={cn(
        'focus-within:border-secondary flex w-fit items-center gap-2 rounded-md border transition-all duration-200 ease-in-out aria-hidden:gap-0',
        className?.container
      )}
    >
      <Button className={className?.expandButton} disabled={isExpand} variant='ghost' onClick={() => setIsExpand(true)}>
        <Search className='text-muted-foreground h-4 w-4' />
      </Button>
      <input
        ref={(element: HTMLInputElement | null) => {
          if (isExpand) element?.focus()
        }}
        aria-hidden={!isExpand}
        value={value}
        placeholder={placeholder ?? 'Search'}
        onBlur={() => {
          if (value?.length > 0) return
          setIsExpand(false)
        }}
        onChange={(e) => setValue(e.target.value)}
        className={cn(
          'placeholder:text-muted-foreground w-full border-none focus-visible:outline-hidden aria-hidden:w-0',
          className?.input
        )}
      />
    </div>
  )
}
