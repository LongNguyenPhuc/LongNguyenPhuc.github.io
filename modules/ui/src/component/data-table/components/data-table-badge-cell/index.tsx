// Core
import { FC } from 'react'

// App
import { Badge } from '@lib-ui/base/badge'

// Internal
import { type DataTableBadgeCellProps } from './lib'

// Component
export const DataTableBadgeCell: FC<DataTableBadgeCellProps> = (props) => {
  // Props
  const { value } = props

  // Template
  if (!value) {
    return '--'
  }

  return (
    <div className='flex flex-wrap justify-center gap-2'>
      {value.map((item) => (
        <Badge key={item} variant='secondary'>
          {item}
        </Badge>
      ))}
    </div>
  )
}

export * from './lib'
