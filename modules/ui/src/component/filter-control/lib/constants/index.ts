// Core
import { z } from 'zod'
import { createContext } from 'react'

// Internal
import { FilterControlContext, FilterLogicalOperator } from '../'

// Form schemas
export const FilterControlFormSchema = z.object({
  keyword: z.string().trim(),
  filters: z.array(
    z.object({
      field: z.string().trim().min(1, 'Vui lòng chọn trường'),
      apiOperator: z.string().trim().min(1, 'Vui lòng chọn toán tử'),
      value: z.string().trim().min(1, 'Vui lòng chọn/nhập giá trị'),
      logicalOperator: z.nativeEnum(FilterLogicalOperator).optional()
    })
  )
})

// Default form values
export const DEFAULT_FILTER_CONTROL_FORM_VALUES: z.infer<typeof FilterControlFormSchema> = {
  keyword: '',
  filters: []
} as const

// Context
export const FILTER_CONTROL_CONTEXT = createContext<FilterControlContext | undefined>(undefined)
