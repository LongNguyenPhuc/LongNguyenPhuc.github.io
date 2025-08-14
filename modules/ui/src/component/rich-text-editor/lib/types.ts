import { BodyType, ErrorType } from '@api/config/custom-instance'
import { PostFileBody } from '@api/models'
import { UseMutateAsyncFunction } from '@tanstack/react-query'
import { AnyExtension } from '@tiptap/react'

export type RichTextEditorProps = {
  value: string
  onUpdate?: (editor: unknown) => void
  height?: string
  placeholder?: string
  disable?: boolean
  uploadFileThroughBrowser?: boolean
  onUploadFile?: UseMutateAsyncFunction<
    void,
    ErrorType<void>,
    {
      data: BodyType<PostFileBody>
    },
    unknown
  >
  customExtensions?: AnyExtension[]
  otherToolbarRow?: React.ReactNode
}
