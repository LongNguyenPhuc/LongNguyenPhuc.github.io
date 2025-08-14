// Core
import { ReactNode } from 'react'

// Types
export interface DataTableActionCellProps {
  menus: Array<{
    icon?: ReactNode
    label?: ReactNode
    slot?: ReactNode
    link?: string
    onNavigate?: (link: string) => void
    onClick?: () => void
  }>
}
