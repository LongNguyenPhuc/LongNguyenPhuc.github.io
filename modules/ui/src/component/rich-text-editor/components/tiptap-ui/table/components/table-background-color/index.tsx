// Core
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
// App
import { Popover, PopoverTrigger, PopoverContent } from '@lib-ui/base/popover'
import { Separator } from '@lib-ui/base/separator'
import { Input } from '@lib-ui/base/input'
// Icons
import { Ban, PaintBucket } from 'lucide-react'
// Internal
import { useTiptapEditor } from '../../../../../hooks/use-tiptap-editor'
import { Button } from '../../../../tiptap-ui-primitive/button'
import { DEFAULT_TABLE_BACKGROUND_COLORS } from './lib/constants'
import { TableBackgroundPopoverProps } from './lib/types'

export function TableBackgroundPopover({
  editor: providedEditor,
  colors = DEFAULT_TABLE_BACKGROUND_COLORS,
  hideWhenUnavailable = false,
  ...props
}: TableBackgroundPopoverProps) {
  const editor = useTiptapEditor(providedEditor)
  const { t } = useTranslation('component/rich-text-editor')
  const [isOpen, setIsOpen] = useState(false)
  const [isDisabled, setIsDisabled] = useState(true)
  const [currentColor, setCurrentColor] = useState('')

  useEffect(() => {
    if (!editor) return

    const updateIsDisabled = () => {
      if (!editor) {
        setIsDisabled(true)
        return
      }

      // Enable button only when a table is selected
      setIsDisabled(!editor.isActive('table'))
    }

    // Initial check
    updateIsDisabled()

    // Add event listeners
    editor.on('selectionUpdate', updateIsDisabled)
    editor.on('update', updateIsDisabled)

    return () => {
      editor.off('selectionUpdate', updateIsDisabled)
      editor.off('update', updateIsDisabled)
    }
  }, [editor])

  // Get current table background color when component mounts or editor changes
  useEffect(() => {
    if (!editor) return

    if (editor.isActive('table')) {
      const attrs = editor.getAttributes('table')
      if (attrs.backgroundColor) {
        setCurrentColor(attrs.backgroundColor)
      }
    }
  }, [editor])

  const editorState = useMemo(() => {
    if (!editor || !editor.isActive('table')) return { isActive: false, currentColor: undefined }

    const attrs = editor.getAttributes('table')
    return {
      isActive: editor.isActive('table'),
      currentColor: attrs.backgroundColor
    }
  }, [editor])

  const shouldShow = useMemo(() => {
    if (!hideWhenUnavailable || !editor) return true

    return !!editor.isActive('table')
  }, [hideWhenUnavailable, editor])

  const handleColorAction = useCallback(
    (color: string | null) => {
      if (!editor) return

      if (editor.isActive('table')) {
        if (color === null) {
          // Remove background color
          editor.chain().focus().setCellAttribute('backgroundColor', null).run()
        } else {
          // Apply background color
          editor.chain().focus().setCellAttribute('backgroundColor', color).run()
          setCurrentColor(color)
        }
      }

      setIsOpen(false)
    },
    [editor, setIsOpen]
  )

  if (!shouldShow || !editor || !editor.isEditable) {
    return null
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          type='button'
          data-style='ghost'
          data-appearance='default'
          role='button'
          tabIndex={-1}
          aria-label={t('table.backgroundColor')}
          tooltip={t('table.backgroundColor')}
          disabled={isDisabled}
          data-disabled={isDisabled}
          aria-pressed={editorState.isActive}
          {...props}
        >
          <div className='flex items-center'>
            <PaintBucket className='h-4 w-4' />
            {editorState.currentColor && (
              <div
                className='ml-1 h-2 w-2 rounded-full border border-gray-300'
                style={{ backgroundColor: editorState.currentColor }}
              />
            )}
          </div>
        </Button>
      </PopoverTrigger>

      <PopoverContent className='w-80 p-3'>
        <div className='outline-none' role='menu'>
          <div className='mb-2 grid grid-cols-7 gap-1'>
            {colors.map((color) => (
              <button
                key={color.value}
                onClick={() => handleColorAction(color.value)}
                className='flex h-6 w-6 cursor-pointer items-center justify-center rounded-sm border border-gray-300'
                style={{ backgroundColor: color.value }}
              >
                {currentColor === color.value && (
                  <span className='text-xs text-black' aria-hidden='true'>
                    ✓
                  </span>
                )}
              </button>
            ))}
          </div>
          <Separator className='my-2' />
          <div className='flex items-center justify-between'>
            <Input
              type='color'
              onChange={(event) => {
                const value = event.target.value
                handleColorAction(value)
              }}
              value={currentColor || '#ffffff'}
              className='w-18 cursor-pointer bg-gray-200 px-2 py-1'
            />
            <Button onClick={() => handleColorAction(null)} type='button' data-style='ghost'>
              <Ban className='h-4 w-4' />
              <span className='ml-2'>{t('table.removeBackgroundColor')}</span>
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default TableBackgroundPopover
