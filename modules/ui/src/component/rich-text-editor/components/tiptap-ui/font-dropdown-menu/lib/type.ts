import { ButtonProps } from '../../../tiptap-ui-primitive/button/lib/types'
import { type Editor } from '@tiptap/react'

export interface FontOption {
  name: string
  value: string
}

export interface FontDropdownMenuProps extends Omit<ButtonProps, 'type'> {
  editor?: Editor | null
  fonts?: FontOption[]
}
