// Core
import * as React from 'react'
import { useCallback, useMemo, useState, useEffect } from 'react'
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
import { ChevronDown, Heading } from 'lucide-react'
// Internal
import { useTiptapEditor } from '../../../hooks/use-tiptap-editor'
import { Button } from '../../../components/tiptap-ui-primitive'
import { Level, type HeadingDropdownMenuProps } from './lib/type'
import { HEADING_CONFIG } from './lib/constants'

export const HeadingDropdownMenu = React.memo(function HeadingDropdownMenu({
  editor: providedEditor,
  levels = [1, 2, 3, 4, 5, 6]
}: HeadingDropdownMenuProps) {
  const editor = useTiptapEditor(providedEditor)

  const { t } = useTranslation('component/rich-text-editor')

  const [activeHeadingLevel, setActiveHeadingLevel] = useState<Level | null>(null)
  const [isAnyHeadingActive, setIsAnyHeadingActive] = useState(false)

  const updateHeadingState = useCallback(() => {
    if (!editor) return

    const newActiveLevel = levels.find((level) => editor.isActive('heading', { level })) as Level | null

    setActiveHeadingLevel(newActiveLevel)
    setIsAnyHeadingActive(editor.isActive('heading'))
  }, [editor, levels])

  useEffect(() => {
    if (!editor) return

    editor.on('selectionUpdate', updateHeadingState)
    editor.on('transaction', updateHeadingState)

    return () => {
      editor.off('selectionUpdate', updateHeadingState)
      editor.off('transaction', updateHeadingState)
    }
  }, [editor, updateHeadingState])

  // Memoized active icon component based on our state
  const ActiveIcon = useMemo(() => {
    return activeHeadingLevel ? HEADING_CONFIG[activeHeadingLevel].icon : Heading
  }, [activeHeadingLevel])

  // Toggle heading handler
  const toggleHeading = useCallback(
    (level: Level) => {
      if (editor) {
        editor.chain().focus().toggleHeading({ level }).run()
        // Manually update state after toggling
        updateHeadingState()
      }
    },
    [editor, updateHeadingState]
  )

  // Early return if no editor
  if (!editor) return null

  const isDisabled = !editor?.isEditable

  return (
    <DropdownMenu>
      <DropdownMenuTrigger disabled={isDisabled} asChild>
        <div>
          <Button
            type='button'
            data-style='ghost'
            data-active-state={isAnyHeadingActive ? 'on' : 'off'}
            role='button'
            disabled={isDisabled}
            tabIndex={-1}
            aria-label={t('headingLabel')}
            aria-pressed={isAnyHeadingActive}
            tooltip={t('headingLabel')}
          >
            <ActiveIcon className='h-4 w-4' />
            <ChevronDown className='h-4 w-4' />
          </Button>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuGroup>
          {levels.map((level) => {
            const { icon: LevelIcon, label } = HEADING_CONFIG[level]
            const isActive = activeHeadingLevel === level

            return (
              <DropdownMenuItem key={`heading-${level}`} asChild>
                <Button
                  type='button'
                  data-style='ghost'
                  data-active-state={isActive ? 'on' : 'off'}
                  role='button'
                  tabIndex={-1}
                  aria-label={t(label)}
                  aria-pressed={isActive}
                  onClick={() => toggleHeading(level)}
                  className='w-full cursor-pointer text-left'
                >
                  <LevelIcon className='h-4 w-4' />
                  <span>{t(label)}</span>
                </Button>
              </DropdownMenuItem>
            )
          })}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
})

export default HeadingDropdownMenu
