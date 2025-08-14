import type { CalendarProps as ReactCalendarProps } from 'react-calendar'
import type { ClassValue } from 'clsx'
import type { Dispatch, SetStateAction } from 'react'
import { UI } from '../constants'

export type CalendarProps = Omit<ReactCalendarProps, 'defaultValue' | 'value' | 'selectRange'> & {
  showOutsideDays?: boolean
  classNames?: ClassNames
} & Mode

export function isSingleMode(props: CalendarProps): props is SingleMode {
  return props.mode === 'single'
}

export function isMultipleMode(props: CalendarProps): props is MultipleMode {
  return props.mode === 'multiple'
}

export function isRangeMode(props: CalendarProps): props is RangeMode {
  return props.mode === 'range'
}

export type Mode = SingleMode | MultipleMode | RangeMode
export type State = SingleModeState | MultipleModeState | RangeModeState

export type SingleMode = {
  mode: 'single'
  selected?: Date | null
  onSelect?: (value: Exclude<SingleMode['selected'], undefined>) => void
}

export type SingleModeState = {
  mode: 'single'
  state: [
    Exclude<SingleMode['selected'], undefined>,
    Dispatch<SetStateAction<Exclude<SingleMode['selected'], undefined>>>
  ]
}

export type MultipleMode = {
  mode: 'multiple'
  selected?: Date[] | null
  onSelect?: (value: Exclude<MultipleMode['selected'], undefined>) => void
}

export type MultipleModeState = {
  mode: 'multiple'
  state: [
    Exclude<MultipleMode['selected'], undefined>,
    Dispatch<SetStateAction<Exclude<MultipleMode['selected'], undefined>>>
  ]
}

export type RangeMode = {
  mode: 'range'
  selected?: [Date, Date | null] | null
  onSelect?: (value: Exclude<RangeMode['selected'], undefined>) => void
}

export type RangeModeState = {
  mode: 'range'
  state: [
    Exclude<MultipleMode['selected'], undefined>,
    Dispatch<SetStateAction<Exclude<MultipleMode['selected'], undefined>>>
  ]
}

export type ClassNames = {
  [key in UI | string]: ClassValue
}
