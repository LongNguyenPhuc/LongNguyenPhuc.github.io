// Internal
import { FilterControlForm } from '../types'

// Transform field values to api filter
export function transformFieldValuesToApiFilter(
  { keyword, filters }: FilterControlForm,
  handler?: {
    basic?: string | ((keyword: FilterControlForm['keyword']) => FilterControlForm['keyword'])
    advanced?: (filters: FilterControlForm['filters']) => FilterControlForm['filters']
  }
) {
  // Base filter
  if (!Array.isArray(filters) || filters?.length === 0) {
    if (!keyword.trim()) return ''

    if (typeof handler?.basic === 'function') return handler.basic(keyword)

    const baseFilterKey = handler?.basic && typeof handler.basic === 'string' ? handler.basic : 'keyword'
    return `${baseFilterKey}@=${keyword}`
  }

  // Advanced filter
  return (handler?.advanced ? handler.advanced(filters) : filters)
    .map(({ logicalOperator, field, apiOperator, value }) => `${logicalOperator ?? ''}${field}${apiOperator}${value}`)
    .join('')
}
