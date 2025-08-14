import { type Editor } from '@tiptap/react'
import { ButtonProps } from '../../../tiptap-ui-primitive/button/lib/types'

export interface LinkHandlerProps {
  editor: Editor | null
  onSetLink?: () => void
  onLinkActive?: () => void
}

export interface LinkMainProps {
  url: string
  setUrl: React.Dispatch<React.SetStateAction<string>>
  setLink: () => void
  removeLink: () => void
  isActive: boolean
}

export const COMMON_BUTTON_PROPS = {
  type: 'button' as const,
  'data-style': 'ghost',
  role: 'button',
  tabIndex: -1
}

export interface LinkPopoverProps extends Omit<ButtonProps, 'type'> {
  editor?: Editor | null
  hideWhenUnavailable?: boolean
  onOpenChange?: (isOpen: boolean) => void
  autoOpenOnLinkActive?: boolean
}
