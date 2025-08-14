import { type Editor } from '@tiptap/react'
import { ButtonProps } from '../../../tiptap-ui-primitive/button/lib/types'

export interface LineHeightOption {
  name: string
  value: string
}

export interface LineHeightDropdownMenuProps extends Omit<ButtonProps, 'type'> {
  editor?: Editor | null
  lineHeights?: LineHeightOption[]
}
