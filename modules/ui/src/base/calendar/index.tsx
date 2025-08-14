'use client'
import type { CalendarProps, Mode, State, RangeMode, SingleMode, MultipleMode } from './lib/types'
import { Calendar as ReactCalendar } from 'react-calendar'
import { useGetManagedProps } from './lib/hooks'
import { useTranslation } from 'react-i18next'

export type { Mode as CalendarMode, State as CalendarState, CalendarProps, RangeMode, SingleMode, MultipleMode }
export default Calendar

export function Calendar(calendarProps: CalendarProps) {
  const { i18n } = useTranslation()
  const props = useGetManagedProps(calendarProps)

  return <ReactCalendar locale={i18n?.language ?? 'vi'} {...props} />
}
