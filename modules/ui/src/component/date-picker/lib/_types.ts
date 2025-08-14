import type { ButtonProps } from '@lib-ui/base/button'
import type { CalendarProps } from '@lib-ui/base/calendar'
import type { Mode } from '@lib-ui/base/calendar/lib'
import type { State } from '@lib-ui/types'
import type { RefObject } from 'react'

// Types
export type DatePickerProps = {
  ref?: RefObject<HTMLButtonElement>
  className?: string
  dateFormat?: string
  placeholder?: string
  buttonProps?: Omit<ButtonProps, 'className'>
  calendarProps?: Omit<CalendarProps, 'mode' | 'selected' | 'onSelect'>
  mode?: Mode['mode']
} & State<Mode['selected']>
