import { type Editor } from '@tiptap/react'
import { ButtonProps } from '../../../tiptap-ui-primitive/button/lib/types'

export interface SpecialCharacterProps extends Omit<ButtonProps, 'type'> {
  editor?: Editor | null
}
