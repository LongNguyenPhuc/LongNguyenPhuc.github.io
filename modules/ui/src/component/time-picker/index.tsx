import { buttonVariants } from '@lib-ui/base'
import { DigitalClock, DigitalClockProps } from '@lib-ui/base/clock'
import { Popover, PopoverTrigger, PopoverContent } from '@lib-ui/base/popover'
import { State, useComponentState } from '@lib-ui/types'
import { cn } from '@utils/cn'
import { ClassValue } from 'clsx'
import { parse } from 'date-fns'
import { Clock } from 'lucide-react'
import { useMemo, useState } from 'react'
import { format as formatTime } from 'date-fns'

export function TimePicker(props: TimePickerProps) {
  const { className, format, placeholder = 'Chọn thời gian', ...clockProps } = props

  const [value, setValue] = useComponentState(props)
  const [open, setOpen] = useState(false)

  const timeFormat = useMemo(() => {
    if (format) return format

    const is12hFormat = (() => {
      if (props.ampm !== undefined) return props.ampm
      const dateLocale = new Date().toLocaleTimeString().toUpperCase()
      return dateLocale.includes('AM') || dateLocale.includes('PM')
    })()

    return is12hFormat ? 'hh:mm:ss a' : 'HH:mm:ss'
  }, [props.ampm, format])

  const triggerClassName = useMemo(() => {
    return cn(
      buttonVariants({ variant: 'outline' }),
      'w-full pl-3 text-left font-normal',
      !value && 'text-muted-foreground',
      className
    )
  }, [className, value])

  return (
    <Popover open={open} onOpenChange={setOpen} modal>
      <PopoverTrigger className={triggerClassName}>
        <span>{value || placeholder}</span>

        <Clock className='ml-auto h-4 w-4 opacity-50' />
      </PopoverTrigger>

      <PopoverContent align='start' className='w-fit p-0'>
        <DigitalClock
          {...clockProps}
          value={value ? parse(value, timeFormat, new Date()) : null}
          onValueChange={(date) => setValue(date ? formatTime(date, timeFormat) : null)}
        />
      </PopoverContent>
    </Popover>
  )
}

export type TimePickerProps = {
  className?: ClassValue
  placeholder?: string
  /** References: https://date-fns.org/docs/format */
  format?: string
} & State<string | null> &
  Omit<DigitalClockProps, keyof State>
