import { DateTimeSearchOptions } from './constants'

export interface DateTimeSearchProps {
  className?: string
  items?: DateTimeSearchOptions[]
  defaultValue?: Value
  onValueChange?: (value: Value) => void
}

export type Value = {
  key: DateTimeSearchOptions
  value?: Date[]
}
