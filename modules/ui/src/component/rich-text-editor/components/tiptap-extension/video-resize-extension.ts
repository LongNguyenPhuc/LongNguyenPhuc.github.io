import { NodeViewProps, ReactNodeViewRenderer } from '@tiptap/react'
import VideoNodeComponent from '../tiptap-node/video-resize-node'
import Youtube from '@tiptap/extension-youtube'

export const VideoResize = Youtube.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      width: {
        default: '640',
        parseHTML: (element) => element.getAttribute('width')
      },
      height: {
        default: '480',
        parseHTML: (element) => element.getAttribute('height')
      },
      style: {
        default: null,
        parseHTML: (element) => element.getAttribute('style')
      }
    }
  },

  parseHTML() {
    return [
      {
        tag: 'iframe[src]'
      }
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', ['iframe', HTMLAttributes]]
  },

  addNodeView() {
    return ReactNodeViewRenderer((props: NodeViewProps) => {
      // Cast the component props to include required image attributes
      const videoProps = {
        ...props,
        node: {
          ...props.node,
          attrs: {
            ...props.node.attrs,
            src: props.node.attrs.src || ''
          }
        }
      }
      return VideoNodeComponent(videoProps)
    })
  }
})
