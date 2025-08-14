import { type Editor } from '@tiptap/react'
import { ButtonProps } from '../../../tiptap-ui-primitive/button/lib/types'

export type Level = 1 | 2 | 3 | 4 | 5 | 6

export interface HeadingDropdownMenuProps extends Omit<ButtonProps, 'type'> {
  editor?: Editor | null
  levels?: Level[]
}
