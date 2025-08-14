import { ButtonProps } from '../../../tiptap-ui-primitive/button/lib/types'
import { type Editor } from '@tiptap/react'

export interface FontSizeOption {
  name: string
  value: string
}

export interface FontSizeDropdownMenuProps extends Omit<ButtonProps, 'type'> {
  editor?: Editor | null
  sizes?: FontSizeOption[]
}
