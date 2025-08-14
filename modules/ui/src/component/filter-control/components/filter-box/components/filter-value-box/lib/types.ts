// Core
import { ControllerRenderProps } from 'react-hook-form'

// App
import { FilterControlForm } from '@lib-ui/component/filter-control'

export interface Props {
  index: number
  field: ControllerRenderProps<FilterControlForm, `filters.${number}.value`>
}
