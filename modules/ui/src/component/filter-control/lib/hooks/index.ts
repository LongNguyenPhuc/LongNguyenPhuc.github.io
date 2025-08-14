// Core
import { useContext } from 'react'

// Internal
import { FILTER_CONTROL_CONTEXT } from '../constants'

// Use filter control context
export const useFilterControlContext = () => {
  const context = useContext(FILTER_CONTROL_CONTEXT)
  if (!context) {
    throw new Error('useFilterControlContext should be used within FilterControl')
  }
  return context
}
