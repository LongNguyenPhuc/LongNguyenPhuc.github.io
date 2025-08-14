import { LinkHandlerProps } from './types'
import { useState, useEffect, useCallback } from 'react'

export const useLinkHandler = (props: LinkHandlerProps) => {
  const { editor, onSetLink, onLinkActive } = props
  const [url, setUrl] = useState<string>('')

  // Effect to initialize URL when component mounts or selection changes
  useEffect(() => {
    if (!editor) return

    const updateLinkState = () => {
      const { href } = editor.getAttributes('link')
      const newUrl = href || ''
      setUrl(newUrl)

      if (editor.isActive('link') && onLinkActive) {
        onLinkActive()
      }
    }

    // Listen for selection changes
    editor.on('selectionUpdate', updateLinkState)

    return () => {
      editor.off('selectionUpdate', updateLinkState)
    }
  }, [editor, onLinkActive])

  const setLink = useCallback(() => {
    if (!url || !editor) return

    const { from, to } = editor.state.selection
    const text = editor.state.doc.textBetween(from, to)

    editor
      .chain()
      .focus()
      .extendMarkRange('link')
      .insertContent({
        type: 'text',
        text: text || url,
        marks: [{ type: 'link', attrs: { href: url } }]
      })
      .run()

    onSetLink?.()
  }, [editor, onSetLink, url])

  const removeLink = useCallback(() => {
    if (!editor) return
    editor.chain().focus().unsetMark('link', { extendEmptyMarkRange: true }).setMeta('preventAutolink', true).run()
    setUrl('')
  }, [editor])

  return {
    url,
    setUrl,
    setLink,
    removeLink,
    isActive: editor?.isActive('link') || false
  }
}
