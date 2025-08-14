// Core
import { FC } from 'react'
import { TrashIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useFormContext } from 'react-hook-form'

// App
import { Button } from '@lib-ui/base/button'
import { FormField, FormItem, FormControl, FormMessage } from '@lib-ui/base/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@lib-ui/base/select'

// Internal
import { type Props } from './lib'
import { FilterFieldBox, FilterApiOperatorBox, FilterValueBox } from './components'
import { FilterControlForm, FilterLogicalOperator, useFilterControlContext } from '../../lib'

// Component
const FilterBox: FC<Props> = () => {
  // Hooks
  const { control } = useFormContext<FilterControlForm>()
  const { t } = useTranslation('component/filter-control')
  const { formFiltersField, handleHideFilter } = useFilterControlContext()

  // Methods
  // Handle remove filter
  const handleRemoveFilter = (index: number) => {
    if (formFiltersField.fields?.length === 1) {
      handleHideFilter()
    } else {
      formFiltersField.remove(index)
    }
  }

  // Template
  return (
    <div className='space-y-4'>
      {formFiltersField.fields.map((field, index) => (
        <div key={field.id} className='space-y-4'>
          {index > 0 && (
            <div className='flex justify-center'>
              {/* Logical operator */}
              <FormField
                control={control}
                name={`filters.${index}.logicalOperator`}
                render={({ field }) => (
                  <FormItem className='w-20'>
                    <FormControl>
                      <Select defaultValue={field.value} onValueChange={field.onChange}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>

                        <SelectContent>
                          <SelectItem value={FilterLogicalOperator.And}>
                            {t('filterBox.logicalOperator.and')}
                          </SelectItem>
                          <SelectItem value={FilterLogicalOperator.Or}>{t('filterBox.logicalOperator.or')}</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}

          {/* Filter boxes */}
          <div className='flex gap-2'>
            <div className='flex grow flex-col gap-2 xl:flex-row'>
              {/* Field */}
              <FormField
                control={control}
                name={`filters.${index}.field`}
                render={({ field }) => (
                  <FormItem className='flex-1'>
                    <FormControl>
                      <FilterFieldBox index={index} field={field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Api operator */}
              <FormField
                control={control}
                name={`filters.${index}.apiOperator`}
                render={({ field }) => (
                  <FormItem className='flex-1'>
                    <FormControl>
                      <FilterApiOperatorBox index={index} field={field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Value */}
              <FormField
                control={control}
                name={`filters.${index}.value`}
                render={({ field }) => (
                  <FormItem className='flex-1'>
                    <FormControl>
                      <FilterValueBox index={index} field={field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Remove button */}
            <Button variant='outline' size='icon' className='' onClick={() => handleRemoveFilter(index)}>
              <TrashIcon className='h-4 w-4' />
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default FilterBox
