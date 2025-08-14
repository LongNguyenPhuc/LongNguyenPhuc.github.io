// Core
import { useState, useEffect, useCallback } from 'react'
import { cn } from '@utils/cn'
import { useTranslation } from 'react-i18next'
// App
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuGroup
} from '@lib-ui/base/dropdown-menu'
// Icons
import { ChevronDown } from 'lucide-react'
import { Type } from 'lucide-react'
// Internal
import { Button } from '../../tiptap-ui-primitive'
import { useTiptapEditor } from '../../../hooks/use-tiptap-editor'
import { DEFAULT_FONT_SIZES } from './lib/constants'
import { FontSizeDropdownMenuProps } from './lib/type'

export function FontSizeDropdownMenu({
  editor: providedEditor,
  sizes = DEFAULT_FONT_SIZES
}: FontSizeDropdownMenuProps) {
  const editor = useTiptapEditor(providedEditor)

  const { t } = useTranslation('component/rich-text-editor')

  const [currentFontSize, setCurrentFontSize] = useState<string>('')
  const [currentFontSizeName, setCurrentFontSizeName] = useState<string>('16px')

  const updateFontSizeState = useCallback(() => {
    if (!editor) return

    const attrs = editor.getAttributes('textStyle')
    const fontSize = attrs.fontSize || ''
    setCurrentFontSize(fontSize)

    if (!fontSize) {
      setCurrentFontSizeName('16px')
      return
    }

    const size = sizes.find((s) => s.value === fontSize)
    setCurrentFontSizeName(size ? size.name : '16px')
  }, [editor, sizes])

  useEffect(() => {
    if (!editor) return

    editor.on('selectionUpdate', updateFontSizeState)
    editor.on('transaction', updateFontSizeState)

    return () => {
      editor.off('selectionUpdate', updateFontSizeState)
      editor.off('transaction', updateFontSizeState)
    }
  }, [editor, updateFontSizeState])

  const handleSetFontSize = useCallback(
    (sizeValue: string) => {
      if (!editor) return

      if (sizeValue) {
        editor.chain().focus().setFontSize(sizeValue).run()
      } else {
        editor.chain().focus().unsetFontSize().run()
      }

      // Manually update state after changing font size
      setTimeout(updateFontSizeState, 0)
    },
    [editor, updateFontSizeState]
  )

  const isDisabled = !editor?.isEditable

  if (!editor) {
    return null
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger disabled={isDisabled} asChild>
        <div>
          <Button
            type='button'
            data-style='ghost'
            data-disabled={isDisabled}
            role='button'
            disabled={isDisabled}
            tabIndex={-1}
            aria-label={t('fontSize')}
            tooltip={t('fontSize')}
            className='min-w-[80px] justify-between'
          >
            <div className='flex items-center gap-2'>
              <Type className='h-4 w-4' />
              <span className='truncate'>{currentFontSizeName}</span>
            </div>
            <ChevronDown className='h-4 w-4' />
          </Button>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent className='max-h-[300px] min-w-[120px] overflow-y-auto'>
        <DropdownMenuGroup>
          {sizes.map((size) => (
            <DropdownMenuItem
              key={`font-size-${size.value}`}
              className={cn('cursor-pointer', currentFontSize === size.value && 'bg-gray-100')}
              onClick={() => handleSetFontSize(size.value)}
            >
              <span>{size.name}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default FontSizeDropdownMenu
