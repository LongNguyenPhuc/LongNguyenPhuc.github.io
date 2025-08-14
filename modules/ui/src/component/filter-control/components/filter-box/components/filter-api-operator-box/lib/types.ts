import { ControllerRenderProps } from 'react-hook-form'
import { FilterControlForm } from '@lib-ui/component/filter-control'

export interface Props {
  index: number
  field: ControllerRenderProps<FilterControlForm, `filters.${number}.apiOperator`>
}
