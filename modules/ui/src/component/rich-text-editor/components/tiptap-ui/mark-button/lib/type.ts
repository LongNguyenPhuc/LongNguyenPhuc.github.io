import { type Editor } from '@tiptap/react'
import { ButtonProps } from '../../../tiptap-ui-primitive/button/lib/types'

export type Mark = 'cut' | 'copy' | 'paste' | 'paintFormat'

export type MarkAttributes = Record<string, string | number | boolean | null>

export interface MarkButtonProps extends Omit<ButtonProps, 'type'> {
  type: Mark
  editor?: Editor | null
  text?: string
  hideWhenUnavailable?: boolean
}
