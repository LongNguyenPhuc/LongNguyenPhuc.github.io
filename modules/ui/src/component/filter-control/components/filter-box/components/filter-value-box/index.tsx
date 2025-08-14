// Core

import { FC, memo, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useFormContext, useWatch } from 'react-hook-form'

// App
import { Input } from '@lib-ui/base/input'
import { Combobox } from '@lib-ui/component/combobox'
import { DatePicker } from '@lib-ui/component/date-picker'
import { NumberInput } from '@lib-ui/component/number-input'
import { FilterControlForm, useFilterControlContext, FilterInputType } from '@lib-ui/component/filter-control'

// Internal
import { type Props } from './lib'
import { toDate } from 'date-fns'

// Component
const FilterValueBox: FC<Props> = memo((props) => {
  // Props
  const { index, field } = props

  // Hooks
  const { filters } = useFilterControlContext()
  const { control } = useFormContext<FilterControlForm>()
  const { t } = useTranslation('component/filter-control')

  // Watchers
  const [fieldWatcher, apiOperatorWatcher] = useWatch<
    FilterControlForm,
    [`filters.${number}.field`, `filters.${number}.apiOperator`]
  >({
    control,
    name: [`filters.${index}.field`, `filters.${index}.apiOperator`]
  })

  // Memos
  // Selected filter
  const selectedFilter = useMemo(() => {
    return filters.find((filter) => filter.value === fieldWatcher)
  }, [filters, fieldWatcher])

  // Disabled
  const disabled = useMemo(() => {
    return !apiOperatorWatcher
  }, [apiOperatorWatcher])

  // Template
  // Default
  if (!selectedFilter) {
    return <Input placeholder={t('filterBox.filterValueBox.inputPlaceholder')} disabled />
  }

  // Text
  if (selectedFilter.inputType === FilterInputType.Text) {
    return <Input placeholder={t('filterBox.filterValueBox.inputPlaceholder')} disabled={disabled} {...field} />
  }

  // Number
  if (selectedFilter.inputType === FilterInputType.Number) {
    return <NumberInput {...field} disabled={disabled} onFieldChange={field.onChange} ref={undefined} />
  }

  // Select
  if (selectedFilter.inputType === FilterInputType.Select) {
    return (
      <Combobox
        value={field.value}
        options={selectedFilter.options ?? []}
        buttonTriggerProps={{
          loading: !selectedFilter.options,
          disabled
        }}
        placeholder={t('filterBox.filterValueBox.comboboxPlaceholder')}
        onValueChange={(value) => field.onChange(value ?? '')}
      />
    )
  }

  // Date
  if (selectedFilter.inputType === FilterInputType.Date) {
    return (
      <DatePicker
        defaultValue={field.value ? toDate(field.value) : undefined}
        buttonProps={{
          disabled
        }}
        placeholder={t('filterBox.filterValueBox.datePickerPlaceholder')}
        onValueChange={(value) => value instanceof Date && field.onChange(value?.toISOString())}
      />
    )
  }

  return null
})

FilterValueBox.displayName = 'FilterValueBox'
export default FilterValueBox
