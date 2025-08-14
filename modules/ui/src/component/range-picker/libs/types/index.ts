import type { CalendarProps, RangeMode } from '@lib-ui/base/calendar'
import { State } from '@lib-ui/types'
import type { ComponentPropsWithRef } from 'react'

// Types
export type RangePickerProps = {
  className?: string
  dateFormat?: string
  placeholder?: [string, string]
  triggerProps?: Omit<ComponentPropsWithRef<'div'>, 'className'>
  calendarProps?: Omit<CalendarProps, 'mode' | 'selected' | 'onSelect'>
} & State<RangeMode['selected']>
