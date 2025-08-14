// Core
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
// App
import { Popover, PopoverTrigger, PopoverContent } from '@lib-ui/base/popover'
import { Separator } from '@lib-ui/base/separator'
import { Input } from '@lib-ui/base/input'
// Icons
import { Ban, Highlighter } from 'lucide-react'
// Internal
import { Button } from '../../../components/tiptap-ui-primitive'
import { isMarkInSchema } from '../../../lib/utils'
import { useTiptapEditor } from '../../../hooks/use-tiptap-editor'
import { DEFAULT_HIGHLIGHT_COLORS } from './lib/constants'
import { HighlightPopoverProps } from './lib/type'

export function HighlightPopover({
  editor: providedEditor,
  colors = DEFAULT_HIGHLIGHT_COLORS,
  ...props
}: HighlightPopoverProps) {
  const editor = useTiptapEditor(providedEditor)
  const [isOpen, setIsOpen] = useState(false)
  const [currentColor, setCurrentColor] = useState('')
  const { t } = useTranslation('component/rich-text-editor')

  const markAvailable = useMemo(() => isMarkInSchema('highlight', editor), [editor])

  const [isDisabled, setIsDisabled] = useState(!markAvailable)

  useEffect(() => {
    if (!editor) return

    const updateIsDisabled = () => {
      if (!markAvailable || !editor) {
        setIsDisabled(true)
        return
      }

      const isInCompatibleContext =
        editor.isActive('code') || editor.isActive('codeBlock') || editor.isActive('imageUpload')

      setIsDisabled(isInCompatibleContext)
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
  }, [editor, markAvailable])

  // Get current highlight color when component mounts or editor changes
  useEffect(() => {
    if (!editor) return

    const attrs = editor.getAttributes('highlight')
    if (attrs.color) {
      setCurrentColor(attrs.color)
    }
  }, [editor])

  const editorState = useMemo(() => {
    if (!editor) return { isActive: false, currentColor: undefined }
    return {
      isActive: editor.isActive('highlight'),
      currentColor: editor.getAttributes('highlight').color
    }
  }, [editor])

  const handleColorAction = useCallback(
    (color: string | null) => {
      if (!editor) return

      if (color === null) {
        // Remove highlight
        editor.chain().focus().unsetMark('highlight').run()
      } else {
        // Apply highlight
        editor.chain().focus().setHighlight({ color }).run()
        setCurrentColor(color)
      }

      setIsOpen(false)
    },
    [editor, setIsOpen]
  )

  if (!editor) {
    return null
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          type='button'
          data-style='ghost'
          disabled={isDisabled}
          data-active-state={editorState.isActive ? 'on' : 'off'}
          data-disabled={isDisabled}
          aria-pressed={editorState.isActive}
          aria-label={t('highlight')}
          tooltip={t('highlight')}
          {...props}
        >
          <div className='flex items-center'>
            <Highlighter className='h-4 w-4' />
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
        <div className='outline-none'>
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
          <div className='flex justify-between'>
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
              <span className='ml-2'>{t('removeHighlight')}</span>
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default HighlightPopover
