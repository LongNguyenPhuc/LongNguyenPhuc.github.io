export { RichTextEditor } from './rich-text-editor'
export type { RichTextEditorProps } from './lib/types'

// Re-export
export {
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
  UploadVideo,
  TextEditorContent
} from './components/tiptap-ui'

// Re-export UI primitives
export { Button, Toolbar, ToolbarGroup, ToolbarRow, Spacer } from './components/tiptap-ui-primitive'

// Re-export extensions
export {
  ImageResize,
  SearchAndReplace,
  TipTapTableCell,
  TipTapTableHeader,
  TrailingNode,
  VideoResize,
  LineHeight
} from './components/tiptap-extension'
