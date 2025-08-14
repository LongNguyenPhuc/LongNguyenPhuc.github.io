// Core
import { type Editor } from '@tiptap/react'
import { Fragment, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
// App
import { Popover, PopoverContent, PopoverTrigger } from '@lib-ui/base/popover'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator
} from '@lib-ui/base/dropdown-menu'
// Icons
import {
  Table,
  Plus,
  Trash2,
  MoveHorizontal,
  MoveVertical,
  Columns,
  RowsIcon,
  AlignHorizontalJustifyCenter,
  Settings,
  ChevronDown
} from 'lucide-react'
// Internal
import { useTiptapEditor } from '../../../hooks/use-tiptap-editor'
import { Button as TipTapButton } from '../../tiptap-ui-primitive'
import { TableSelector } from './components/table-selection'
import TableBackgroundPopover from './components/table-background-color'
import { TableEditorProps } from './lib/types'

// Defined constants for table commands
const TABLE_COMMAND_GROUPS = [
  {
    label: 'table.columnGroup.label',
    commands: [
      {
        title: 'table.columnGroup.addBefore',
        icon: <Plus className='mr-2 h-4 w-4' />,
        action: (editor: Editor) => editor.chain().focus().addColumnBefore().run()
      },
      {
        title: 'table.columnGroup.addAfter',
        icon: <Plus className='mr-2 h-4 w-4' />,
        action: (editor: Editor) => editor.chain().focus().addColumnAfter().run()
      },
      {
        title: 'table.columnGroup.delete',
        icon: <Trash2 className='mr-2 h-4 w-4' />,
        action: (editor: Editor) => editor.chain().focus().deleteColumn().run()
      }
    ]
  },
  {
    label: 'table.rowGroup.label',
    commands: [
      {
        title: 'table.rowGroup.addBefore',
        icon: <Plus className='mr-2 h-4 w-4' />,
        action: (editor: Editor) => editor.chain().focus().addRowBefore().run()
      },
      {
        title: 'table.rowGroup.addAfter',
        icon: <Plus className='mr-2 h-4 w-4' />,
        action: (editor: Editor) => editor.chain().focus().addRowAfter().run()
      },
      {
        title: 'table.rowGroup.delete',
        icon: <Trash2 className='mr-2 h-4 w-4' />,
        action: (editor: Editor) => editor.chain().focus().deleteRow().run()
      }
    ]
  },
  {
    label: 'table.cellGroup.label',
    commands: [
      {
        title: 'table.cellGroup.merge',
        icon: <MoveHorizontal className='mr-2 h-4 w-4' />,
        action: (editor: Editor) => editor.chain().focus().mergeCells().run()
      },
      {
        title: 'table.cellGroup.split',
        icon: <MoveVertical className='mr-2 h-4 w-4' />,
        action: (editor: Editor) => editor.chain().focus().splitCell().run()
      }
    ]
  },
  {
    label: 'table.header.label',
    commands: [
      {
        title: 'table.header.toggleHeaderColumn',
        icon: <Columns className='mr-2 h-4 w-4' />,
        action: (editor: Editor) => editor.chain().focus().toggleHeaderColumn().run()
      },
      {
        title: 'table.header.toggleHeaderRow',
        icon: <RowsIcon className='mr-2 h-4 w-4' />,
        action: (editor: Editor) => editor.chain().focus().toggleHeaderRow().run()
      },
      {
        title: 'table.header.toggleHeaderCell',
        icon: <AlignHorizontalJustifyCenter className='mr-2 h-4 w-4' />,
        action: (editor: Editor) => editor.chain().focus().toggleHeaderCell().run()
      }
    ]
  }
]

export function TableEditor({ editor: providedEditor }: TableEditorProps) {
  const editor = useTiptapEditor(providedEditor)

  const { t } = useTranslation('component/rich-text-editor')

  const [isTableSelectorOpen, setIsTableSelectorOpen] = useState(false)
  const isDisabled = !editor?.isEditable
  const [isTableSelected, setIsTableSelected] = useState(false)

  useEffect(() => {
    if (!editor) return
    const updateTableSelected = () => setIsTableSelected(editor.isActive('table'))
    editor.on('selectionUpdate', updateTableSelected)
    editor.on('update', updateTableSelected)
    return () => {
      editor.off('selectionUpdate', updateTableSelected)
      editor.off('update', updateTableSelected)
    }
  }, [editor])

  if (!editor) {
    return null
  }

  const handleInsertTable = (rows: number, cols: number) => {
    editor.chain().focus().insertTable({ rows, cols, withHeaderRow: true }).run()
    setIsTableSelectorOpen(false)
  }

  // Common button props
  const commonButtonProps = {
    type: 'button' as const,
    disabled: isDisabled,
    'data-style': 'ghost',
    'data-disabled': isDisabled,
    role: 'button',
    tabIndex: -1
  }

  return (
    <>
      {/* Table creation button */}
      <Popover open={isTableSelectorOpen} onOpenChange={setIsTableSelectorOpen}>
        <PopoverTrigger asChild>
          <TipTapButton {...commonButtonProps} aria-label={t('table.label')} tooltip={t('table.label')}>
            <Table className='h-4 w-4' />
          </TipTapButton>
        </PopoverTrigger>
        <PopoverContent className='w-auto p-0' align='start'>
          <TableSelector onSelect={handleInsertTable} />
        </PopoverContent>
      </Popover>

      {/* Table operations dropdown - only shown when a table is selected */}
      {isTableSelected && (
        <>
          <TableBackgroundPopover />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div>
                <TipTapButton
                  {...commonButtonProps}
                  aria-label={t('table.optionLabel')}
                  tooltip={t('table.optionLabel')}
                >
                  <Settings className='h-4 w-4 text-gray-900' />
                  <ChevronDown className='ml-1 h-4 w-4 text-gray-900' />
                </TipTapButton>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-56'>
              {TABLE_COMMAND_GROUPS.map((group, groupIndex) => (
                <Fragment key={`group-${group.label}`}>
                  <DropdownMenuLabel>{t(group.label)}</DropdownMenuLabel>
                  <DropdownMenuGroup>
                    {group.commands.map((command) => (
                      <DropdownMenuItem key={`command-${command.title}`} onClick={() => command.action(editor)}>
                        {command.icon}
                        <span>{t(command.title)}</span>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuGroup>
                  {groupIndex < TABLE_COMMAND_GROUPS?.length - 1 && <DropdownMenuSeparator />}
                </Fragment>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <TipTapButton
            {...commonButtonProps}
            aria-label={t('table.delete')}
            tooltip={t('table.delete')}
            onClick={() => editor.chain().focus().deleteTable().run()}
          >
            <Trash2 className='h-4 w-4' />
          </TipTapButton>
        </>
      )}
    </>
  )
}

export default TableEditor
