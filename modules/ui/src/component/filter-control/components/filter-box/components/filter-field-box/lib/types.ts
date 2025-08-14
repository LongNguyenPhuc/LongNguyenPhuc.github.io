import { FilterControlForm } from '@lib-ui/component/filter-control'
import { ControllerRenderProps } from 'node_modules/react-hook-form/dist/types/controller'

// Types
export interface Props {
  index: number
  field: ControllerRenderProps<FilterControlForm, `filters.${number}.field`>
}
