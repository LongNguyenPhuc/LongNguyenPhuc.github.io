import { ChangeEvent, useCallback, useRef, useState } from 'react'
import { type Editor } from '@tiptap/react'
import { Button, toast, toastErrorMessage } from '@lib-ui/base'
import { useTiptapEditor } from '../../../hooks/use-tiptap-editor'
import { ImagePlus, FilePlus } from 'lucide-react'
import type { ButtonProps } from '../../tiptap-ui-primitive/button/lib/types'
import { Button as TipTapButton } from '../../tiptap-ui-primitive'
import { Popover, PopoverContent, PopoverTrigger } from '@lib-ui/base/popover'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@lib-ui/base/tabs'
import { Input } from '@lib-ui/base/input'
import { QueryData } from '@api/types/base'
import { ApiFile } from '@lib-ui/component/data-table/components/data-table-file-cell/lib/types'
import { isAllowedFile, isImage } from './libs/helpers'
import links from '@links/index'
import { cn } from '@utils/cn'
import { useTranslation } from 'react-i18next'
import { UseMutateAsyncFunction } from '@tanstack/react-query'
import { BodyType, ErrorType } from '@api/config/custom-instance'
import { PostFileBody } from '@api/models'

export interface UploadFileProps extends Omit<ButtonProps, 'type'> {
  editor?: Editor | null
  type: 'file' | 'image'
  uploadThroughBrowser?: boolean
  onUploadFile?: UseMutateAsyncFunction<
    void,
    ErrorType<void>,
    {
      data: BodyType<PostFileBody>
    },
    unknown
  >
}

// Configuration constants moved outside component
const UPLOAD_CONFIG = {
  image: {
    label: 'uploadImage.label',
    accept: 'image/*',
    icon: ImagePlus,
    validator: (fileName: string) => isImage(fileName),
    invalidMessage: 'uploadImage.invalid',
    errorMessage: 'uploadImage.error',
    isUploading: 'uploadImage.isUploading',
    clickToUpload: 'uploadImage.clickToUpload',
    addButton: 'uploadImage.addButton',
    tabLabel: 'uploadImage.tabLabel',
    typeCheck: (fileType: string) => fileType.startsWith('image/'),
    placeholder: 'https://example.com/image.jpg',
    insertContent: (editor: Editor, url: string, fileName?: string) =>
      editor.chain().focus().setImage({ src: url, alt: fileName }).run()
  },
  file: {
    label: 'uploadFile.label',
    accept: '.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt',
    icon: FilePlus,
    validator: (fileName: string) => isAllowedFile(fileName),
    invalidMessage: 'uploadFile.invalid',
    errorMessage: 'uploadFile.error',
    isUploading: 'uploadFile.isUploading',
    clickToUpload: 'uploadFile.clickToUpload',
    addButton: 'uploadFile.addButton',
    tabLabel: 'uploadFile.tabLabel',
    typeCheck: (fileType: string) => fileType.startsWith('application/'),
    placeholder: 'https://example.com/file.pdf',
    insertContent: (editor: Editor, url: string, fileName?: string) =>
      editor
        .chain()
        .focus()
        .setLink({ href: url, class: 'underline text-blue-500' })
        .insertContent(fileName || url.split('/').pop() || 'file')
        .run()
  }
} as const

export const UploadFile = function UploadFile({
  editor: providedEditor,
  type = 'image',
  uploadThroughBrowser = false,
  onUploadFile
}: UploadFileProps) {
  // const { mutateAsync: postFile } = usePostFile()

  const { t } = useTranslation('component/rich-text-editor')

  const [isUploading, setIsUploading] = useState(false)
  const [url, setUrl] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const editor = useTiptapEditor(providedEditor)
  const config = UPLOAD_CONFIG[type]
  const Icon = config.icon

  // File validation handler
  const handleFileValidation = useCallback(
    (file: File): boolean => {
      if (!config.validator(file.name)) {
        toast.error({
          content: <div>{t(config.invalidMessage)}</div>
        })
        return false
      }
      return config.typeCheck(file.type)
    },
    [config, t]
  )

  // File upload handler
  const insertContent = useCallback(
    async (file: File) => {
      if (!editor) return
      if (!handleFileValidation(file)) return

      try {
        const res = await onUploadFile?.({ data: { file } })

        if ((res as unknown as QueryData).status === 'fail') {
          throw new Error(t(config.errorMessage))
        }

        const responseData = (res as unknown as QueryData<ApiFile & { filenName: string }>).responseData
        const filePath = responseData.original
        const fileName = responseData.filenName
        const fileUrl = `${links.imageEndpoint}/${filePath}`

        config.insertContent(editor, fileUrl, fileName)
      } catch (error) {
        toastErrorMessage(error instanceof Error ? error : new Error(t(config.errorMessage)))
      }
    },
    [config, editor, handleFileValidation, onUploadFile, t]
  )

  // File input change handler
  const handleFileUpload = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0]
      if (!file) return

      setIsUploading(true)
      await insertContent(file)
      setIsUploading(false)

      // Clean up the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    },
    [insertContent]
  )

  // URL insertion handler
  const handleUrlInsert = useCallback(() => {
    if (!url.trim() || !editor) return
    config.insertContent(editor, url)
    setUrl('')
  }, [config, editor, url])

  // Click handler for file upload area
  const handleUploadAreaClick = useCallback(() => {
    fileInputRef.current?.click()
  }, [])

  // URL input change handler
  const handleUrlChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value)
  }, [])

  // Early return if no editor
  if (!editor) return null

  const isDisabled = !editor.isEditable

  return (
    <Popover>
      <PopoverTrigger asChild>
        <TipTapButton
          type='button'
          disabled={isDisabled}
          data-style='ghost'
          data-disabled={isDisabled}
          role='button'
          tabIndex={-1}
          aria-label={t(config.label)}
          tooltip={t(config.label)}
          className='ring-offset-background hover:bg-muted focus-visible:ring-ring flex h-8 w-8 items-center justify-center rounded-md p-0 text-sm font-medium text-gray-900 transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none'
        >
          <Icon className='h-4 w-4' />
        </TipTapButton>
      </PopoverTrigger>
      <PopoverContent className='w-80 p-3'>
        <Tabs defaultValue='upload'>
          <TabsList className='mb-2 grid grid-cols-2'>
            {uploadThroughBrowser && <TabsTrigger value='upload'>{t(config.label)}</TabsTrigger>}
            <TabsTrigger value='url'>{t(config.tabLabel)}</TabsTrigger>
          </TabsList>

          {uploadThroughBrowser && (
            <TabsContent value='upload' className={cn('space-y-3', isUploading ? 'animate-pulse' : '')}>
              <div className='text-sm font-medium'>{t(config.label)}</div>
              <div
                className={cn(
                  'hover:bg-muted/50 flex cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed border-gray-400 p-6 transition-colors',
                  isUploading && 'bg-gray-200'
                )}
                onClick={handleUploadAreaClick}
              >
                <input
                  ref={fileInputRef}
                  type='file'
                  className='hidden'
                  onChange={handleFileUpload}
                  accept={config.accept}
                />
                <div className='flex flex-col items-center gap-2'>
                  <Icon className='text-muted-foreground h-6 w-6' />
                </div>
                <div className='text-muted-foreground text-center text-sm'>
                  {isUploading ? t(config.isUploading) : t(config.clickToUpload)}
                </div>
                <div className='text-muted-foreground text-center text-xs'>{t(config.label)}</div>
              </div>
            </TabsContent>
          )}

          <TabsContent value='url' className='space-y-3'>
            <div className='text-sm font-medium'>{t(config.tabLabel)}</div>
            <div className='flex gap-2'>
              <div className='flex-1'>
                <Input
                  type='url'
                  placeholder={config.placeholder}
                  value={url}
                  onChange={handleUrlChange}
                  className='border-gray-400'
                />
              </div>
              <Button type='button' onClick={handleUrlInsert} disabled={!url.trim()}>
                {t(config.addButton)}
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </PopoverContent>
    </Popover>
  )
}

export default UploadFile
