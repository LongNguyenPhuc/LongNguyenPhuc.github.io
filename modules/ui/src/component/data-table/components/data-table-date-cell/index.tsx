// Core
import { format as formatDate } from 'date-fns'
import { FC } from 'react'

// Internal
import type { DataTableDateCellProps } from './lib/types'

// Component
export const DataTableDateCell: FC<DataTableDateCellProps> = (props) => {
  // Props
  const { value, format = 'DD/MM/YYYY' } = props

  // Template
  if (!value) return '--'

  return formatDate(value, format)
}

export * from './lib'
