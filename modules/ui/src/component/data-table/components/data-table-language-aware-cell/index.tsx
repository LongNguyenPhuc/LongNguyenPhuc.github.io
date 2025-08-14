// Core
import { FC } from 'react'
import { useTranslation } from 'react-i18next'

// App
import { Language } from '@utils/i18n'

// Internal
import type { DataTableLanguageAwareCellProps } from './lib/types'

// Component
export const DataTableLanguageAwareCell: FC<DataTableLanguageAwareCellProps> = (props) => {
  // Props
  const { value } = props

  // Hooks
  const { i18n } = useTranslation()

  // Template
  if (!value) return '--'

  return value[i18n.language as Language]
}

export * from './lib'
