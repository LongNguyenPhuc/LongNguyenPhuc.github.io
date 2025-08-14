import Image from '@tiptap/extension-image'
import { NodeViewProps, ReactNodeViewRenderer } from '@tiptap/react'
import ImageNodeComponent from '../tiptap-node/image-resize-node'

export const ImageResize = Image.extend({
  name: 'resizableImage',

  group: 'block',

  priority: 100,

  addAttributes() {
    return {
      ...this.parent?.(),
      style: {
        default: null,
        parseHTML: (element) => element.getAttribute('style')
      },
      width: {
        default: null,
        parseHTML: (element) => element.getAttribute('width')
      }
    }
  },

  parseHTML() {
    return [
      {
        tag: 'img',
        priority: 100
      }
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', ['img', HTMLAttributes]]
  },

  addNodeView() {
    return ReactNodeViewRenderer((props: NodeViewProps) => {
      // Cast the component props to include required image attributes
      const imageProps = {
        ...props,
        node: {
          ...props.node,
          attrs: {
            ...props.node.attrs,
            src: props.node.attrs.src || ''
          }
        }
      }
      return ImageNodeComponent(imageProps)
    })
  }
})
