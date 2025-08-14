// Core
import { FC, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useFormContext, useWatch } from 'react-hook-form'

// App
import { FilterControlForm, useFilterControlContext } from '@lib-ui/component/filter-control'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@lib-ui/base/select'

// Internal
import { type Props } from './lib'

// Component
const FilterApiOperatorBox: FC<Props> = (props) => {
  // Props
  const { index, field } = props
  const { value, onChange } = field

  // Hooks
  const { filters } = useFilterControlContext()
  const { control } = useFormContext<FilterControlForm>()
  const { t } = useTranslation('component/filter-control')

  // Watchers
  // Field
  const fieldWatcher = useWatch<FilterControlForm, `filters.${number}.field`>({
    name: `filters.${index}.field`,
    control
  })

  // Memos
  // Api operators
  const apiOperators = useMemo(() => {
    return filters.find((filter) => filter.value === fieldWatcher)?.apiOperators
  }, [filters, fieldWatcher])

  // Disabled
  const disabled = useMemo(() => {
    return !fieldWatcher
  }, [fieldWatcher])

  // Template
  return (
    <Select value={value} disabled={disabled} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue
          placeholder={<span className='text-muted-foreground'>{t('filterBox.filterApiOperatorBox.placeholder')}</span>}
        />
      </SelectTrigger>

      <SelectContent>
        {apiOperators?.map((apiOperator) => (
          <SelectItem key={apiOperator.value} value={apiOperator.value}>
            {apiOperator.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default FilterApiOperatorBox
