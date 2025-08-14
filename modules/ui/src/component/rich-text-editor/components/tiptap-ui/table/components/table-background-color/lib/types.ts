import { type Editor } from '@tiptap/react'
import type { ButtonProps } from '../../../../../tiptap-ui-primitive/button/lib/types'

export interface TableBackgroundColor {
  label: string
  value: string
  border?: string
}

export interface TableBackgroundPopoverProps extends Omit<ButtonProps, 'type'> {
  /** The TipTap editor instance. */
  editor?: Editor | null
  /** The table background colors to display in the popover. */
  colors?: TableBackgroundColor[]
  /** Whether to hide the table background popover when unavailable. */
  hideWhenUnavailable?: boolean
}
