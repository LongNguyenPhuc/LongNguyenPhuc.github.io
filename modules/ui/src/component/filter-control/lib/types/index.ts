// Core
import { z } from 'zod'
import { SubmitHandler, UseFieldArrayReturn } from 'react-hook-form'

// App
import { SelectOption } from '@lib-ui/types'

// Internal
import { FilterControlFormSchema, FilterApiOperator, FilterInputType } from '../'

export interface Filter {
  /** Label */
  label: string

  /** Field key */
  value: string

  /** Input type */
  inputType: FilterInputType

  /** Api operator */
  apiOperators: Array<{
    value: FilterApiOperator
    label: string
  }>

  /** Select options */
  options?: SelectOption[]
}

export interface FilterControlProps {
  filters: Filter[]
  onSetFilters: SubmitHandler<FilterControlForm>
  onEnableAdvancedFilter?: () => void | Promise<void>
}

export type FilterControlForm = z.infer<typeof FilterControlFormSchema>

export interface FilterControlContext {
  filters: Filter[]
  formFiltersField: UseFieldArrayReturn<FilterControlForm, 'filters', 'id'>
  handleSetFilters: SubmitHandler<FilterControlForm>
  handleHideFilter: () => void
}
