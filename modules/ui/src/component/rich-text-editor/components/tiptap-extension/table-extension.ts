import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'

export const TipTapTableCell = TableCell.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      backgroundColor: {
        default: null,
        renderHTML: (attributes) => {
          if (!attributes.backgroundColor) {
            return {}
          }

          return {
            style: `background-color: ${attributes.backgroundColor}`
          }
        },
        parseHTML: (element) => {
          return element.style.backgroundColor.replace(/['"]+/g, '')
        }
      }
    }
  }
})

export const TipTapTableHeader = TableHeader.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      backgroundColor: {
        default: null,
        renderHTML: (attributes) => {
          if (!attributes.backgroundColor) return {}
          return {
            style: `background-color: ${attributes.backgroundColor}`
          }
        },
        parseHTML: (element) => {
          return element.style.backgroundColor.replace(/['"]+/g, '')
        }
      }
    }
  }
})
