import { type Editor } from '@tiptap/react'
import { ButtonProps } from '../../../tiptap-ui-primitive/button/lib/types'

export type ListType = 'bulletList' | 'orderedList' | 'taskList'

export interface ListDropdownMenuProps extends Omit<ButtonProps, 'type'> {
  editor?: Editor
  types?: ListType[]
}
