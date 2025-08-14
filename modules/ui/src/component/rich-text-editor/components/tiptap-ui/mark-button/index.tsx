// Core
import * as React from 'react'
import { type Editor } from '@tiptap/react'
import { useTranslation } from 'react-i18next'
// Icons
import { Scissors, Copy, Clipboard, Paintbrush } from 'lucide-react'
// Internal
import { useTiptapEditor } from '../../../hooks/use-tiptap-editor'
import { Button } from '../../../components/tiptap-ui-primitive'
import { Mark, MarkAttributes, MarkButtonProps } from './lib/type'
import { FORMAT_COPIED_EVENT, MARK_NAMES, NON_ACTIVE_TYPES } from './lib/constants'

// Icons for each mark type
export const markIcons = {
  cut: Scissors,
  copy: Copy,
  paste: Clipboard,
  paintFormat: Paintbrush
}

// Keyboard shortcuts for marks
export const markShortcutKeys: Partial<Record<Mark, string>> = {
  cut: 'Ctrl-x',
  copy: 'Ctrl-c',
  paste: 'Ctrl-v',
  paintFormat: 'Ctrl-Shift-c'
}

let copiedFormats: Record<string, MarkAttributes> = {}
// Flag to track if format has been copied for paintFormat
let hasFormatCopied = false

export function canToggleMark(editor: Editor | null, type: Mark): boolean {
  if (!editor) return false

  // Special handling for selection-dependent actions
  if (type === 'cut' || type === 'copy') {
    return !editor.state.selection.empty
  }

  // Paint format is available when formats have been copied
  if (type === 'paintFormat') {
    return !editor.state.selection.empty || hasFormatCopied
  }

  // Always allow paste
  if (type === 'paste') {
    return true
  }

  try {
    return editor.can().toggleMark(type)
  } catch {
    return false
  }
}

/**
 * Check if a mark is currently active
 */
export function isMarkActive(editor: Editor | null, type: Mark): boolean {
  if (!editor) return false

  // These functions don't have active states
  if (NON_ACTIVE_TYPES.includes(type)) {
    // Special case for paintFormat - show as active when format has been copied
    if (type === 'paintFormat') {
      return hasFormatCopied
    }
    return false
  }

  return editor.isActive(type)
}

/**
 * Notify about format state changes
 */
function notifyFormatStateChange() {
  // Use a custom event to notify about format state changes
  const event = new CustomEvent(FORMAT_COPIED_EVENT, { detail: { hasFormatCopied } })
  document.dispatchEvent(event)
}

/**
 * Toggle a mark or perform the corresponding action
 */
export function toggleMark(editor: Editor | null, type: Mark): void {
  if (!editor) return

  // Special cases for each mark type
  switch (type) {
    case 'cut': {
      const selectedText = editor.state.doc.textBetween(editor.state.selection.from, editor.state.selection.to, ' ')
      navigator.clipboard
        .writeText(selectedText)
        .then(() => {
          editor.chain().focus().deleteSelection().run()
        })
        .catch((err) => {
          console.error('Cannot cut text: ', err)
        })
      return
    }

    case 'copy': {
      const selectedText = editor.state.doc.textBetween(editor.state.selection.from, editor.state.selection.to, ' ')
      navigator.clipboard
        .writeText(selectedText)
        .then(() => {
          // save marks to copiedFormats
          const marks = editor.state.selection.$from.marks()
          copiedFormats = {}
          marks.forEach((mark) => {
            copiedFormats[mark.type.name] = mark.attrs
          })
        })
        .catch((err) => {
          console.error('Cannot copy text: ', err)
        })
      return
    }

    case 'paste':
      navigator.clipboard
        .readText()
        .then((text) => {
          if (text) {
            editor.chain().focus().insertContent(text).run()
          }
        })
        .catch((err) => {
          console.error('Cannot paste text: ', err)
        })
      return

    case 'paintFormat':
      if (hasFormatCopied && Object.keys(copiedFormats)?.length > 0) {
        // Apply copied formats to selection
        const chain = editor.chain().focus()

        // If no selection, do nothing
        if (editor.state.selection.empty) {
          return
        }

        Object.entries(copiedFormats).forEach(([markName]) => {
          try {
            // Only process if mark exists in schema
            if (editor.schema.marks[markName]) {
              // Remove existing mark if any
              chain.unsetMark(markName)
              // Apply new mark with copied attributes
            }
          } catch (error) {
            console.error(`Cannot apply mark '${markName}':`, error)
          }
        })

        // Execute changes
        chain.run()

        // Reset format copying state
        hasFormatCopied = false
        notifyFormatStateChange()
      } else if (!editor.state.selection.empty) {
        // Copy formats from current selection
        const marks = editor.state.selection.$from.marks()

        // Ensure only marks that exist in schema are copied
        copiedFormats = {}
        marks.forEach((mark) => {
          if (editor.schema.marks[mark.type.name]) {
            copiedFormats[mark.type.name] = mark.attrs
          }
        })

        // Only enable format copying mode if there are actual formats to copy
        if (Object.keys(copiedFormats)?.length > 0) {
          hasFormatCopied = true
          notifyFormatStateChange()
        }
      }
      return

    default:
      // Default case for regular marks
      editor.chain().focus().toggleMark(type).run()
  }
}

/**
 * Determine if a mark button should be disabled
 */
export function isMarkButtonDisabled(editor: Editor | null, type: Mark, userDisabled = false): boolean {
  if (!editor || userDisabled) return true

  // Selection-dependent actions
  if (type === 'cut' || type === 'copy') {
    return editor.state.selection.empty
  }

  // Paint format special case
  if (type === 'paintFormat') {
    // If there are copied formats, button should remain active to apply formats
    if (hasFormatCopied) {
      return editor.state.selection.empty // Only disable when no selection
    }
    // If no formats are copied, need selection to copy
    return editor.state.selection.empty
  }

  // Always enabled actions
  if (type === 'paste') {
    return false
  }

  // Check if mark can be toggled
  return !canToggleMark(editor, type)
}

/**
 * Get formatted name for a mark type
 */
export function getFormattedMarkName(type: Mark): string {
  return MARK_NAMES[type] || type.charAt(0).toUpperCase() + type.slice(1)
}

/**
 * Hook for managing mark button state with proper updates for shouldRerenderOnTransaction: false
 */
export function useMarkState(editor: Editor | null, type: Mark, disabled = false) {
  // State that will be updated on editor changes
  const [selectionEmpty, setSelectionEmpty] = React.useState<boolean>(editor ? editor.state.selection.empty : true)
  const [hasCopiedFormat, setHasCopiedFormat] = React.useState<boolean>(hasFormatCopied)

  // Update state when selection changes
  React.useEffect(() => {
    if (!editor) return

    const updateState = () => {
      setSelectionEmpty(editor.state.selection.empty)
      setHasCopiedFormat(hasFormatCopied)
    }

    // Initial state
    updateState()

    // Listen for editor events
    editor.on('selectionUpdate', updateState)
    editor.on('transaction', updateState)

    // Listen for format state changes
    const handleFormatStateChange = () => {
      setHasCopiedFormat(hasFormatCopied)
    }
    document.addEventListener(FORMAT_COPIED_EVENT, handleFormatStateChange)

    return () => {
      editor.off('selectionUpdate', updateState)
      editor.off('transaction', updateState)
      document.removeEventListener(FORMAT_COPIED_EVENT, handleFormatStateChange)
    }
  }, [editor])

  // Calculate derived states based on updated values
  const isDisabled = React.useMemo(() => {
    if (!editor || disabled) return true

    if (type === 'cut' || type === 'copy') {
      return selectionEmpty
    }

    if (type === 'paintFormat') {
      if (hasCopiedFormat) {
        return selectionEmpty
      }
      return selectionEmpty
    }

    if (type === 'paste') {
      return false
    }

    return false
  }, [editor, type, disabled, selectionEmpty, hasCopiedFormat])

  const isActive = React.useMemo(() => {
    if (!editor) return false

    if (type === 'paintFormat') {
      return hasCopiedFormat
    }

    if (NON_ACTIVE_TYPES.includes(type)) {
      return false
    }

    return editor.isActive(type)
  }, [editor, type, hasCopiedFormat])

  const Icon = markIcons[type]
  const shortcutKey = markShortcutKeys[type]
  const formattedName = getFormattedMarkName(type)

  return {
    isDisabled,
    isActive,
    Icon,
    shortcutKey,
    formattedName
  }
}

export const MarkButton = ({
  editor: providedEditor,
  type,
  text,
  hideWhenUnavailable = false,
  className = '',
  disabled,
  onClick,
  children,
  ...buttonProps
}: MarkButtonProps) => {
  const editor = useTiptapEditor(providedEditor)

  const { t } = useTranslation('component/rich-text-editor')

  const { isDisabled, isActive, Icon, shortcutKey, formattedName } = useMarkState(editor, type, disabled)

  const handleClick = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(e)

      if (!e.defaultPrevented && !isDisabled && editor) {
        toggleMark(editor, type)
      }
    },
    [onClick, isDisabled, editor, type]
  )

  if (!editor) {
    return null
  }

  return (
    <Button
      type='button'
      className={className.trim()}
      disabled={isDisabled}
      data-active-state={isActive ? 'on' : 'off'}
      data-disabled={isDisabled}
      role='button'
      tabIndex={-1}
      aria-label={type}
      aria-pressed={isActive}
      tooltip={t(formattedName)}
      shortcutKeys={shortcutKey}
      onClick={handleClick}
      {...buttonProps}
    >
      {children || (
        <>
          <Icon className='h-4 w-4' />
          {text && <span>{text}</span>}
        </>
      )}
    </Button>
  )
}

export default MarkButton
