import htmlParse from 'html-react-parser'

export function EditorContentRender({ content = '', className }: { content?: string; className?: string }) {
  return <div className={className}>{htmlParse(content)}</div>
}
