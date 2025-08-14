// Core
import * as React from 'react'
import { useMemo, useState, useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
// App
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem
} from '@lib-ui/base/dropdown-menu'
// Icons
import { ChevronDownIcon, ListIcon } from 'lucide-react'
// Internal
import { useTiptapEditor } from '../../../hooks/use-tiptap-editor'
import { Button } from '../../tiptap-ui-primitive'
import { ListDropdownMenuProps, ListType } from './lib/type'
import { LIST_OPTIONS } from './lib/constants'

export const ListDropdownMenu = React.memo(function ListDropdownMenu({
  editor: providedEditor,
  types = ['bulletList', 'orderedList', 'taskList']
}: ListDropdownMenuProps) {
  const editor = useTiptapEditor(providedEditor)

  const { t } = useTranslation('component/rich-text-editor')

  const [activeListType, setActiveListType] = useState<ListType | null>(null)
  const [isAnyListActive, setIsAnyListActive] = useState(false)

  const updateListState = useCallback(() => {
    if (!editor) return

    const newActiveType = types.find((type) => editor.isActive(type)) || null
    const newIsAnyListActive = types.some((type) => editor.isActive(type))

    setActiveListType(newActiveType)
    setIsAnyListActive(newIsAnyListActive)
  }, [editor, types])

  useEffect(() => {
    if (!editor) return

    editor.on('selectionUpdate', updateListState)
    editor.on('transaction', updateListState)

    return () => {
      editor.off('selectionUpdate', updateListState)
      editor.off('transaction', updateListState)
    }
  }, [editor, updateListState])

  const handleToggleList = useCallback(
    (type: ListType) => {
      if (!editor) return
      LIST_OPTIONS[type].toggle(editor)
      setTimeout(updateListState, 0)
    },
    [editor, updateListState]
  )

  const ActiveIcon = useMemo(() => {
    return activeListType ? LIST_OPTIONS[activeListType].icon : ListIcon
  }, [activeListType])

  if (!editor) return null

  const isDisabled = !editor?.isEditable

  return (
    <DropdownMenu>
      <DropdownMenuTrigger disabled={isDisabled} asChild>
        <div>
          <Button
            type='button'
            data-style='ghost'
            data-active-state={isAnyListActive ? 'on' : 'off'}
            role='button'
            disabled={isDisabled}
            tabIndex={-1}
            aria-label={t('listLabel')}
            tooltip={t('listLabel')}
          >
            <ActiveIcon className='h-4 w-4' />
            <ChevronDownIcon className='h-4 w-4' />
          </Button>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          {types.map((type) => {
            const { icon: ItemIcon, label } = LIST_OPTIONS[type]
            const isActive = activeListType === type

            return (
              <DropdownMenuItem key={type} asChild>
                <Button
                  type='button'
                  data-active-state={isActive ? 'on' : 'off'}
                  role='button'
                  tabIndex={-1}
                  aria-label={t(label)}
                  aria-pressed={isActive}
                  onClick={() => handleToggleList(type)}
                  className='w-full cursor-pointer justify-start text-left'
                >
                  <ItemIcon className='h-4 w-4' />
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

export default ListDropdownMenu
