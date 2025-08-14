import type { Value } from '../lib/types'
import type { CalendarProps } from '@lib-ui/base/calendar'
import { cn } from '@utils/cn'
import { DateTimeSearchOptions } from '../lib/constants'
import {
  endOfWeek,
  format,
  startOfWeek,
  subDays,
  isAfter,
  isBefore,
  startOfMonth,
  startOfYear,
  endOfMonth,
  endOfYear,
  startOfDay,
  endOfDay
} from 'date-fns'
import { vi } from 'date-fns/locale'
import { isOptionRequireCalendar, isOptionsRange } from '../lib/props'
import { useEffect, useMemo, useState } from 'react'
import { Calendar } from '@lib-ui/base/calendar'

export function Dashboard(props: DashboardProps) {
  const { item } = props
  // Month or Year Dashboard
  if (item === DateTimeSearchOptions.BY_MONTH || item === DateTimeSearchOptions.BY_YEAR)
    return <DashboardCalendarMonthYear {...props} />
  // Content only Dashboard
  if (!isOptionRequireCalendar(item)) return <DashboardContentOnly {...props} />
  // Range Calendar Dashboard
  if (isOptionsRange(item)) return <DashboardCalendarRange {...props} />
  // Multiple Value Dasboard
  return <DashboardCalendarBase {...props} />
}

export type DashboardProps = {
  item: DateTimeSearchOptions
  isSelected: boolean
  dateFormat?: string
  value: Value | undefined
  onCalendarValueChange: (value: Value) => void
}

//======================================== CHILD COMPONENTS =======================================

function DashboardContentOnly(props: DashboardProps) {
  const { item, isSelected, dateFormat = 'dd/MM/yyyy' } = props
  return (
    <div className={cn('p-2', isSelected && 'text-primary font-bold')}>
      {getNonRequiredCalendarContent(item, dateFormat)}
    </div>
  )
}

function DashboardCalendarRange({ item, value, onCalendarValueChange }: DashboardProps) {
  const [dateRange, setDateRange] = useState<[Date, Date | null] | null>(value?.value as [Date, Date | null])

  const calendarProps = useMemo(() => {
    const props = {
      className: 'w-auto px-0 py-2',
      showWeekNumbers: item === DateTimeSearchOptions.BY_WEEK,
      selected: dateRange,
      mode: 'range'
    } as CalendarProps

    if (item !== DateTimeSearchOptions.BY_WEEK) props.onSelect = setDateRange
    else
      props.onChange = (value) => {
        if (value == null) return setDateRange(null)
        const day = value as Date
        if (dateRange && dateRange[1] && isAfter(day, dateRange[0]) && isBefore(day, dateRange[1]))
          return setDateRange(null) // Clear selection
        return setDateRange([startOfWeek(day, { locale: vi }), endOfWeek(day, { locale: vi })])
      }

    return props
  }, [dateRange, item])

  useEffect(() => {
    if (!dateRange) return
    const [from, to] = dateRange
    if (!(from && to)) return
    onCalendarValueChange({ key: item, value: [startOfDay(from), endOfDay(to)] })
  }, [dateRange, item, onCalendarValueChange])

  return <Calendar key={item} {...calendarProps} />
}

function DashboardCalendarMonthYear({ item, value, onCalendarValueChange }: DashboardProps) {
  const [selected, onSelect] = useState<Date | null>(value?.value?.[0] ?? null)

  useEffect(() => {
    if (selected == null) return
    const start = item === DateTimeSearchOptions.BY_MONTH ? startOfMonth(selected) : startOfYear(selected)
    const end = item === DateTimeSearchOptions.BY_MONTH ? endOfMonth(selected) : endOfYear(selected)
    return onCalendarValueChange({ key: item, value: [start, end] })
  }, [item, onCalendarValueChange, selected])

  return (
    <Calendar
      mode='single'
      key={item}
      selected={selected}
      onSelect={onSelect}
      view={item === DateTimeSearchOptions.BY_MONTH ? 'year' : 'decade'}
    />
  )
}

function DashboardCalendarBase({ item, value, onCalendarValueChange }: DashboardProps) {
  const [selected, onSelect] = useState<Date | null>(value?.value?.[0] ?? null)

  useEffect(() => {
    if (selected == null) return
    return onCalendarValueChange({ key: item, value: [selected] })
  }, [item, onCalendarValueChange, selected])

  return <Calendar key={item} className='px-0 py-2' mode='single' selected={selected} onSelect={onSelect} />
}

//======================================== HELPER FUNCTIONS =======================================

function getNonRequiredCalendarContent(item: DateTimeSearchOptions, dateFormat: string) {
  if (isOptionRequireCalendar(item)) throw new Error('This option requires a calendar')
  if (item === DateTimeSearchOptions.ALL) return 'Tất cả'

  const date = new Date()
  if (item === DateTimeSearchOptions.TODAY) return format(date, dateFormat)
  if (item === DateTimeSearchOptions.YESTERDAY) return format(subDays(date, 1), dateFormat)
  return `${format(subDays(date, item === DateTimeSearchOptions.SEVEN_DAYS_AGO ? 7 : 30), dateFormat)} - ${format(date, dateFormat)}`
}
