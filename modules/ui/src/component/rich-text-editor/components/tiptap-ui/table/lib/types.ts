import { Editor } from '@tiptap/react'
import type { ButtonProps } from '../../../tiptap-ui-primitive/button/lib/types'

export interface TableEditorProps extends Omit<ButtonProps, 'type'> {
  editor?: Editor | null
}
