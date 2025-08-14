import type { Editor } from '@tiptap/react'
import { useCurrentEditor } from '@tiptap/react'
import { useMemo } from 'react'

export function useTiptapEditor(providedEditor?: Editor | null): Editor | null {
  const { editor: coreEditor } = useCurrentEditor()
  return useMemo(() => providedEditor || coreEditor, [providedEditor, coreEditor])
}
