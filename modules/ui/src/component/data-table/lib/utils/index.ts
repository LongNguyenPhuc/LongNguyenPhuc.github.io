// Core
import { RowSelectionState } from '@tanstack/react-table'

/**
 * Return page index starts at one for table
 * @param rowIndex
 * @param page
 * @param pageSize
 * @returns
 */
export const renderNumberOrderValue = (rowIndex: number, page?: number, pageSize?: number): number => {
  if (!page) page = 1
  if (!pageSize) pageSize = 10

  return rowIndex + 1 + (page - 1) * pageSize
}

// Handle transform row selection
export const handleTransformTableRowSelection = (rowSelection: RowSelectionState): string[] => {
  return Object.entries(rowSelection).reduce<string[]>((acc, [key, value]) => {
    if (value) {
      acc.push(key)
    }
    return acc
  }, [])
}
