// Core
import { PopoverContentProps, PopoverProps, PopoverTriggerProps } from '@radix-ui/react-popover'

// App
import { ButtonProps } from '@lib-ui/base/button'
import { SelectOption } from '@lib-ui/types'

// Types
export interface ComboboxProps {
  options: Array<
    SelectOption & {
      icon?: React.ComponentType<{ className?: string }>
    }
  >
  value: string | null | undefined
  placeholder?: string
  popoverProps?: PopoverProps
  popoverTriggerProps?: PopoverTriggerProps
  popoverContentProps?: PopoverContentProps
  buttonTriggerProps?: ButtonProps
  onValueChange: (value: SelectOption['value'] | null | undefined) => void
}
