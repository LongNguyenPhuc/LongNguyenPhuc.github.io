import React, { useState, useRef, useEffect } from 'react'
import { NodeViewWrapper } from '@tiptap/react'
import { AlignCenter, AlignLeft, AlignRight, Edit2, Trash2 } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@lib-ui/base/dialog'
import { Input } from '@lib-ui/base/input'
import { Button, Label } from '@lib-ui/base'

interface ImageNodeAttributes {
  src: string
  alt?: string
  title?: string
  style?: string
  width?: number
}

interface ImageNodeProps {
  node: {
    attrs: ImageNodeAttributes
  }
  updateAttributes: (attrs: Partial<ImageNodeAttributes>) => void
  deleteNode?: () => void
}

export default (props: ImageNodeProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [showControls, setShowControls] = useState(false)
  const [imageAlt, setImageAlt] = useState(props.node.attrs.alt || '')
  const [imageTitle, setImageTitle] = useState(props.node.attrs.title || '')
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const isMobile = () => document.documentElement.clientWidth < 768

  const dotSize = isMobile() ? 16 : 9
  const dotPosition = isMobile() ? '-8px' : '-4px'

  useEffect(() => {
    // Handle clicks outside the component to hide controls
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowControls(false)
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  const handleContainerClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setShowControls(true)

    if (isMobile()) {
      const proseMirror = document.querySelector('.ProseMirror-focused')
      if (proseMirror instanceof HTMLElement) proseMirror.blur()
    }
  }

  const startResize = (e: React.MouseEvent, index: number) => {
    e.preventDefault()
    const initialX = e.clientX
    const initialWidth = containerRef.current?.offsetWidth || 0

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const deltaX = index % 2 === 0 ? -(moveEvent.clientX - initialX) : moveEvent.clientX - initialX
      const newWidth = initialWidth + deltaX

      if (containerRef.current) {
        containerRef.current.style.width = `${newWidth}px`
      }

      props.updateAttributes({
        width: newWidth
      })
    }

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }

  const handleTouchStart = (e: React.TouchEvent, index: number) => {
    e.preventDefault()
    const initialX = e.touches[0].clientX
    const initialWidth = containerRef.current?.offsetWidth || 0

    const handleTouchMove = (moveEvent: TouchEvent) => {
      const deltaX =
        index % 2 === 0 ? -(moveEvent.touches[0].clientX - initialX) : moveEvent.touches[0].clientX - initialX
      const newWidth = initialWidth + deltaX

      if (containerRef.current) {
        containerRef.current.style.width = `${newWidth}px`
      }

      props.updateAttributes({
        width: newWidth
      })
    }

    const handleTouchEnd = () => {
      document.removeEventListener('touchmove', handleTouchMove)
      document.removeEventListener('touchend', handleTouchEnd)
    }

    document.addEventListener('touchmove', handleTouchMove)
    document.addEventListener('touchend', handleTouchEnd)
  }

  const alignImage = (position: 'left' | 'center' | 'right') => {
    if (containerRef.current) {
      let margin = ''

      switch (position) {
        case 'left':
          margin = '0 auto 0 0'
          break
        case 'center':
          margin = '0 auto'
          break
        case 'right':
          margin = '0 0 0 auto'
          break
      }
      containerRef.current.style.margin = margin
      props.updateAttributes({
        style: 'margin: ' + margin
      })
    }
  }

  const resizeImage = (size: 's' | 'm' | 'l') => {
    if (containerRef.current) {
      const parentWidth = containerRef.current.parentElement?.offsetWidth || 800
      let newWidth: number

      switch (size) {
        case 's':
          newWidth = parentWidth * 0.3
          break
        case 'm':
          newWidth = parentWidth * 0.5
          break
        case 'l':
          newWidth = parentWidth * 0.8
          break
        default:
          newWidth = parentWidth * 0.5
      }

      containerRef.current.style.width = `${newWidth}px`

      props.updateAttributes({
        width: newWidth
      })
    }
  }

  const handleRemoveImage = () => {
    if (props.deleteNode) {
      props.deleteNode()
    }
  }

  const handleUpdateImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (props.node.attrs.title || props.node.attrs.alt) {
      setShowControls(false)
      setIsDialogOpen(true)
    }
  }

  const handleCloseUpdateImage = () => {
    setIsDialogOpen(false)
    setShowControls(true)
  }

  const handleSaveImage = () => {
    props.updateAttributes({ title: imageTitle, alt: imageAlt })
    handleCloseUpdateImage()
  }

  const resizeDots = [0, 1, 2, 3].map((index) => {
    const positions = [
      { top: dotPosition, left: dotPosition, cursor: 'nwse-resize' as const },
      { top: dotPosition, right: dotPosition, cursor: 'nesw-resize' as const },
      { bottom: dotPosition, left: dotPosition, cursor: 'nesw-resize' as const },
      { bottom: dotPosition, right: dotPosition, cursor: 'nwse-resize' as const }
    ]

    return (
      showControls && (
        <div
          key={`dot-${index}`}
          style={{
            position: 'absolute',
            width: `${dotSize}px`,
            height: `${dotSize}px`,
            borderRadius: '50%',
            border: '1.5px solid #6C6C6C',
            ...positions[index],
            cursor: positions[index].cursor,
            zIndex: 999
          }}
          onMouseDown={(e) => startResize(e, index)}
          onTouchStart={(e) => handleTouchStart(e, index)}
        />
      )
    )
  })

  return (
    <NodeViewWrapper>
      <div
        ref={containerRef}
        className={`relative ${showControls ? 'border border-dashed border-[#6C6C6C]' : ''}`}
        onClick={handleContainerClick}
        style={{
          width: `${props.node.attrs.width}px`,
          margin: props.node.attrs.style?.includes('margin')
            ? props.node.attrs.style.replace('margin: ', '')
            : props.node.attrs.style
        }}
      >
        <img
          src={props.node.attrs.src}
          alt={props.node.attrs.alt || ''}
          title={props.node.attrs.title || ''}
          className='h-auto'
          style={{
            margin: props.node.attrs.style?.includes('margin')
              ? props.node.attrs.style.replace('margin: ', '')
              : props.node.attrs.style
          }}
          width={props.node.attrs.width}
        />

        {showControls && (
          <div className='absolute top-[-30px] left-1/2 z-999 flex -translate-x-1/2 transform items-center gap-2 border border-[#ddd] bg-white p-3'>
            <AlignLeft size={16} className='cursor-pointer hover:text-blue-500' onClick={() => alignImage('left')} />
            <AlignCenter
              size={16}
              className='cursor-pointer hover:text-blue-500'
              onClick={() => alignImage('center')}
            />
            <AlignRight size={16} className='cursor-pointer hover:text-blue-500' onClick={() => alignImage('right')} />
            <div style={{ width: '1px', height: '16px', backgroundColor: '#ddd', margin: '0 4px' }} />
            <span className='cursor-pointer text-xs font-medium hover:text-blue-500' onClick={() => resizeImage('s')}>
              S
            </span>
            <span className='cursor-pointer text-xs font-medium hover:text-blue-500' onClick={() => resizeImage('m')}>
              M
            </span>
            <span className='cursor-pointer text-xs font-medium hover:text-blue-500' onClick={() => resizeImage('l')}>
              L
            </span>
            <div style={{ width: '1px', height: '16px', backgroundColor: '#ddd', margin: '0 4px' }} />
            <Edit2 size={16} className='cursor-pointer hover:text-blue-500' onClick={handleUpdateImage} />
            <Trash2 size={16} className='cursor-pointer hover:text-red-500' onClick={handleRemoveImage} />
          </div>
        )}
        {resizeDots}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className='z-[51] sm:max-w-[625px]'>
            <DialogHeader>
              <DialogTitle className='text-[20px]'>Chỉnh sửa</DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
            <form onClick={(e) => e.stopPropagation()}>
              <div>
                <Label htmlFor='title'>Tiêu đề</Label>
                <Input
                  placeholder='Tiêu đề'
                  name='title'
                  value={imageTitle}
                  className='w-full'
                  onChange={(e) => {
                    setImageTitle(e.target.value)
                  }}
                />
              </div>
              <div>
                <Label htmlFor='alt'>ALT</Label>
                <Input
                  placeholder='ALT'
                  name='alt'
                  value={imageAlt}
                  onChange={(e) => {
                    setImageAlt(e.target.value)
                  }}
                />
              </div>
              <div className='flex justify-end gap-2 pt-4'>
                <Button
                  type='button'
                  variant='outline'
                  onClick={handleCloseUpdateImage}
                  className='flex h-16 w-50 items-start justify-start'
                >
                  Đóng
                </Button>
                <Button
                  type='button'
                  variant='default'
                  className='flex h-16 w-50 items-start justify-start'
                  onClick={handleSaveImage}
                >
                  Lưu
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </NodeViewWrapper>
  )
}
