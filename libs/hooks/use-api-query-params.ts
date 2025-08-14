// Core
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react'

// App
import { QueryParams } from '@api/types/base'
import { useDebounce } from '@uidotdev/usehooks'
import { isEmpty } from 'lodash-es'

export type PaginationState = {
  pageIndex: number
  pageSize: number
}

// Types
export interface ApiQueryParams {
  queryParams: QueryParams
  pagination: PaginationState
  handleSetFilters: Dispatch<SetStateAction<QueryParams['filters']>>
  handleSetSortOrder: Dispatch<SetStateAction<QueryParams['sortOrder']>>
  handleSetSortField: Dispatch<SetStateAction<QueryParams['sortField']>>
  handleSetPagination: Dispatch<SetStateAction<PaginationState>>
}

// Hook
export const useApiQueryParams = (defaultQueryParams?: QueryParams, baseQueryParams?: QueryParams): ApiQueryParams => {
  const {
    currentPage: defaultPage = 1,
    pageSize: defaultPageSize = 10,
    sortField: defaultSortField,
    sortOrder: defaultSortOrder
  } = defaultQueryParams ?? {
    page: 1,
    pageSize: 10
  }
  // States
  const [page, setPage] = useState(defaultPage)
  const [pageSize, setPageSize] = useState(defaultPageSize)
  const [filters, setFilters] = useState<QueryParams['filters']>()
  const [sortOrder, setSortOrder] = useState<QueryParams['sortOrder']>(defaultSortOrder)
  const [sortField, setSortField] = useState<QueryParams['sortField']>(defaultSortField)
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: defaultPage - 1,
    pageSize: defaultPageSize
  })

  // Debounced
  const debouncedPagination = useDebounce(pagination, 400)

  // Effects
  // Set page, page size when debounced pagination change
  useEffect(() => {
    setPage(debouncedPagination.pageIndex + 1)
    setPageSize(debouncedPagination.pageSize)
  }, [debouncedPagination])

  // Memos
  // Query params
  const queryParams = useMemo<QueryParams>(() => {
    // Filters
    const queryParamsFilters: string[] = []
    const { filters: baseQueryParamsFilters, ...restBaseQueryParams } = baseQueryParams ?? {}
    if (baseQueryParamsFilters) {
      queryParamsFilters.push(baseQueryParamsFilters)
    }
    if (filters) {
      queryParamsFilters.push(filters)
    }

    return {
      ...restBaseQueryParams,
      filters: isEmpty(queryParamsFilters) ? undefined : queryParamsFilters.join(','),
      sortOrder: restBaseQueryParams.sortOrder || sortOrder || undefined,
      sortField: restBaseQueryParams.sortField || sortField || undefined,
      currentPage: page,
      pageSize
    }
  }, [page, pageSize, filters, sortOrder, sortField, baseQueryParams])

  // Return
  return {
    queryParams,
    pagination,
    handleSetFilters: setFilters,
    handleSetSortOrder: setSortOrder,
    handleSetSortField: setSortField,
    handleSetPagination: setPagination
  }
}

export default useApiQueryParams
