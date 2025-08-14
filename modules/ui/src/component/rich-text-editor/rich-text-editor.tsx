// Core
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { EditorContent, EditorContext } from '@tiptap/react'
import { cn } from '@utils/cn'
// App
import { Separator } from '@lib-ui/base/separator'
// --- UI Primitives ---
import {
  HeadingDropdownMenu,
  ListDropdownMenu,
  MarkButton,
  HighlightPopover,
  LinkPopover,
  FontDropdownMenu,
  FontSizeDropdownMenu,
  LineHeightDropdownMenu,
  UploadFile,
  TableEditor,
  TextColorPopover,
  SearchReplacePopover,
  EditorUtilityButtons,
  UndoRedoButton,
  SpecialCharacter,
  UploadVideo
} from './components/tiptap-ui'
import { Button, Toolbar, ToolbarGroup, ToolbarRow, Spacer } from './components/tiptap-ui-primitive'
import { RichTextEditorProps } from './lib/types'
// --- Tiptap CSS ---
import './styles/base.css'
// Icon
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  CodeXml,
  Eraser,
  Italic,
  MinusSquare,
  Quote,
  Strikethrough,
  Underline as UnderlineIcon,
  Superscript as SuperscriptIcon,
  Subscript as SubscriptIcon
} from 'lucide-react'
import { useRichTextEditor } from './hooks/use-rich-text-editor'

export const RichTextEditor = ({
  value,
  onUpdate,
  height,
  placeholder,
  disable = false,
  uploadFileThroughBrowser = false,
  onUploadFile,
  customExtensions = [],
  otherToolbarRow
}: RichTextEditorProps) => {
  // Hooks
  const { t } = useTranslation('component/rich-text-editor')

  const { editor, editorState } = useRichTextEditor({
    value,
    onUpdate,
    placeholder: placeholder ?? t('placeholder'),
    extensions: customExtensions
  })

  useEffect(() => {
    if (editor && value && editor.getHTML() !== value) {
      editor.commands.setContent(value)
    }
  }, [value, editor])

  useEffect(() => {
    if (editor && !disable !== editor.isEditable) {
      editor.setEditable(!disable)
    }
  }, [editor, disable])

  return (
    <EditorContext.Provider value={{ editor }}>
      <div className={cn(disable ? 'pointer-events-none opacity-80' : '')}>
        <Toolbar>
          <ToolbarRow>
            <ToolbarGroup>
              <Button
                type='button'
                data-style='ghost'
                data-active-state={editorState.isBold ? 'on' : 'off'}
                role='button'
                tabIndex={-1}
                aria-label={t('bold')}
                aria-pressed={editorState.isBold}
                tooltip={t('bold')}
                shortcutKeys='Ctrl-b'
                disabled={!editor.isEditable}
                onClick={() => {
                  editor.chain().focus().toggleBold().run()
                }}
              >
                <Bold className='h-4 w-4' />
              </Button>

              <Button
                type='button'
                data-style='ghost'
                data-active-state={editorState.isItalic ? 'on' : 'off'}
                role='button'
                tabIndex={-1}
                aria-label={t('italic')}
                aria-pressed={editorState.isItalic}
                tooltip={t('italic')}
                shortcutKeys='Ctrl-i'
                disabled={!editor.isEditable}
                onClick={() => editor.chain().focus().toggleItalic().run()}
              >
                <Italic className='h-4 w-4' />
              </Button>

              <Button
                type='button'
                data-style='ghost'
                data-active-state={editorState.isUnderline ? 'on' : 'off'}
                role='button'
                tabIndex={-1}
                aria-label={t('underline')}
                aria-pressed={editorState.isUnderline}
                tooltip={t('underline')}
                shortcutKeys='Ctrl-u'
                disabled={!editor.isEditable}
                onClick={() => editor.chain().focus().toggleUnderline().run()}
              >
                <UnderlineIcon className='h-4 w-4' />
              </Button>

              <Button
                type='button'
                data-style='ghost'
                data-active-state={editorState.isStrike ? 'on' : 'off'}
                role='button'
                tabIndex={-1}
                aria-label={t('strike')}
                aria-pressed={editorState.isStrike}
                tooltip={t('strike')}
                shortcutKeys='Ctrl-s'
                disabled={!editor.isEditable}
                onClick={() => editor.chain().focus().toggleStrike().run()}
              >
                <Strikethrough className='h-4 w-4' />
              </Button>

              <Button
                type='button'
                data-style='ghost'
                data-active-state={editorState.isClearFormatting ? 'on' : 'off'}
                role='button'
                tabIndex={-1}
                aria-label={t('clearFormatting')}
                aria-pressed={editorState.isClearFormatting}
                tooltip={t('clearFormatting')}
                shortcutKeys='Ctrl-\\'
                disabled={!editor.isEditable}
                onClick={() => editor.chain().focus().unsetAllMarks().run()}
              >
                <Eraser className='h-4 w-4' />
              </Button>
            </ToolbarGroup>

            <Separator orientation='vertical' className='hidden h-[2.75rem] bg-gray-300 lg:block' />

            <ToolbarGroup>
              <HeadingDropdownMenu />
              <ListDropdownMenu types={['bulletList', 'orderedList', 'taskList']} />
            </ToolbarGroup>

            <Separator orientation='vertical' className='hidden h-[2.75rem] bg-gray-300 lg:block' />

            <ToolbarGroup>
              <FontDropdownMenu />
              <FontSizeDropdownMenu />
              <LineHeightDropdownMenu />
              <Button
                type='button'
                data-style='ghost'
                data-active-state={editorState.isBlockquote ? 'on' : 'off'}
                role='button'
                tabIndex={-1}
                aria-label={t('blockquote')}
                aria-pressed={editorState.isBlockquote}
                tooltip={t('blockquote')}
                shortcutKeys='Ctrl-b'
                disabled={!editor.isEditable}
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
              >
                <Quote className='h-4 w-4' />
              </Button>
            </ToolbarGroup>

            <Spacer className='hidden lg:block' />

            <ToolbarGroup>
              <Button
                type='button'
                data-style='ghost'
                data-active-state={editorState.isSuperscript ? 'on' : 'off'}
                role='button'
                tabIndex={-1}
                aria-label={t('superscript')}
                aria-pressed={editorState.isSuperscript}
                tooltip={t('superscript')}
                shortcutKeys='Ctrl-b'
                disabled={!editor.isEditable}
                onClick={() => editor.chain().focus().toggleSuperscript().run()}
              >
                <SuperscriptIcon className='h-4 w-4' />
              </Button>
              <Button
                type='button'
                data-style='ghost'
                data-active-state={editorState.isSubscript ? 'on' : 'off'}
                role='button'
                tabIndex={-1}
                aria-label={t('subscript')}
                aria-pressed={editorState.isSubscript}
                tooltip={t('subscript')}
                shortcutKeys='Ctrl-b'
                disabled={!editor.isEditable}
                onClick={() => editor.chain().focus().toggleSubscript().run()}
              >
                <SubscriptIcon className='h-4 w-4' />
              </Button>
            </ToolbarGroup>

            <Separator orientation='vertical' className='hidden h-[2.75rem] bg-gray-300 lg:block' />

            <ToolbarGroup>
              <UploadFile type='image' onUploadFile={onUploadFile} uploadThroughBrowser={uploadFileThroughBrowser} />
              <UploadFile type='file' onUploadFile={onUploadFile} uploadThroughBrowser={uploadFileThroughBrowser} />
              <UploadVideo />
            </ToolbarGroup>
          </ToolbarRow>
          <ToolbarRow>
            <ToolbarGroup>
              <MarkButton type='cut' />
              <MarkButton type='copy' />
              <MarkButton type='paste' />
              <MarkButton type='paintFormat' />
            </ToolbarGroup>

            <Separator orientation='vertical' className='hidden h-[2.75rem] bg-gray-300 lg:block' />

            <TableEditor />

            <Separator orientation='vertical' className='hidden h-[2.75rem] bg-gray-300 lg:block' />

            <ToolbarGroup>
              <Button
                type='button'
                data-style='ghost'
                data-active-state={editorState.isHorizontalRule ? 'on' : 'off'}
                role='button'
                tabIndex={-1}
                aria-label={t('horizontalRule')}
                aria-pressed={editorState.isHorizontalRule}
                tooltip={t('horizontalRule')}
                shortcutKeys='Ctrl-Shift-h'
                disabled={!editor.isEditable}
                onClick={() => editor.chain().focus().setHorizontalRule().run()}
              >
                <MinusSquare className='h-4 w-4' />
              </Button>
              <LinkPopover />
              <SpecialCharacter />
            </ToolbarGroup>

            <Separator orientation='vertical' className='hidden h-[2.75rem] bg-gray-300 lg:block' />

            <ToolbarGroup>
              <Button
                type='button'
                data-style='ghost'
                data-active-state={editorState.isLeftAlign ? 'on' : 'off'}
                role='button'
                tabIndex={-1}
                aria-label={t('leftAlign')}
                aria-pressed={editorState.isLeftAlign}
                tooltip={t('leftAlign')}
                shortcutKeys='Ctrl-Shift-l'
                disabled={!editor.isEditable}
                onClick={() => editor.chain().focus().setTextAlign('left').run()}
              >
                <AlignLeft className='h-4 w-4' />
              </Button>
              <Button
                type='button'
                data-style='ghost'
                data-active-state={editorState.isCenterAlign ? 'on' : 'off'}
                role='button'
                tabIndex={-1}
                aria-label={t('centerAlign')}
                aria-pressed={editorState.isCenterAlign}
                tooltip={t('centerAlign')}
                shortcutKeys='Ctrl-Shift-e'
                disabled={!editor.isEditable}
                onClick={() => editor.chain().focus().setTextAlign('center').run()}
              >
                <AlignCenter className='h-4 w-4' />
              </Button>
              <Button
                type='button'
                data-style='ghost'
                data-active-state={editorState.isRightAlign ? 'on' : 'off'}
                role='button'
                tabIndex={-1}
                aria-label={t('rightAlign')}
                aria-pressed={editorState.isRightAlign}
                tooltip={t('rightAlign')}
                shortcutKeys='Ctrl-Shift-r'
                disabled={!editor.isEditable}
                onClick={() => editor.chain().focus().setTextAlign('right').run()}
              >
                <AlignRight className='h-4 w-4' />
              </Button>
              <Button
                type='button'
                data-style='ghost'
                data-active-state={editorState.isJustifyAlign ? 'on' : 'off'}
                role='button'
                tabIndex={-1}
                aria-label={t('justifyAlign')}
                aria-pressed={editorState.isJustifyAlign}
                tooltip={t('justifyAlign')}
                shortcutKeys='Ctrl-Shift-j'
                disabled={!editor.isEditable}
                onClick={() => editor.chain().focus().setTextAlign('justify').run()}
              >
                <AlignJustify className='h-4 w-4' />
              </Button>
            </ToolbarGroup>

            <Separator orientation='vertical' className='hidden h-[2.75rem] bg-gray-300 lg:block' />

            <ToolbarGroup>
              <TextColorPopover />
              <HighlightPopover />
            </ToolbarGroup>

            <Spacer />

            <ToolbarGroup>
              <UndoRedoButton action='undo' />
              <UndoRedoButton action='redo' />
            </ToolbarGroup>

            <Separator orientation='vertical' className='hidden h-[2.75rem] bg-gray-300 lg:block' />

            <ToolbarGroup>
              <SearchReplacePopover />
            </ToolbarGroup>

            <Separator orientation='vertical' className='hidden h-[2.75rem] bg-gray-300 lg:block' />

            <ToolbarGroup>
              <Button
                type='button'
                data-style='ghost'
                data-active-state={editorState.isCodeBlock ? 'on' : 'off'}
                role='button'
                tabIndex={-1}
                aria-label={t('codeBlock')}
                aria-pressed={editorState.isCodeBlock}
                tooltip={t('codeBlock')}
                shortcutKeys='Ctrl-Shift-k'
                disabled={!editor.isEditable}
                onClick={() => editor.chain().focus().setCodeBlock().run()}
              >
                <CodeXml className='h-4 w-4' />
              </Button>
            </ToolbarGroup>

            <Separator orientation='vertical' className='hidden h-[2.75rem] bg-gray-300 lg:block' />

            <ToolbarGroup>
              <EditorUtilityButtons />
            </ToolbarGroup>
          </ToolbarRow>
          {otherToolbarRow}
        </Toolbar>
        <EditorContent
          editor={editor}
          disabled={!editor.isEditable}
          role='presentation'
          className={cn(
            'scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-200 hover:scrollbar-thumb-gray-300 scrollbar-track-transparent h-[400px] flex-1 overflow-y-auto rounded-b-md border border-t-0 border-gray-300 bg-white px-4 py-6',
            height
          )}
        />
      </div>
    </EditorContext.Provider>
  )
}
