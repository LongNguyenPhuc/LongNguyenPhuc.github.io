// Core
import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useFormContext } from 'react-hook-form'
import { RefreshCw, Search, CircleSlash2, Plus } from 'lucide-react'

// App
import { Button } from '@lib-ui/base/button'

// Internal
import { type Props } from './lib'
import {
  DEFAULT_FILTER_CONTROL_FORM_VALUES,
  FilterControlForm,
  FilterLogicalOperator,
  useFilterControlContext
} from '../../lib'

// Component
const FilterActions: FC<Props> = () => {
  // Hooks
  const { handleSubmit } = useFormContext<FilterControlForm>()
  const { t } = useTranslation('component/filter-control')
  const { formFiltersField, handleHideFilter, handleSetFilters } = useFilterControlContext()

  // Methods
  // Handle add filter
  const handleAddFilter = () => {
    formFiltersField.append({
      field: '',
      apiOperator: '',
      value: '',
      logicalOperator: FilterLogicalOperator.And
    })
  }

  // Handle reset filter
  const handleResetFilter = () => {
    formFiltersField.remove()
    formFiltersField.append({
      field: '',
      apiOperator: '',
      value: ''
    })
    handleSetFilters(DEFAULT_FILTER_CONTROL_FORM_VALUES)
  }

  // Template
  return (
    <div className='flex items-center justify-end gap-2'>
      <Button variant='outline' onClick={handleAddFilter}>
        <Plus className='size-4' />
        <span className='hidden xl:inline-block'>{t('filterActions.filterAddingButton')}</span>
      </Button>

      <Button variant='secondary' onClick={handleResetFilter}>
        <RefreshCw className='size-4' />
        <span className='hidden xl:inline-block'>{t('filterActions.filterResetButton')}</span>
      </Button>

      <Button type='submit' onClick={handleSubmit(handleSetFilters)}>
        <Search className='size-4' />
        <span className='hidden xl:inline-block'>{t('filterActions.filterSearchingButton')}</span>
      </Button>

      <Button variant='destructive' onClick={handleHideFilter}>
        <CircleSlash2 className='size-4' />
        <span className='hidden xl:inline-block'>{t('filterActions.filterHidingButton')}</span>
      </Button>
    </div>
  )
}

export default FilterActions
