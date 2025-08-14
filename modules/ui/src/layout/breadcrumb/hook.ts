// Core
import { isUndefined } from 'lodash-es'
import { devtools } from 'zustand/middleware'
import { create, StateCreator } from 'zustand'

// Types
// States
export interface States {
  breadcrumbs: Array<{
    basePath: string
    fullPath: string
  }>
}

// Actions
export interface SetStoreActionValues {
  breadcrumbs?: States['breadcrumbs']
}

interface Actions {
  setStore: (values: SetStoreActionValues) => void
  pushBreadcrumb: (value: States['breadcrumbs'][number]) => void
  unshiftBreadcrumb: (value: States['breadcrumbs'][number]) => void
  resetStore: () => void
}

// Store
export type BreadcrumbStore = States & Actions

// Constants
export const INITIAL_STATES: States = {
  breadcrumbs: []
}

// Define store
const breadcrumbStore: StateCreator<BreadcrumbStore> = (set) => ({
  // States
  ...INITIAL_STATES,

  // Actions
  setStore: ({ breadcrumbs }) =>
    set((state) => ({
      breadcrumbs: isUndefined(breadcrumbs) ? state.breadcrumbs : breadcrumbs
    })),
  pushBreadcrumb: (value) =>
    set((state) => ({
      breadcrumbs: [...state.breadcrumbs, value]
    })),
  unshiftBreadcrumb: (value) =>
    set((state) => ({
      breadcrumbs: [value, ...state.breadcrumbs]
    })),
  resetStore: () => set({ ...INITIAL_STATES })
})

export const useBreadcrumbStore = create<BreadcrumbStore>()(devtools(breadcrumbStore))

export default useBreadcrumbStore
