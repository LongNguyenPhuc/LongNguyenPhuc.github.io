import { AnyExtension, useEditor, useEditorState } from '@tiptap/react'
import { StarterKit } from '@tiptap/starter-kit'
import { Image } from '@tiptap/extension-image'
import { TaskItem } from '@tiptap/extension-task-item'
import { TaskList } from '@tiptap/extension-task-list'
import { TextAlign } from '@tiptap/extension-text-align'
import { Typography } from '@tiptap/extension-typography'
import { Highlight } from '@tiptap/extension-highlight'
import { Subscript } from '@tiptap/extension-subscript'
import { Superscript } from '@tiptap/extension-superscript'
import { Underline } from '@tiptap/extension-underline'
import { Table } from '@tiptap/extension-table'
import { TableRow } from '@tiptap/extension-table-row'
import { Color } from '@tiptap/extension-color'
import TextStyle from '@tiptap/extension-text-style'
import FontFamily from '@tiptap/extension-font-family'
import Placeholder from '@tiptap/extension-placeholder'
import Link from '@tiptap/extension-link'
import {
  ImageResize,
  LineHeight,
  SearchAndReplace,
  TipTapTableCell,
  TipTapTableHeader,
  TrailingNode,
  VideoResize,
  FontSize
} from '../components/tiptap-extension'

interface UseRichTextEditorProps {
  value?: string
  onUpdate?: (html: string) => void
  placeholder?: string
  extensions?: AnyExtension[]
}

export const useRichTextEditor = ({ value, onUpdate, placeholder, extensions = [] }: UseRichTextEditorProps) => {
  const defaultExtensions = [
    StarterKit,
    TextAlign.configure({ types: ['heading', 'paragraph'] }),
    Underline,
    TaskList,
    TaskItem.configure({ nested: true }),
    Highlight.configure({ multicolor: true }),
    Image,
    Typography,
    Superscript,
    Subscript,
    TextStyle,
    FontFamily,
    FontSize,
    LineHeight,
    ImageResize,
    Table.configure({
      resizable: true,
      lastColumnResizable: true,
      allowTableNodeSelection: true
    }),
    TableRow,
    TipTapTableHeader,
    TipTapTableCell,
    Color,
    Link.configure({
      openOnClick: false,
      defaultProtocol: 'https',
      protocols: ['http', 'https'],
      HTMLAttributes: { class: 'text-blue-500 hover:underline cursor-pointer event-pointer' }
    }),
    SearchAndReplace.configure({
      searchResultClass: 'search-result',
      disableRegex: true
    }),
    Placeholder.configure({
      placeholder: placeholder,
      emptyNodeClass:
        'first:before:not-italic first:before:font-normal first:before:text-base first:before:leading-normal'
    }),
    TrailingNode,
    VideoResize.configure({
      controls: false,
      nocookie: true
    })
  ]

  const editor = useEditor({
    immediatelyRender: true,
    editorProps: {
      attributes: {
        autocomplete: 'off',
        autocorrect: 'off',
        autocapitalize: 'off',
        'aria-label': 'Main content area, start typing to enter text.',
        class: 'font-dm-sans prose prose-lg max-w-none focus:outline-none',
        spellcheck: 'false'
      }
    },
    shouldRerenderOnTransaction: false,
    extensions: [...defaultExtensions, ...extensions],
    content: value,
    onUpdate: ({ editor }) => onUpdate?.(editor.getHTML())
  })

  const editorState = useEditorState({
    editor,
    selector: (ctx) => ({
      isBold: ctx.editor.isActive('bold'),
      isItalic: ctx.editor.isActive('italic'),
      isStrike: ctx.editor.isActive('strike'),
      isUnderline: ctx.editor.isActive('underline'),
      isHorizontalRule: ctx.editor.isActive('horizontalRule'),
      isLeftAlign: ctx.editor.isActive('textAlign', 'left'),
      isCenterAlign: ctx.editor.isActive('textAlign', 'center'),
      isRightAlign: ctx.editor.isActive('textAlign', 'right'),
      isJustifyAlign: ctx.editor.isActive('textAlign', 'justify'),
      isCodeBlock: ctx.editor.isActive('codeBlock'),
      isBlockquote: ctx.editor.isActive('blockquote'),
      isSuperscript: ctx.editor.isActive('superscript'),
      isSubscript: ctx.editor.isActive('subscript'),
      isClearFormatting: ctx.editor.isActive('clearFormatting')
    }),

    equalityFn: (prev, next) => {
      if (!next) {
        return false
      }
      return (
        prev.isBold === next.isBold &&
        prev.isItalic === next.isItalic &&
        prev.isStrike === next.isStrike &&
        prev.isUnderline === next.isUnderline &&
        prev.isHorizontalRule === next.isHorizontalRule &&
        prev.isLeftAlign === next.isLeftAlign &&
        prev.isCenterAlign === next.isCenterAlign &&
        prev.isRightAlign === next.isRightAlign &&
        prev.isJustifyAlign === next.isJustifyAlign &&
        prev.isCodeBlock === next.isCodeBlock &&
        prev.isBlockquote === next.isBlockquote &&
        prev.isSuperscript === next.isSuperscript &&
        prev.isSubscript === next.isSubscript &&
        prev.isClearFormatting === next.isClearFormatting
      )
    }
  })

  return { editor, editorState }
}
