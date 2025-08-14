import { type Editor } from '@tiptap/react'
import { ButtonProps } from '../../../tiptap-ui-primitive/button/lib/types'

export interface TextColorOption {
  label: string
  value: string
}

export interface TextColorPopoverProps extends Omit<ButtonProps, 'type'> {
  /** The TipTap editor instance. */
  editor?: Editor | null
  /** The text colors to display in the popover. */
  colors?: TextColorOption[]
  /** Whether to hide the text color popover when unavailable. */
  hideWhenUnavailable?: boolean
}
