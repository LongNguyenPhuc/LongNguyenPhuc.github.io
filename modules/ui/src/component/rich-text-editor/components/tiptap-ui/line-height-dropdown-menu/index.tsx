// Core
import { useState, useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
// App
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuGroup } from '@lib-ui/base/dropdown-menu'
// Icons
import { ChevronDown } from 'lucide-react'
import { Waves } from 'lucide-react'
// Internal
import { Button } from '../../tiptap-ui-primitive'
import { LineHeightDropdownMenuProps } from './lib/type'
import { DEFAULT_LINE_HEIGHTS } from './lib/constants'
import { useTiptapEditor } from '../../../hooks/use-tiptap-editor'

export function LineHeightDropdownMenu({
  editor: providedEditor,
  lineHeights = DEFAULT_LINE_HEIGHTS
}: LineHeightDropdownMenuProps) {
  const editor = useTiptapEditor(providedEditor)

  const { t } = useTranslation('component/rich-text-editor')

  const [currentLineHeight, setCurrentLineHeight] = useState<string>('')

  const updateLineHeightState = useCallback(() => {
    if (!editor) return

    const attrs = editor.getAttributes('textStyle')
    const lineHeight = attrs.lineHeight || ''
    setCurrentLineHeight(lineHeight)
  }, [editor])

  // Set up transaction listener for manual updates
  useEffect(() => {
    if (!editor) return

    editor.on('selectionUpdate', updateLineHeightState)
    editor.on('transaction', updateLineHeightState)

    return () => {
      editor.off('selectionUpdate', updateLineHeightState)
      editor.off('transaction', updateLineHeightState)
    }
  }, [editor, updateLineHeightState])

  const handleSetLineHeight = useCallback(
    (lineHeightValue: string) => {
      if (!editor) return

      if (lineHeightValue) {
        editor.chain().focus().setMark('textStyle', { lineHeight: lineHeightValue }).run()
      } else {
        editor.chain().focus().setMark('textStyle', { lineHeight: null }).removeEmptyTextStyle().run()
      }

      // Manually update state after changing line height
      setTimeout(updateLineHeightState, 0)
    },
    [editor, updateLineHeightState]
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
            aria-label={t('lineHeight')}
            tooltip={t('lineHeight')}
          >
            <Waves className='h-4 w-4' />
            <ChevronDown className='h-4 w-4' />
          </Button>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent className='max-h-[300px] min-w-[120px] overflow-y-auto'>
        <DropdownMenuGroup>
          {lineHeights.map((lineHeight) => (
            <Button
              key={lineHeight.name}
              type='button'
              disabled={isDisabled}
              data-style='ghost'
              data-active-state={currentLineHeight === lineHeight.value ? 'on' : 'off'}
              data-disabled={isDisabled}
              role='button'
              onClick={() => handleSetLineHeight(lineHeight.value)}
              className='w-full'
            >
              {lineHeight.name}
            </Button>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default LineHeightDropdownMenu
