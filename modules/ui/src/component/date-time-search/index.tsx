// Types
import type { DateTimeSearchProps, Value } from './lib/types'
// Components
import { Popover, PopoverTrigger, PopoverContent } from '@lib-ui/base/popover'
import { Dashboard } from './components/dashboard'
import { Fallback } from '@lib-ui/layout'
// Helpers
import { isOptionRequireCalendar, getDisplayValue } from './lib/props'
import { DateTimeSearchOptions, getLabelsByEnum, defaultOptions } from './lib/constants'
import { Suspense, useCallback, useState } from 'react'
import { cn } from '@utils/cn'
import { subDays } from 'date-fns'
import { Button, Label } from '@lib-ui/base'
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react'

export * from './lib/types'
export * from './lib/constants'
export function DateTimeSearch(props: DateTimeSearchProps) {
  const { className, items = defaultOptions, onValueChange, defaultValue } = props
  // Popover State
  const [open, setOpen] = useState(false)
  // Item States
  const [activeItem, setActiveItem] = useState(items[0])
  const [selectedItem, setSelectedItem] = useState<Value | undefined>(defaultValue)

  const onClickItem = useCallback(
    (key: DateTimeSearchOptions) => {
      if (isOptionRequireCalendar(key)) return
      switch (key) {
        default:
          break
        case DateTimeSearchOptions.ALL:
          setSelectedItem({ key, value: undefined })
          onValueChange?.({ key, value: undefined })
          break
        case DateTimeSearchOptions.TODAY:
        case DateTimeSearchOptions.YESTERDAY:
          setSelectedItem({ key, value: [key === DateTimeSearchOptions.TODAY ? new Date() : subDays(new Date(), 1)] })
          onValueChange?.({ key, value: [key === DateTimeSearchOptions.TODAY ? new Date() : subDays(new Date(), 1)] })
          break
        case DateTimeSearchOptions.SEVEN_DAYS_AGO:
        case DateTimeSearchOptions.THIRTY_DAYS_AGO:
          setSelectedItem({
            key,
            value: [subDays(new Date(), key === DateTimeSearchOptions.SEVEN_DAYS_AGO ? 7 : 30), new Date()]
          })
          onValueChange?.({
            key,
            value: [subDays(new Date(), key === DateTimeSearchOptions.SEVEN_DAYS_AGO ? 7 : 30), new Date()]
          })
          break
      }
      setOpen(false)
    },
    [onValueChange]
  )

  const DropdownIcon = useCallback(({ open, className }: { open: boolean; className?: string }) => {
    if (open) return <ChevronUpIcon className={className} />
    return <ChevronDownIcon className={className} />
  }, [])

  const onCalendarValueChange = useCallback(
    (value: Value) => {
      setSelectedItem(value)
      if (onValueChange) onValueChange(value)
    },
    [onValueChange]
  )

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          id='date-time-search-trigger'
          variant='outline'
          className={cn(
            `hover:border-primary w-[50dvw] justify-start hover:bg-transparent`,
            open && 'border-primary!',
            className,
            'relative'
          )}
        >
          <Label
            htmlFor='date-time-search-trigger'
            className={cn('bg-card absolute top-[-0.5rem] left-2 z-10', open && 'text-primary!')}
          >
            Thời gian
          </Label>
          <div className='flex w-full items-center justify-between font-normal'>
            {getDisplayValue(selectedItem)}
            <DropdownIcon open={open} />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className={cn(`w-[50dvw] p-0`, className)} asChild>
        <main className='grid grid-cols-3 text-sm'>
          {/* Items */}
          <section className='border-r-muted h-full border-r-2'>
            {items.map((key) => (
              <div
                key={key}
                onPointerEnter={() => setActiveItem(key)}
                onClick={() => onClickItem(key)}
                className={cn(
                  'text-muted-foreground cursor-pointer p-2',
                  activeItem === key && 'bg-muted text-accent-foreground',
                  selectedItem?.key === key && 'bg-primary/30! text-primary/60! font-bold'
                )}
              >
                {getLabelsByEnum(key)}
              </div>
            ))}
          </section>
          {/* Dashboard */}
          <section className='col-span-2'>
            <Suspense fallback={<Fallback />}>
              <Dashboard
                item={activeItem}
                isSelected={selectedItem?.key === activeItem}
                value={selectedItem}
                onCalendarValueChange={onCalendarValueChange}
              />
            </Suspense>
          </section>
        </main>
      </PopoverContent>
    </Popover>
  )
}
