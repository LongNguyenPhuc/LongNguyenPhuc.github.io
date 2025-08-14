// Core
import { useState, useEffect, useRef } from 'react'
import { type Editor } from '@tiptap/react'
import { useTranslation } from 'react-i18next'
// App
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@lib-ui/base/dialog'
// Icons
import { Eye, Maximize2, Minimize2, Printer } from 'lucide-react'
// Internal
import { Button } from '../../tiptap-ui-primitive'
import { useTiptapEditor } from '../../../hooks/use-tiptap-editor'
import { TextEditorContent } from '../text-editor-content'

export function EditorUtilityButtons({ editor: providedEditor }: { editor?: Editor | null }) {
  const editor = useTiptapEditor(providedEditor)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [previewOpen, setPreviewOpen] = useState(false)
  const editorContainerRef = useRef<HTMLDivElement | null>(null)
  const { t } = useTranslation('component/rich-text-editor')

  useEffect(() => {
    if (editor && !editorContainerRef.current) {
      const editorElement = editor.view.dom

      let parent = editorElement.parentElement
      let foundContainer = false

      while (parent && !foundContainer) {
        if (parent.classList.contains('tiptap-editor-container')) {
          editorContainerRef.current = parent as HTMLDivElement
          foundContainer = true
          break
        }

        if (
          parent.classList.contains('tiptap-editor') ||
          parent.classList.contains('editor-container') ||
          parent.classList.contains('ProseMirror-container')
        ) {
          editorContainerRef.current = parent as HTMLDivElement
          foundContainer = true
          break
        }

        parent = parent.parentElement
      }

      if (!foundContainer && editorElement.parentElement) {
        parent = editorElement.parentElement
        while (parent) {
          const styles = window.getComputedStyle(parent)
          if (styles.position !== 'static' || (parent.tagName === 'DIV' && parent.children?.length > 1)) {
            editorContainerRef.current = parent as HTMLDivElement
            break
          }
          parent = parent.parentElement
        }

        if (!editorContainerRef.current && editorElement.parentElement) {
          editorContainerRef.current = editorElement.parentElement as HTMLDivElement
        }
      }
    }
  }, [editor])

  const toggleFullscreen = () => {
    if (!editorContainerRef.current) {
      return
    }

    if (!isFullscreen) {
      editorContainerRef.current.classList.add('editor-fullscreen')

      editorContainerRef.current.dataset.originalStyles = editorContainerRef.current.getAttribute('style') || ''

      editorContainerRef.current.style.position = 'fixed'
      editorContainerRef.current.style.top = '0'
      editorContainerRef.current.style.left = '0'
      editorContainerRef.current.style.right = '0'
      editorContainerRef.current.style.bottom = '0'
      editorContainerRef.current.style.width = '100vw'
      editorContainerRef.current.style.height = '100vh'
      editorContainerRef.current.style.zIndex = '9999'
      editorContainerRef.current.style.backgroundColor = 'white'
      editorContainerRef.current.style.overflow = 'auto'
      editorContainerRef.current.style.padding = '2rem'

      document.body.style.overflow = 'hidden'
    } else {
      editorContainerRef.current.classList.remove('editor-fullscreen')

      if (editorContainerRef.current.dataset.originalStyles) {
        editorContainerRef.current.setAttribute('style', editorContainerRef.current.dataset.originalStyles)
      } else {
        editorContainerRef.current.removeAttribute('style')
      }

      document.body.style.overflow = ''
    }

    setIsFullscreen(!isFullscreen)
  }

  const handlePrint = () => {
    if (!editor) return

    const iframe = document.createElement('iframe')
    iframe.style.position = 'absolute'
    iframe.style.top = '-9999px'
    document.body.appendChild(iframe)

    const content = editor.getHTML()

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>In nội dung</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.5;
              color: #333;
              padding: 20px;
            }
            img {
              max-width: 100%;
              height: auto;
            }
            table {
              border-collapse: collapse;
              width: 100%;
            }
            table td, table th {
              border: 1px solid #ddd;
              padding: 8px;
            }
            @media print {
              @page {
                margin: 1cm;
              }
            }
          </style>
        </head>
        <body>
          ${content}
        </body>
      </html>
    `

    iframe.contentWindow?.document.open()
    iframe.contentWindow?.document.write(htmlContent)
    iframe.contentWindow?.document.close()
    iframe.onload = () => {
      iframe.contentWindow?.print()
      // Remove iframe after print
      setTimeout(() => {
        document.body.removeChild(iframe)
      }, 1000)
    }
  }

  if (!editor) {
    return null
  }

  const isDisabled = !editor?.isEditable

  return (
    <div className='flex items-center space-x-1'>
      <Button
        type='button'
        data-style='ghost'
        data-appearance='default'
        role='button'
        tabIndex={-1}
        aria-label={isFullscreen ? t('zoomOut') : t('fullscreen')}
        tooltip={isFullscreen ? t('zoomOut') : t('fullscreen')}
        disabled={isDisabled}
        onClick={toggleFullscreen}
      >
        {isFullscreen ? <Minimize2 className='h-4 w-4' /> : <Maximize2 className='h-4 w-4' />}
      </Button>

      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogTrigger asChild>
          <Button
            type='button'
            data-style='ghost'
            data-appearance='default'
            role='button'
            tabIndex={-1}
            aria-label={t('preview')}
            tooltip={t('preview')}
            disabled={isDisabled}
          >
            <Eye className='h-4 w-4' />
          </Button>
        </DialogTrigger>
        <DialogContent className='max-h-[80vh] max-w-4xl overflow-y-auto'>
          <DialogTitle className='border-b border-gray-300 pb-2'>{t('preview')}</DialogTitle>
          <DialogDescription></DialogDescription>
          <TextEditorContent content={editor.getHTML()} />
        </DialogContent>
      </Dialog>

      <Button
        type='button'
        data-style='ghost'
        data-appearance='default'
        role='button'
        tabIndex={-1}
        aria-label={t('print')}
        tooltip={t('print')}
        disabled={isDisabled}
        onClick={handlePrint}
      >
        <Printer className='h-4 w-4' />
      </Button>
    </div>
  )
}
