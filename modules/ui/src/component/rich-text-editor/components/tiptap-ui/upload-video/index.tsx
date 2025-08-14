import * as React from 'react'
import { type Editor } from '@tiptap/react'
import { Button } from '@lib-ui/base/button'
import { useTiptapEditor } from '../../../hooks/use-tiptap-editor'
import type { ButtonProps } from '../../tiptap-ui-primitive/button/lib/types'
import { Button as TipTapButton } from '../../tiptap-ui-primitive'
import { Popover, PopoverContent, PopoverTrigger } from '@lib-ui/base/popover'
import { Input } from '@lib-ui/base/input'
import { Youtube as YoutubeIcon, ImagePlus } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { toast } from '@lib-ui/base'

export interface UploadVideoProps extends ButtonProps {
  editor?: Editor | null
  width?: string
  height?: string
}

// Configuration constants moved outside component
const UPLOAD_CONFIG = {
  video: {
    label: 'Video',
    accept: 'video/*',
    icon: ImagePlus,
    validator: (url: string) =>
      url.includes('https://www.youtube.com/watch?v=') || url.includes('https://www.youtube.com/embed/'),
    invalidMessage: 'uploadVideo.invalid',
    typeCheck: (fileType: string) => fileType.startsWith('video/'),
    placeholder: 'https://www.youtube.com/watch?v=VIDEO_ID',
    insertContent: (editor: Editor, url: string, width?: string, height?: string) =>
      editor.commands.setYoutubeVideo({
        src: url.replace('watch?v=', 'embed/'),
        ...(width ? { width: parseInt(width, 10) } : {}),
        ...(height ? { height: parseInt(height, 10) } : {})
      })
  }
} as const

export const UploadVideo = function UploadVideo({ editor: providedEditor, width, height }: UploadVideoProps) {
  const { t } = useTranslation('component/rich-text-editor')

  const [url, setUrl] = React.useState('')
  const editor = useTiptapEditor(providedEditor)

  // URL insertion handler
  const handleUrlInsert = React.useCallback(() => {
    if (!url.trim() || !editor) return
    if (!UPLOAD_CONFIG.video.validator(url)) {
      toast.error({
        content: <div>{t(UPLOAD_CONFIG.video.invalidMessage)}</div>
      })
      return
    }
    UPLOAD_CONFIG.video.insertContent(editor, url, width, height)
    setUrl('')
  }, [editor, t, url, height, width])

  // URL input change handler
  const handleUrlChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
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
          aria-label={UPLOAD_CONFIG.video.label}
          tooltip={UPLOAD_CONFIG.video.label}
          className='ring-offset-background hover:bg-muted focus-visible:ring-ring flex h-8 w-8 items-center justify-center rounded-md p-0 text-sm font-medium text-gray-900 transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none'
        >
          <YoutubeIcon className='h-4 w-4' />
        </TipTapButton>
      </PopoverTrigger>
      <PopoverContent className='w-80 p-3'>
        <div className='text-sm font-medium'>URL</div>
        <div className='mt-2 flex gap-2'>
          <Input
            type='url'
            placeholder={UPLOAD_CONFIG.video.placeholder}
            value={url}
            onChange={handleUrlChange}
            className='border-gray-400'
          />
          <Button type='button' onClick={handleUrlInsert} disabled={!url.trim()}>
            {t('uploadVideo.addButton')}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default UploadVideo
