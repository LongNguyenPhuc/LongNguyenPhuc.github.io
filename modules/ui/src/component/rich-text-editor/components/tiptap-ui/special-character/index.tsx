// Core
import { useCallback, useMemo } from 'react'
import { useTiptapEditor } from '../../../hooks/use-tiptap-editor'
import { useTranslation } from 'react-i18next'
// App
import { Popover, PopoverContent, PopoverTrigger } from '@lib-ui/base/popover'
// Icons
import { Hash } from 'lucide-react'
// Internal
import { Button as TipTapButton } from '../../tiptap-ui-primitive'
import { SPECIAL_CHARACTERS } from './lib/constants'
import { SpecialCharacterProps } from './lib/type'

export function SpecialCharacter({ editor: providedEditor }: SpecialCharacterProps) {
  const editor = useTiptapEditor(providedEditor)
  const { t } = useTranslation('component/rich-text-editor')

  // Memoize the flattened array of all special characters
  const allCharacters = useMemo(() => {
    return Object.values(SPECIAL_CHARACTERS).flat()
  }, [])

  const isDisabled = !editor?.isEditable

  // Use useCallback to prevent recreating this function on each render
  const insertCharacter = useCallback(
    (char: string) => {
      if (!editor) return
      editor.chain().focus().insertContent(char).run()
    },
    [editor]
  )

  if (!editor) {
    return null
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <TipTapButton
          type='button'
          disabled={isDisabled}
          data-style='ghost'
          data-disabled={isDisabled}
          aria-label={t('specialCharacter')}
          tooltip={t('specialCharacter')}
          className='text-muted-foreground ring-offset-background hover:bg-muted focus-visible:ring-ring flex h-8 w-8 items-center justify-center rounded-md p-0 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none'
        >
          <Hash className='h-4 w-4' />
        </TipTapButton>
      </PopoverTrigger>
      <PopoverContent className='w-80 p-3'>
        <div className='grid max-h-64 grid-cols-6 gap-2 overflow-y-auto'>
          {allCharacters.map((char, index) => (
            <button
              key={index}
              onClick={() => insertCharacter(char)}
              className='hover:bg-secondary cursor-pointer rounded-sm p-2 text-center text-sm font-semibold transition-colors'
            >
              {char}
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}
