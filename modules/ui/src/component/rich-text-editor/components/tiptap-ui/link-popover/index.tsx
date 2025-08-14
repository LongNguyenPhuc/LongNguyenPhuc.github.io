// Core
import * as React from 'react'
import { isNodeSelection, type Editor } from '@tiptap/react'
// App
import { Popover, PopoverContent, PopoverTrigger } from '@lib-ui/base/popover'
import { Input } from '@lib-ui/base/input'
import { Button } from '@lib-ui/base/button'
// Icons
import { CornerDownLeft, ExternalLink, Link, Trash } from 'lucide-react'
// Internal
import { isMarkInSchema } from '../../../lib/utils'
import { useTiptapEditor } from '../../../hooks/use-tiptap-editor'
import type { ButtonProps } from '../../../components/tiptap-ui-primitive/button/lib/types'
import { Button as TiptapButton } from '../../../components/tiptap-ui-primitive'
import { COMMON_BUTTON_PROPS, LinkMainProps, LinkPopoverProps } from './lib/types'
import { useLinkHandler } from './lib/hooks'

export const LinkButton = ({ className, children, ...props }: ButtonProps) => (
  <TiptapButton {...COMMON_BUTTON_PROPS} className={className} aria-label='Link' tooltip='Link' {...props}>
    {children || <Link className='h-4 w-4' />}
  </TiptapButton>
)

export const LinkContent = ({ editor: providedEditor }: { editor?: Editor | null }) => {
  const editor = useTiptapEditor(providedEditor)
  const linkHandler = useLinkHandler({ editor })

  return <LinkMain {...linkHandler} />
}

const LinkMain = ({ url, setUrl, setLink, removeLink, isActive }: LinkMainProps) => {
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      setLink()
    }
  }

  const linkButtonDisabled = !url && !isActive

  return (
    <>
      <Input
        type='url'
        placeholder='URL...'
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        onKeyDown={handleKeyDown}
        autoComplete='off'
        autoCorrect='off'
        autoCapitalize='off'
      />
      <div className='mt-4 flex gap-2'>
        <Button {...COMMON_BUTTON_PROPS} className='bg-primary w-full' onClick={setLink} disabled={linkButtonDisabled}>
          <CornerDownLeft className='h-4 w-4' />
        </Button>
        <Button
          {...COMMON_BUTTON_PROPS}
          className='bg-primary w-full'
          onClick={() => window.open(url, '_blank')}
          disabled={linkButtonDisabled}
        >
          <ExternalLink className='h-4 w-4' />
        </Button>

        <Button {...COMMON_BUTTON_PROPS} className='w-full bg-red-500' onClick={removeLink} disabled={!isActive}>
          <Trash className='h-4 w-4' />
        </Button>
      </div>
    </>
  )
}

export function LinkPopover({
  editor: providedEditor,
  hideWhenUnavailable = false,
  onOpenChange,
  autoOpenOnLinkActive = true,
  ...props
}: LinkPopoverProps) {
  const editor = useTiptapEditor(providedEditor)
  const [isOpen, setIsOpen] = React.useState(false)

  // Callbacks
  const handleSetLink = React.useCallback(() => setIsOpen(false), [])
  const handleLinkActive = React.useCallback(() => autoOpenOnLinkActive && setIsOpen(true), [autoOpenOnLinkActive])

  const linkHandler = useLinkHandler({
    editor,
    onSetLink: handleSetLink,
    onLinkActive: handleLinkActive
  })

  const handleOpenChange = React.useCallback(
    (nextIsOpen: boolean) => {
      setIsOpen(nextIsOpen)
      onOpenChange?.(nextIsOpen)
    },
    [onOpenChange]
  )

  // Memoized values
  const linkInSchema = editor ? isMarkInSchema('link', editor) : false

  const isDisabled = React.useMemo(() => {
    if (!editor) return true
    if (editor.isActive('codeBlock')) return true
    try {
      return !editor.can().setLink?.({ href: '' })
    } catch {
      return true
    }
  }, [editor])

  const canSetLink = React.useMemo(() => {
    if (!editor) return false
    try {
      return editor.can().setMark('link')
    } catch {
      return false
    }
  }, [editor])

  const shouldShow = React.useMemo(() => {
    if (!linkInSchema || !editor) {
      return false
    }

    if (hideWhenUnavailable) {
      if (isNodeSelection(editor.state.selection) || !canSetLink) {
        return false
      }
    }

    return editor.isEditable
  }, [linkInSchema, hideWhenUnavailable, editor, canSetLink])

  if (!shouldShow) {
    return null
  }

  const isActive = editor?.isActive('link') ?? false

  return (
    <Popover open={isOpen} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <LinkButton
          disabled={isDisabled}
          data-active-state={isActive ? 'on' : 'off'}
          data-disabled={isDisabled}
          {...props}
        />
      </PopoverTrigger>

      <PopoverContent>
        <LinkMain {...linkHandler} />
      </PopoverContent>
    </Popover>
  )
}
