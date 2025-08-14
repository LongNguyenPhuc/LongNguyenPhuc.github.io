// Core
import { FC } from 'react'

// Internal
import { type DataTableNormalCellProps } from './lib'

// Component
export const DataTableNormalCell: FC<DataTableNormalCellProps> = (props) => {
  // Props
  const { value } = props

  // Template
  if (value == null || value === '') {
    return '--'
  }

  return value
}

export * from './lib'
