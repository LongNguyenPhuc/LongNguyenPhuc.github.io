// Core
import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useFormContext } from 'react-hook-form'

// App
import { useFilterControlContext } from '@lib-ui/component/filter-control/lib/hooks'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@lib-ui/base/select'

// Internal
import { type Props } from './lib'

// Component
const FilterFieldBox: FC<Props> = (props) => {
  // Props
  const { index, field } = props
  const { value, onChange } = field

  // Hooks
  const { setValue } = useFormContext()
  const { filters } = useFilterControlContext()
  const { t } = useTranslation('component/filter-control')

  // Handle change field value
  const handleChangeFieldValue = (value: string) => {
    onChange(value)
    setValue(`filters.${index}.apiOperator`, '')
    setValue(`filters.${index}.value`, '')
  }

  // Template
  return (
    <Select value={value} onValueChange={handleChangeFieldValue}>
      <SelectTrigger className='w-full'>
        <SelectValue
          placeholder={<span className='text-muted-foreground'>{t('filterBox.filterFieldBox.placeholder')}</span>}
        />
      </SelectTrigger>

      <SelectContent>
        {filters.map((filter) => (
          <SelectItem key={filter.value} value={filter.value}>
            {filter.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default FilterFieldBox
