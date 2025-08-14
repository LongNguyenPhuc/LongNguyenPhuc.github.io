import type { DatePickerProps } from './lib'
import type { Mode } from '@lib-ui/base/calendar/lib'
// Core
import { format } from 'date-fns'
import { CalendarIcon } from '@radix-ui/react-icons'

// App
import { cn } from '@utils/cn'
import { buttonVariants } from '@lib-ui/base/button'
import { Calendar } from '@lib-ui/base/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@lib-ui/base/popover'

// Internal
import { useMemo, useState } from 'react'
import { useComponentState } from '@lib-ui/types'

// Component
export function DatePicker(props: DatePickerProps) {
  // Props
  const {
    className,
    mode = 'single',
    dateFormat = 'dd/MM/yyyy',
    placeholder = 'Chọn ngày',
    buttonProps,
    calendarProps
  } = props
  const [selected, onSelect] = useComponentState<Mode['selected']>(props)
  const [open, setOpen] = useState(false)

  const triggerClassName = useMemo(() => {
    return cn(
      buttonVariants({ variant: 'outline' }),
      'w-full pl-3 text-left font-normal',
      !selected && 'text-muted-foreground',
      className
    )
  }, [className, selected])

  const displayValue = useMemo(() => {
    if (!selected) return placeholder
    if (!Array.isArray(selected)) return format(selected, dateFormat)
    if (mode !== 'range')
      return selected
        .filter(Boolean)
        .map((date) => format(date as Date, dateFormat))
        .join(', ')
    const [from, to] = selected as [Date, Date | null]
    if (!to) return placeholder
    return `${format(from, dateFormat)} - ${format(to, dateFormat)}`
  }, [dateFormat, mode, placeholder, selected])

  const popoverClassname = useMemo(
    () =>
      cn(
        'w-[--radix-dropdown-trigger-width] p-0',
        triggerClassName.split(' ').filter((val) => val.includes('w-')) // trigger class width
      ),
    [triggerClassName]
  )

  const modeProps = useMemo(
    () =>
      ({
        mode,
        selected,
        onSelect:
          mode !== 'single'
            ? onSelect
            : (value: Mode['selected']) => {
                setOpen(false)
                onSelect(value)
              }
      }) as Mode,
    [mode, selected, onSelect]
  )

  // Template
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className={triggerClassName} {...buttonProps}>
        <span>{displayValue}</span>
        <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
      </PopoverTrigger>

      <PopoverContent className={popoverClassname} align='start'>
        <Calendar {...calendarProps} {...modeProps} />
      </PopoverContent>
    </Popover>
  )
}

export * from './lib'
