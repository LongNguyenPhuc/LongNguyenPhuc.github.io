// Core
import { FC } from 'react'

// Internal
import { type DataTableNumberCellProps } from './lib'

// Component
export const DataTableNumberCell: FC<DataTableNumberCellProps> = (props) => {
  // Props
  const { value } = props

  // Template
  if (value == null) {
    return '--'
  }

  return <span className='tabular-nums'>{value.toLocaleString()}</span>
}

export * from './lib'
