'use client'
import { Button, buttonVariants, Calendar, Popover, PopoverContent, PopoverTrigger, RangeMode } from '@lib-ui/base'
import { cn } from '@utils/cn'
import { CalendarIcon, X } from 'lucide-react'
import { addMonths, format, startOfMonth, subMonths } from 'date-fns'
import { useState, useMemo, Fragment, useCallback } from 'react'
import { CalendarProps, UI } from '@lib-ui/base/calendar/lib'
import { OnArgs } from 'react-calendar'
import { RangePickerProps } from './libs/types'
import { useComponentState } from '@lib-ui/types'

export type { RangePickerProps }
export function RangePicker(props: RangePickerProps) {
  const {
    className,
    dateFormat = 'dd/MM/yyyy',
    placeholder = ['Từ ngày', 'Đến ngày'],
    triggerProps,
    calendarProps
  } = props
  const [value, setValue] = useComponentState(props)
  const [open, setOpen] = useState(false)

  const triggerClassName = useMemo(
    () =>
      cn(
        buttonVariants({ variant: 'outline' }),
        'w-full pl-3 text-left font-normal',
        !value && 'text-muted-foreground',
        className
      ),
    [value, className]
  )

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className={triggerClassName} {...triggerProps}>
          <div className='flex flex-auto'>
            <DisplayValues value={value} placeholder={placeholder} dateFormat={dateFormat} />
          </div>

          <div className='ml-auto flex items-center gap-1'>
            <Button
              variant={'ghost'}
              className={cn('text-muted-foreground h-4 w-4 p-0.5', !value && 'hidden')}
              onClick={() => setValue(null)}
            >
              <X />
            </Button>
            <CalendarIcon className='h-4 w-4 opacity-50' />
          </div>
        </div>
      </PopoverTrigger>

      <PopoverCalendar
        className={cn(
          'flex max-w-170 gap-1 p-0',
          triggerClassName.split(' ').filter((val) => val.includes('w-'))
        )}
        value={value}
        setValue={setValue}
        defaultValue={value}
        calendarProps={calendarProps}
      />
    </Popover>
  )
}

function DisplayValues(props: { value: RangeMode['selected']; placeholder: [string, string]; dateFormat: string }) {
  const { value, placeholder, dateFormat } = props
  const displayValues = useMemo(() => {
    if (!value) return placeholder

    const [from, to] = value as [Date, Date | null]

    return [format(from, dateFormat), to ? format(to, dateFormat) : placeholder[1]]
  }, [value, placeholder, dateFormat])

  return (
    <Fragment>
      <button className='flex-1 cursor-pointer p-0 text-left'>{displayValues[0]}</button>
      <button className='flex-1 cursor-pointer p-0 text-left'>{displayValues[1]}</button>
    </Fragment>
  )
}

function PopoverCalendar(props: {
  className?: string
  defaultValue: RangeMode['selected']
  value: RangeMode['selected']
  calendarProps?: Omit<CalendarProps, 'mode' | 'selected' | 'onSelect'>
  setValue: RangeMode['onSelect']
}) {
  const { className, defaultValue, calendarProps, value, setValue } = props

  const [popoverWidth, setPopoverWidth] = useState(0)
  const [activeStartDate, setActiveStartDate] = useState(startOfMonth(defaultValue?.[0] ?? new Date()))

  const calendarPopoverRef = useCallback((node: HTMLDivElement) => {
    if (!node) return
    const resizeObserver = new ResizeObserver(() => setPopoverWidth(node.clientWidth))
    resizeObserver.observe(node)
  }, [])

  const onActiveStartDateChange = useCallback(
    ({ activeStartDate }: OnArgs) => setActiveStartDate(startOfMonth(subMonths(activeStartDate ?? new Date(), 1))),
    []
  )

  return (
    <PopoverContent ref={calendarPopoverRef} className={className} align='start'>
      <Calendar
        {...calendarProps}
        mode={'range'}
        selected={value}
        onSelect={setValue}
        // Special states for when secondary calendar appears
        {...(popoverWidth >= 600 && {
          classNames: { [UI.NextButton]: '!hidden' },
          activeStartDate,
          onActiveStartDateChange
        })}
      />

      {/* Secondary calendar, only visible on width > 600px or 37.5rem */}
      <Calendar
        {...calendarProps}
        className={cn(popoverWidth < 600 && 'hidden')}
        mode={'range'}
        selected={value}
        onSelect={setValue}
        classNames={{ [UI.PreviousButton]: 'hidden' }}
        activeStartDate={addMonths(activeStartDate, 1)}
        onActiveStartDateChange={onActiveStartDateChange}
      />
    </PopoverContent>
  )
}
