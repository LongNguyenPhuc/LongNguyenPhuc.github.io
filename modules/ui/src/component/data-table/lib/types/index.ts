import { Row, RowData, TableOptions, ColumnDef } from '@tanstack/react-table'
import { JSX, ReactNode } from 'react'

export type { Row, RowData, TableOptions, ColumnDef }
export interface DataTableProps<TData extends RowData> {
  /**
   * Display the loading indicator when loading the table data
   */
  isLoading?: boolean

  /**
   * Display the table footer
   */
  isDisplayFooter?: boolean

  /**
   * Display the table pagination
   */
  isDisplayPagination?: boolean

  /**
   * Custom class name for container, table, table header, table body, table footer
   */
  className?: {
    container?: string
    table?: string
    tableHeader?: string
    tableBody?: string
    tableFooter?: string
  }

  /**
   * Tanstack table options
   */
  tableOptions: Omit<TableOptions<TData>, 'getCoreRowModel'>

  /**
   * Custom slots options
   */
  slots?: {
    TableWrapper?: ({ children }: { children: ReactNode }) => JSX.Element
    Row?: (props: Row<TData>) => JSX.Element
  }
}
