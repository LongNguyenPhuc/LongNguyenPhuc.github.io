// Core
import { useState, useEffect, useCallback, useMemo } from 'react'
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
import { LetterText } from 'lucide-react'
// Internal
import { DEFAULT_FONTS } from './lib/constants'
import { FontDropdownMenuProps } from './lib/type'
import { useTiptapEditor } from '../../../hooks/use-tiptap-editor'
import { Button } from '../../../components/tiptap-ui-primitive'

export function FontDropdownMenu({ editor: providedEditor, fonts = DEFAULT_FONTS }: FontDropdownMenuProps) {
  const editor = useTiptapEditor(providedEditor)

  const { t } = useTranslation('component/rich-text-editor')

  const [currentFont, setCurrentFont] = useState<string>('')

  const currentFontName = useMemo(() => {
    if (!currentFont) {
      return t('defaultFont')
    }

    const font = fonts.find((f) => f.value === currentFont || `"${f.value}"` === currentFont)
    return font ? t(font.name) : t('defaultFont')
  }, [currentFont, fonts, t])

  const updateFontState = useCallback(() => {
    if (!editor) return

    const attrs = editor.getAttributes('textStyle')
    const fontFamily = attrs.fontFamily || ''
    setCurrentFont(fontFamily)
  }, [editor])

  useEffect(() => {
    if (!editor) return

    editor.on('selectionUpdate', updateFontState)
    editor.on('transaction', updateFontState)

    return () => {
      editor.off('selectionUpdate', updateFontState)
      editor.off('transaction', updateFontState)
    }
  }, [editor, updateFontState])

  const handleSetFont = useCallback(
    (fontValue: string) => {
      if (!editor) return

      if (fontValue) {
        editor.chain().focus().setFontFamily(fontValue).run()
      } else {
        editor.chain().focus().unsetFontFamily().run()
      }

      // Manually update state after changing font
      setTimeout(updateFontState, 0)
    },
    [editor, updateFontState]
  )

  if (!editor) {
    return null
  }

  const isDisabled = !editor.isEditable

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
            aria-label={t('fontLabel')}
            tooltip={t('fontLabel')}
            className='min-w-[100px] justify-between'
          >
            <div className='flex items-center gap-2'>
              <LetterText className='h-4 w-4' />
              <span className='truncate'>{currentFontName}</span>
            </div>
            <ChevronDown className='h-4 w-4' />
          </Button>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent className='min-w-[150px]'>
        <DropdownMenuGroup>
          {fonts.map((font) => (
            <DropdownMenuItem
              key={`font-${font.value}`}
              className={cn('cursor-pointer', currentFont === font.value && 'bg-gray-100')}
              onClick={() => handleSetFont(font.value)}
            >
              <span style={{ fontFamily: font.value || 'inherit' }}>
                {font.value === '' ? t(font.name) : font.value}
              </span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default FontDropdownMenu
