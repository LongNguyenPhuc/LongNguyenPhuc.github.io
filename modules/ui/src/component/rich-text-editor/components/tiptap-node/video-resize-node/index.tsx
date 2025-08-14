import React, { useState, useRef, useEffect } from 'react'
import { NodeViewWrapper } from '@tiptap/react'
import { AlignCenter, AlignLeft, AlignRight, Trash2 } from 'lucide-react'

interface VideoNodeAttributes {
  src: string
  style?: string
  width?: number
  height?: number
}

interface VideoNodeProps {
  node: {
    attrs: VideoNodeAttributes
  }
  updateAttributes: (attrs: Partial<VideoNodeAttributes>) => void
  deleteNode?: () => void
}

export default (props: VideoNodeProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [showControls, setShowControls] = useState(false)

  const isMobile = () => document.documentElement.clientWidth < 768

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

  const resizeImage = (size: 's' | 'm' | 'l' | 'full') => {
    if (containerRef.current) {
      const parentWidth = containerRef.current.parentElement?.offsetWidth || 800
      let newWidth: number
      let newHeight: number

      switch (size) {
        case 's':
          newWidth = 640
          newHeight = 360
          break
        case 'm':
          newWidth = 854
          newHeight = 480
          break
        case 'l':
          newWidth = 1280
          newHeight = 720
          break
        case 'full':
          newWidth = parentWidth
          newHeight = (parentWidth * 9) / 16
          break
        default:
          newWidth = parentWidth * 0.5
          newHeight = (parentWidth * 9) / 16
      }

      containerRef.current.style.width = `${newWidth}px`
      containerRef.current.style.height = `${newHeight}px`

      props.updateAttributes({
        width: newWidth,
        height: newHeight
      })
    }
  }

  const handleRemoveImage = () => {
    if (props.deleteNode) {
      props.deleteNode()
    }
  }

  return (
    <NodeViewWrapper>
      <div
        ref={containerRef}
        className='relative flex aspect-video items-center justify-center border-2 border-dashed border-[#6C6C6C]'
        style={{
          width: `${props.node.attrs.width}px`,
          height: `${props.node.attrs.height}px`,
          margin: props.node.attrs.style?.includes('margin')
            ? props.node.attrs.style.replace('margin: ', '')
            : props.node.attrs.style
        }}
        onClick={handleContainerClick}
      >
        <iframe
          src={props.node.attrs.src}
          title='video'
          allowFullScreen={true}
          className='h-full w-full rounded-md p-2'
          height={props.node.attrs.height}
          width={props.node.attrs.width}
          style={{
            margin: props.node.attrs.style?.includes('margin')
              ? props.node.attrs.style.replace('margin: ', '')
              : props.node.attrs.style
          }}
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
            <span
              className='cursor-pointer text-xs font-medium hover:text-blue-500'
              onClick={() => resizeImage('full')}
            >
              Full
            </span>
            <div style={{ width: '1px', height: '16px', backgroundColor: '#ddd', margin: '0 4px' }} />
            <Trash2 size={16} className='cursor-pointer hover:text-red-500' onClick={handleRemoveImage} />
          </div>
        )}
      </div>
    </NodeViewWrapper>
  )
}
