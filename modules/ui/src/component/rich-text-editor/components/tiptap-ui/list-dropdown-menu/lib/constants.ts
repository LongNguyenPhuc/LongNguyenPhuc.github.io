import { type Editor } from '@tiptap/react'
import { ListIcon, ListOrderedIcon, ListTodoIcon } from 'lucide-react'

export const LIST_OPTIONS = {
  bulletList: {
    label: 'list.bulletList',
    icon: ListIcon,
    toggle: (editor: Editor) => editor.chain().focus().toggleBulletList().run()
  },
  orderedList: {
    label: 'list.orderedList',
    icon: ListOrderedIcon,
    toggle: (editor: Editor) => editor.chain().focus().toggleOrderedList().run()
  },
  taskList: {
    label: 'list.taskList',
    icon: ListTodoIcon,
    toggle: (editor: Editor) => editor.chain().focus().toggleList('taskList', 'taskItem').run()
  }
} as const
