import { cn } from '@utils/cn'
import '../../../styles/base.css'

export const TextEditorContent = ({ content, className }: { content: string; className?: string }) => {
  return <div className={cn('tiptap ProseMirror', className)} dangerouslySetInnerHTML={{ __html: content }} />
}
