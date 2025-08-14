// Core
import { ReactNode, useCallback, useMemo, useState } from 'react'
import { LoaderCircle } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { debounce, isUndefined } from 'lodash-es'
import { NumberFormatValues } from 'react-number-format'
import { flexRender, getCoreRowModel, RowData, useReactTable } from '@tanstack/react-table'

// App
import { cn } from '@utils/cn'
import { Pagination } from '@lib-ui/component/pagination'
import { NumberInput } from '@lib-ui/component/number-input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@lib-ui/base/select'
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@lib-ui/base/table'

// Internal
import { type DataTableProps, DEFAULT_PAGE_SIZE_OPTIONS } from './lib'

// Noted
// Server side pagination
// manualPagination: true
// set state.pagination and onPaginationChange

// Client side pagination
// getPaginationRowModel: getPaginationRowModel()

// Component
export const DataTable = <TData extends RowData>(props: DataTableProps<TData>) => {
  // Props
  const {
    isLoading = false,
    isDisplayFooter = false,
    isDisplayPagination = true,
    className,
    tableOptions,
    slots
  } = props

  // Hooks
  const { t } = useTranslation('component/data-table')

  // Table
  const table = useReactTable<TData>({
    ...tableOptions,
    getCoreRowModel: getCoreRowModel()
  })

  const pageCount = table.getPageCount()
  const page = table.getState().pagination.pageIndex + 1

  // States
  const [reRenderTrigger, setReRenderTrigger] = useState(Date.now)

  // Methods
  // Handle change page index
  const handleChangePageIndex = debounce((values: NumberFormatValues) => {
    const pageCount = table.getPageCount()

    if (isUndefined(values.floatValue)) {
      return
    }

    if (values.floatValue < 1) {
      setReRenderTrigger(Date.now())
      return table.setPageIndex(0)
    }

    if (values.floatValue > pageCount) {
      setReRenderTrigger(Date.now())
      return table.setPageIndex(pageCount - 1)
    }

    return table.setPageIndex(values.floatValue - 1)
  }, 400)

  // Memos
  // Is group column
  const isGroupColumn = useMemo(() => {
    return table.getAllColumns()?.length < table.getAllFlatColumns()?.length
  }, [table])

  const TableWrapper = useCallback(
    ({ children }: { children: ReactNode }) => {
      if (slots?.TableWrapper) return <slots.TableWrapper>{children}</slots.TableWrapper>
      return children
    },
    [slots]
  )

  // Template
  return (
    <div className={cn('relative overflow-hidden rounded-md border', className?.container)}>
      <TableWrapper>
        <Table className={className?.table}>
          {/* Table header */}
          <TableHeader
            className={cn('bg-primary hover:[&>tr]:bg-primary [&_th]:text-primary-foreground', className?.tableHeader)}
          >
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      colSpan={header.colSpan}
                      className={cn('py-2 text-center', isGroupColumn ? 'border-r last-of-type:border-none' : '')}
                      style={{ minWidth: header.getSize() }}
                    >
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>

          {/* Table body */}
          <TableBody className={className?.tableBody}>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => {
                if (slots?.Row) return <slots.Row key={row.id} {...row} />

                return (
                  <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className='text-center'>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                )
              })
            ) : (
              <TableRow>
                <TableCell colSpan={table.getAllColumns()?.length} className='h-24 text-center'>
                  {!isLoading && t('isEmpty')}
                </TableCell>
              </TableRow>
            )}
          </TableBody>

          {/* Table footer */}
          {isDisplayFooter && (
            <TableFooter className={className?.tableFooter}>
              {/* Row */}
              {table.getFooterGroups().map((footerGroup) => (
                <TableRow key={footerGroup.id}>
                  {footerGroup.headers.map((header) => (
                    <TableCell key={header.id} colSpan={header.colSpan} className='text-center'>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.footer, header.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableFooter>
          )}
        </Table>
      </TableWrapper>

      {/* Pagination */}
      {isDisplayPagination && (
        <div className='bg-muted/40 flex w-full items-center justify-between gap-1 border-t p-4'>
          {/* Page input & page size */}
          <div className='flex items-center gap-4'>
            {/* Page input */}
            <div className='hidden items-center gap-2 xl:flex'>
              <span>{t('pagination.pageInputLabel')}</span>
              <NumberInput
                key={reRenderTrigger}
                className='w-14 [&>input]:text-center'
                placeholder=''
                isDisplayStepper={false}
                min={1}
                max={pageCount}
                value={page}
                onValueChange={handleChangePageIndex}
              />
            </div>

            {/* Page size selection */}
            <div className='hidden items-center gap-2 xl:flex'>
              <span>{t('pagination.pageSizeSelectionLabel')}</span>
              <Select
                value={`${table.getState().pagination.pageSize}`}
                onValueChange={(value) => {
                  table.setPageSize(Number(value))
                }}
              >
                <SelectTrigger className='w-fit gap-1'>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent side='top'>
                  {DEFAULT_PAGE_SIZE_OPTIONS.map((pageSize) => (
                    <SelectItem key={pageSize} value={`${pageSize}`}>
                      {pageSize}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Total page */}
            <div className='flex items-center gap-2 xl:hidden'>
              <span>
                {t('pagination.totalPage')} {pageCount}
              </span>
            </div>
          </div>

          {/* Pagination */}
          <Pagination
            pageCount={pageCount}
            page={page}
            isHasPreviousPage={table.getCanPreviousPage()}
            isHasNextPage={table.getCanNextPage()}
            onGoToPreviousPage={table.previousPage}
            onGoToNextPage={table.nextPage}
            onChangePage={(page) => table.setPageIndex(page - 1)}
          />
        </div>
      )}

      {/* Loading */}
      <div
        className={cn(
          `bg-muted/50 absolute top-0 left-0 flex h-full w-full items-center justify-center transition-[visibility] duration-200`,
          isLoading ? 'visible' : 'invisible'
        )}
      >
        <LoaderCircle className='text-muted-foreground animate-spin' />
      </div>
    </div>
  )
}

export * from './lib'
export * from './components'
export { getExpandedRowModel } from '@tanstack/react-table'
