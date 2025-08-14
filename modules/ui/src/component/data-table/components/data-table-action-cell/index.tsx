// Core
import { FC, Fragment } from 'react'
import { EllipsisVertical } from 'lucide-react'

// App
import { Button } from '@lib-ui/base/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@lib-ui/base/dropdown-menu'

// Internal
import type { DataTableActionCellProps } from './lib/types'

// Component
export const DataTableActionCell: FC<DataTableActionCellProps> = (props) => {
  // Props
  const { menus } = props

  // Template
  if (menus?.length === 0) {
    return null
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size='icon' variant='ghost'>
          <EllipsisVertical className='size-4' />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        {menus.map((menu, index) => {
          if (menu.slot) return <Fragment key={index}>{menu.slot}</Fragment>

          if (menu.link)
            return (
              <DropdownMenuItem key={index} asChild>
                <div role='button' onClick={() => menu.onNavigate?.(menu.link ?? '/')}>
                  {menu.icon}
                  {menu.label}
                </div>
              </DropdownMenuItem>
            )

          return (
            <DropdownMenuItem key={index} onClick={menu.onClick}>
              {menu.icon}
              {menu.label}
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export * from './lib'
