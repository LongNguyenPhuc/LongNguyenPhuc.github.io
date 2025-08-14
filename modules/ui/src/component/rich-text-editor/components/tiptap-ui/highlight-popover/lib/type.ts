import { type Editor } from '@tiptap/react'
import { ButtonProps } from '../../../tiptap-ui-primitive/button/lib/types'

export interface HighlightColor {
  label: string
  value: string
  border?: string
}

export interface HighlightPopoverProps extends Omit<ButtonProps, 'type'> {
  editor?: Editor | null
  colors?: HighlightColor[]
}
