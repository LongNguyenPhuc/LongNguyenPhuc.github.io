// Core
import { useCallback, useMemo, useState, useEffect } from 'react'
import { type Editor } from '@tiptap/react'
import { useTranslation } from 'react-i18next'
// Icons
import { Redo2 } from 'lucide-react'
import { Undo2 } from 'lucide-react'
// Internal
import { useTiptapEditor } from '../../../hooks/use-tiptap-editor'
import type { ButtonProps } from '../../tiptap-ui-primitive/button/lib/types'
import { Button } from '../../tiptap-ui-primitive'

// Types
export type HistoryAction = 'undo' | 'redo'
export interface UndoRedoButtonProps extends ButtonProps {
  editor?: Editor | null
  text?: string
  action: HistoryAction
}

export const historyIcons = {
  undo: Undo2,
  redo: Redo2
}

export const historyShortcutKeys: Partial<Record<HistoryAction, string>> = {
  undo: 'Ctrl-z',
  redo: 'Ctrl-Shift-z'
}

export const historyActionLabels: Record<HistoryAction, string> = {
  undo: 'undo',
  redo: 'redo'
}

// Checks if a history action can be executed
export function canExecuteHistoryAction(editor: Editor | null, action: HistoryAction): boolean {
  if (!editor) return false
  return action === 'undo' ? editor.can().undo() : editor.can().redo()
}

// Executes a history action on the editor
export function executeHistoryAction(editor: Editor | null, action: HistoryAction): boolean {
  if (!editor) return false
  const chain = editor.chain().focus()
  return action === 'undo' ? chain.undo().run() : chain.redo().run()
}

// Determines if a history action should be disabled
export function isHistoryActionDisabled(editor: Editor | null, action: HistoryAction, userDisabled = false): boolean {
  if (userDisabled) return true
  return !canExecuteHistoryAction(editor, action)
}

// Hook that provides all the necessary state and handlers for a history action.
export function useHistoryAction(editor: Editor | null, action: HistoryAction, disabled = false) {
  // State để track history availability
  const [canExecute, setCanExecute] = useState(() => canExecuteHistoryAction(editor, action))

  // Effect để listen cho transaction events
  useEffect(() => {
    if (!editor) {
      setCanExecute(false)
      return
    }

    // Function để update state
    const updateCanExecute = () => {
      setCanExecute(canExecuteHistoryAction(editor, action))
    }

    editor.on('selectionUpdate', updateCanExecute)
    editor.on('transaction', updateCanExecute)

    // Initial check
    updateCanExecute()

    // Cleanup
    return () => {
      editor.off('selectionUpdate', updateCanExecute)
      editor.off('transaction', updateCanExecute)
    }
  }, [editor, action])

  const isDisabled = isHistoryActionDisabled(editor, action, disabled)

  const handleAction = useCallback(() => {
    if (!editor || isDisabled) return
    executeHistoryAction(editor, action)
  }, [editor, action, isDisabled])

  const Icon = historyIcons[action]
  const actionLabel = historyActionLabels[action]
  const shortcutKey = historyShortcutKeys[action]

  return {
    canExecute,
    isDisabled,
    handleAction,
    Icon,
    actionLabel,
    shortcutKey
  }
}

// Alternative hook using force update pattern
export function useHistoryActionWithForceUpdate(editor: Editor | null, action: HistoryAction, disabled = false) {
  const [, forceUpdate] = useState({})

  useEffect(() => {
    if (!editor) return

    const handleUpdate = () => {
      forceUpdate({}) // Force re-render
    }

    // Listen cho transaction events
    editor.on('transaction', handleUpdate)
    editor.on('update', handleUpdate)

    return () => {
      editor.off('transaction', handleUpdate)
      editor.off('update', handleUpdate)
    }
  }, [editor])

  const canExecute = useMemo(() => canExecuteHistoryAction(editor, action), [editor, action])
  const isDisabled = isHistoryActionDisabled(editor, action, disabled)

  const handleAction = useCallback(() => {
    if (!editor || isDisabled) return
    executeHistoryAction(editor, action)
  }, [editor, action, isDisabled])

  const Icon = historyIcons[action]
  const actionLabel = historyActionLabels[action]
  const shortcutKey = historyShortcutKeys[action]

  return {
    canExecute,
    isDisabled,
    handleAction,
    Icon,
    actionLabel,
    shortcutKey
  }
}

// Button component for triggering undo/redo actions in a TipTap editor.
export const UndoRedoButton = ({
  editor: providedEditor,
  action,
  text,
  className = '',
  disabled,
  onClick,
  children,
  ...buttonProps
}: UndoRedoButtonProps) => {
  const editor = useTiptapEditor(providedEditor)

  const { t } = useTranslation('component/rich-text-editor')

  const { isDisabled, handleAction, Icon, actionLabel, shortcutKey } = useHistoryAction(editor, action, disabled)

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(e)

      if (!e.defaultPrevented && !disabled) {
        handleAction()
      }
    },
    [onClick, disabled, handleAction]
  )

  if (!editor) {
    return null
  }

  return (
    <Button
      type='button'
      className={className.trim()}
      disabled={isDisabled}
      data-style='ghost'
      data-disabled={isDisabled}
      role='button'
      tabIndex={-1}
      aria-label={t(actionLabel)}
      tooltip={t(actionLabel)}
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

export default UndoRedoButton
