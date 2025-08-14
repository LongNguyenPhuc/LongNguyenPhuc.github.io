//Core
import { ChangeEvent, useEffect, useState } from 'react'
import { type Editor } from '@tiptap/react'
import { useTranslation } from 'react-i18next'
// App
import { Button } from '@lib-ui/base/button'
import { Popover, PopoverTrigger, PopoverContent } from '@lib-ui/base/popover'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@lib-ui/base/tabs'
import { Input } from '@lib-ui/base/input'
import { Label } from '@lib-ui/base/label'
// Icons
import { Search, ArrowUp, ArrowDown, X } from 'lucide-react'
// Internal
import type { ButtonProps } from '../../../components/tiptap-ui-primitive/button/lib/types'
import { Button as TipTapButton } from '../../../components/tiptap-ui-primitive'
import { useTiptapEditor } from '../../../hooks/use-tiptap-editor'

// Props
export interface SearchReplacePopoverProps extends Omit<ButtonProps, 'type'> {
  editor?: Editor | null
}

export function SearchReplaceContent({ editor: providedEditor }: { editor?: Editor | null }) {
  const editor = useTiptapEditor(providedEditor)
  const [searchTerm, setSearchTerm] = useState('')
  const [replaceTerm, setReplaceTerm] = useState('')
  const [resultCount, setResultCount] = useState<[number, number]>([0, 0])
  const { t } = useTranslation('component/rich-text-editor')

  useEffect(() => {
    if (!editor) return

    const updateResultCount = () => {
      const results = editor.storage.searchAndReplace.results || []
      const index = editor.storage.searchAndReplace.resultIndex || 0
      setResultCount([index + 1, results?.length])
    }

    // set search term when component mounted
    if (searchTerm) {
      editor.commands.setSearchTerm(searchTerm)
      updateResultCount()
    }

    // set replace term when component mounted
    if (replaceTerm) {
      editor.commands.setReplaceTerm(replaceTerm)
    }

    editor.on('update', updateResultCount)

    return () => {
      editor.off('update', updateResultCount)
    }
  }, [editor, searchTerm, replaceTerm])

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchTerm(value)
    if (editor) {
      editor.commands.setSearchTerm(value)
    }
  }

  const handleReplaceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setReplaceTerm(value)
    if (editor) {
      editor.commands.setReplaceTerm(value)
    }
  }

  const handleNextResult = () => {
    if (editor) {
      editor.commands.nextSearchResult()
      setResultCount([
        editor.storage.searchAndReplace.resultIndex + 1 || 0,
        editor.storage.searchAndReplace.results?.length
      ])
    }
  }

  const handlePrevResult = () => {
    if (editor) {
      editor.commands.previousSearchResult()
      setResultCount([
        editor.storage.searchAndReplace.resultIndex + 1 || 0,
        editor.storage.searchAndReplace.results?.length
      ])
    }
  }

  const handleReplace = () => {
    if (editor) {
      const currentIndex = editor.storage.searchAndReplace.resultIndex

      editor.commands.replace(currentIndex)

      editor.commands.setSearchTerm(searchTerm)
    }
  }

  const handleReplaceAll = () => {
    if (editor) {
      editor.commands.replaceAll()
      // update result count after replace all
      editor.commands.setSearchTerm(searchTerm)
    }
  }

  const handleClear = () => {
    setSearchTerm('')
    if (editor) {
      editor.commands.setSearchTerm('')
    }
  }

  return (
    <Tabs defaultValue='find' className='w-full'>
      <TabsList className='grid w-full grid-cols-2'>
        <TabsTrigger value='find'>{t('search')}</TabsTrigger>
        <TabsTrigger value='replace'>{t('replace')}</TabsTrigger>
      </TabsList>

      <TabsContent value='find' className='space-y-2 pt-2'>
        <div className='flex items-center space-x-2'>
          <div className='relative flex-1'>
            <Input
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder={t('search') + '...'}
              className='pr-16'
            />
            <div className='absolute top-1/2 right-2 flex -translate-y-1/2 items-center space-x-1'>
              {searchTerm && (
                <Button type='button' variant={'link'} onClick={handleClear}>
                  <X className='h-4 w-4' />
                </Button>
              )}
              <span className='text-xs text-gray-500'>
                {resultCount[1] > 0 ? `${resultCount[0]}/${resultCount[1]}` : '0/0'}
              </span>
            </div>
          </div>
          <Button
            type='button'
            variant={'ghost'}
            className='border border-gray-200'
            onClick={handlePrevResult}
            disabled={resultCount[1] === 0}
          >
            <ArrowUp className='h-4 w-4' />
          </Button>
          <Button
            type='button'
            variant={'ghost'}
            className='border border-gray-200'
            onClick={handleNextResult}
            disabled={resultCount[1] === 0}
          >
            <ArrowDown className='h-4 w-4' />
          </Button>
        </div>
      </TabsContent>

      <TabsContent value='replace' className='space-y-2 pt-2'>
        <div className='flex items-center space-x-2'>
          <div className='relative flex-1'>
            <Input
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder={t('search') + '...'}
              className='pr-16'
            />
            <div className='absolute top-1/2 right-2 flex -translate-y-1/2 items-center space-x-1'>
              {searchTerm && (
                <Button type='button' variant={'link'} onClick={handleClear}>
                  <X className='h-4 w-4' />
                </Button>
              )}
              <span className='text-xs text-gray-500'>
                {resultCount[1] > 0 ? `${resultCount[0]}/${resultCount[1]}` : '0/0'}
              </span>
            </div>
          </div>
          <Button
            type='button'
            variant={'ghost'}
            className='border border-gray-200'
            onClick={handlePrevResult}
            disabled={resultCount[1] === 0}
          >
            <ArrowUp className='h-4 w-4' />
          </Button>
          <Button
            type='button'
            variant={'ghost'}
            className='border border-gray-200'
            onClick={handleNextResult}
            disabled={resultCount[1] === 0}
          >
            <ArrowDown className='h-4 w-4' />
          </Button>
        </div>

        <div className='flex items-center space-x-2'>
          <Label htmlFor='replace-input' className='sr-only'>
            {t('replaceWith')}
          </Label>
          <Input
            id='replace-input'
            value={replaceTerm}
            onChange={handleReplaceChange}
            placeholder={t('replaceWith') + '...'}
            className='flex-1'
          />
        </div>

        <div className='flex items-center justify-center space-x-2'>
          <Button
            type='button'
            variant={'secondary'}
            className='w-full'
            onClick={handleReplace}
            disabled={resultCount[1] === 0}
          >
            {t('replace')}
          </Button>
          <Button
            type='button'
            variant={'secondary'}
            className='w-full'
            onClick={handleReplaceAll}
            disabled={resultCount[1] === 0}
          >
            {t('replaceAll')}
          </Button>
        </div>
      </TabsContent>
    </Tabs>
  )
}

export function SearchReplacePopover({ editor: providedEditor, ...props }: SearchReplacePopoverProps) {
  const editor = useTiptapEditor(providedEditor)
  const [isOpen, setIsOpen] = useState(false)

  if (!editor) {
    return null
  }

  const isDisabled = !editor?.isEditable

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open)
    if (!open) {
      editor.commands.setSearchTerm('')
    }
  }

  return (
    <Popover open={isOpen} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <TipTapButton
          type='button'
          data-style='ghost'
          data-appearance='default'
          role='button'
          tabIndex={-1}
          aria-label='Tìm kiếm và thay thế'
          tooltip='Tìm kiếm và thay thế'
          disabled={isDisabled}
          {...props}
        >
          <Search className='h-4 w-4' />
        </TipTapButton>
      </PopoverTrigger>

      <PopoverContent className='w-80 p-3' aria-label='Tìm kiếm và thay thế'>
        <SearchReplaceContent editor={editor} />
      </PopoverContent>
    </Popover>
  )
}

export default SearchReplacePopover
