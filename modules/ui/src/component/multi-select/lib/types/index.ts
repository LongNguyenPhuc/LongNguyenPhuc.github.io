// Core
import type {
  DropdownMenuContentProps,
  DropdownMenuProps,
  DropdownMenuTriggerProps
} from '@radix-ui/react-dropdown-menu'

// App
import type { SelectOption } from '@lib-ui/types'

// Types
export type MultiSelectProps = Omit<React.ComponentPropsWithRef<'button'>, 'value'> & {
  /**
   * An array of option objects or grouped objects to be displayed in the multi-select component.
   * - Basic option: Each option object has a label, value, and an optional icon.
   * - Grouped option: Each grouped option object has groupLabel, and options array containing basic options
   */
  options: Array<SelectOptionProps> | Array<GroupedSelectOptions>

  /** The selected values. */
  value: Array<SelectOption['value']>

  /**
   * Placeholder text to be displayed when no values are selected.
   * Optional, defaults to "Select options".
   */
  placeholder?: string

  /**
   * The className for the badge multi select
   */
  valueClassName?: string

  /**
   * Maximum number of items to display. Extra selected items will be summarized.
   * Optional, defaults to 3.
   */
  maxCount?: number

  /**
   * Optional, can be used to add custom popover props.
   */
  dropdownProps?: DropdownMenuProps
  dropdownTriggerProps?: Omit<DropdownMenuTriggerProps, 'className'>
  dropdownContentProps?: DropdownMenuContentProps

  /**
   * Callback function triggered when the selected values change.
   * Receives an array of the new selected values.
   */
  onValueChange: (value: Array<SelectOption['value']>) => void
}

export type SelectOptionProps = SelectOption & {
  /** Optional icon component to display alongside the option. */
  icon?: React.ComponentType<{ className?: string }>
}

export type GroupedSelectOptions = { groupLabel: string; options: SelectOptionProps[] }

export function isOptionsGrouped(options: MultiSelectProps['options']): options is Array<GroupedSelectOptions> {
  return (options as Array<GroupedSelectOptions>)?.[0]?.groupLabel !== undefined
}
