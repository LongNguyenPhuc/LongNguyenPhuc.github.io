import { Dispatch, SetStateAction, useState } from 'react'

export type State<T = unknown> = UncontrolledState<T> | ControlledState<T>

export type UncontrolledState<T = unknown> = {
  defaultValue: T
}

export type ControlledState<T = unknown> = {
  value: T
  onValueChange: (value: T) => void
}

export function isPropsControlled<T = unknown>(props: State<T>): props is ControlledState<T> {
  return (props as ControlledState<T>).onValueChange !== undefined
}

export function useComponentState<T = unknown>(props: State<T>) {
  const [uncontrolledValue, setUncontrolledValue] = useState<T | null>(
    (props as UncontrolledState<T>).defaultValue ?? null
  )

  return (
    isPropsControlled(props) ? [props.value, props.onValueChange] : [uncontrolledValue, setUncontrolledValue]
  ) as [T, Dispatch<SetStateAction<T>>]
}
