// Core
import { useCallback, useEffect, useMemo, useState } from 'react'
import { isNodeSelection } from '@tiptap/react'
import { useTranslation } from 'react-i18next'
// App
import { Popover, PopoverTrigger, PopoverContent } from '@lib-ui/base/popover'
import { Separator } from '@lib-ui/base/separator'
import { Input } from '@lib-ui/base/input'
// Icons
import { Ban, Palette } from 'lucide-react'
//Internal
import { useTiptapEditor } from '../../../hooks/use-tiptap-editor'
import { isMarkInSchema } from '../../../lib/utils'
import { Button } from '../../../components/tiptap-ui-primitive'
import { DEFAULT_TEXT_COLORS } from './lib/constants'
import { TextColorPopoverProps } from './lib/type'

const COMMON_BUTTON_PROPS = {
  type: 'button' as const,
  'data-style': 'ghost',
  role: 'button',
  tabIndex: -1
}

export function TextColorPopover({
  editor: providedEditor,
  colors = DEFAULT_TEXT_COLORS,
  hideWhenUnavailable = false,
  ...props
}: TextColorPopoverProps) {
  const editor = useTiptapEditor(providedEditor)
  const { t } = useTranslation('component/rich-text-editor')
  const [isOpen, setIsOpen] = useState(false)
  const [isDisabled, setIsDisabled] = useState(false)
  const [currentColor, setCurrentColor] = useState(editor?.getAttributes('textStyle').color || '#000000')
  const markAvailable = useMemo(() => isMarkInSchema('textStyle', editor), [editor])

  // Update disabled state based on editor context
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

    // Set up listeners
    editor.on('selectionUpdate', updateIsDisabled)
    editor.on('update', updateIsDisabled)

    return () => {
      editor.off('selectionUpdate', updateIsDisabled)
      editor.off('update', updateIsDisabled)
    }
  }, [editor, markAvailable])

  // Update currentColor when editor changes
  useEffect(() => {
    if (!editor) return
    setCurrentColor(editor.getAttributes('textStyle').color || '#000000')
  }, [editor])

  // Handle popover close
  const handleClose = useCallback(() => setIsOpen(false), [])

  // Determine if the component should be shown
  const shouldShow = useMemo(() => {
    if (!editor) return false
    if (!editor.isEditable) return false
    if (!hideWhenUnavailable) return true
    return !isNodeSelection(editor.state.selection)
  }, [hideWhenUnavailable, editor])

  // Memoized callbacks
  const applyColor = useCallback(
    (color: string) => {
      if (!editor) return
      editor.chain().focus().setColor(color).run()
    },
    [editor]
  )

  const removeColor = useCallback(() => {
    if (!editor) return
    editor.chain().focus().unsetColor().run()
    handleClose()
  }, [editor, handleClose])

  const handleColorBoxClick = useCallback(
    (color: string) => {
      setCurrentColor(color)
      applyColor(color)
    },
    [applyColor]
  )

  const handleColorInputChange = useCallback(
    (event: React.FormEvent<HTMLInputElement>) => {
      const value = (event.target as HTMLInputElement).value
      setCurrentColor(value)
      editor?.chain().focus().setColor(value).run()
    },
    [editor]
  )

  if (!shouldShow) {
    return null
  }

  // Get current color information
  const isActive = editor?.isActive('textStyle', { color: currentColor }) ?? false

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          {...COMMON_BUTTON_PROPS}
          data-appearance='default'
          aria-label={t('textColor')}
          tooltip={t('textColor')}
          disabled={isDisabled}
          data-active-state={isActive ? 'on' : 'off'}
          data-disabled={isDisabled}
          aria-pressed={isActive}
          {...props}
        >
          <div className='flex items-center'>
            <Palette className='h-4 w-4' />
            {currentColor && (
              <div
                className='ml-1 h-2 w-2 rounded-full border border-gray-300'
                style={{ backgroundColor: currentColor }}
              />
            )}
          </div>
        </Button>
      </PopoverTrigger>

      <PopoverContent className='w-80 p-3'>
        <div>
          <div className='mb-2 grid grid-cols-7 gap-1'>
            {colors.map((color) => (
              <button
                key={color.value}
                onClick={() => handleColorBoxClick(color.value)}
                className='flex h-6 w-6 cursor-pointer items-center justify-center rounded-sm border border-gray-300'
                style={{ backgroundColor: color.value }}
                title={color.label}
              >
                {currentColor === color.value && <span className='text-xs text-white'>✓</span>}
              </button>
            ))}
          </div>
          <Separator className='my-2' />
          <div className='flex justify-between'>
            <Input
              type='color'
              onInput={handleColorInputChange}
              value={currentColor}
              className='w-18 cursor-pointer bg-gray-200 px-2 py-1'
            />
            <Button {...COMMON_BUTTON_PROPS} onClick={removeColor}>
              <Ban className='h-4 w-4' />
              <span className='ml-2'>{t('removeTextColor')}</span>
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default TextColorPopover
