// Core
import { FC, useEffect } from 'react'
import { Search } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useDebounce } from '@uidotdev/usehooks'
import { useFormContext, useWatch } from 'react-hook-form'

// App
import { Input } from '@lib-ui/base/input'
import { useIsMobile } from '@hooks/use-mobile'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@lib-ui/base/form'
import { useFilterControlContext, type FilterControlForm } from '@lib-ui/component/filter-control'

// Internal
import { type Props } from './lib'

// Component
const SearchBox: FC<Props> = () => {
  // Hooks
  const isMobile = useIsMobile()
  const { control } = useFormContext<FilterControlForm>()
  const { t } = useTranslation('component/filter-control')
  const { formFiltersField, handleSetFilters } = useFilterControlContext()

  // Form watchers
  const formKeywordValueWatcher = useWatch<FilterControlForm, 'keyword'>({
    name: 'keyword',
    control
  })

  // Debounced keyword value
  const debouncedKeywordValue = useDebounce<string>(formKeywordValueWatcher.trim(), 400)

  // Effects
  // Submit when debounced basic filter changed
  useEffect(() => {
    handleSetFilters({ keyword: debouncedKeywordValue, filters: [] })
  }, [debouncedKeywordValue, handleSetFilters])

  // Template
  return (
    <FormField
      control={control}
      name='keyword'
      render={({ field }) => (
        <FormItem className='relative max-w-full grow space-y-0 xl:max-w-96'>
          <FormControl>
            <Input
              disabled={isMobile && formFiltersField.fields?.length > 0}
              placeholder={t('searchBox.inputPlaceholder')}
              className='pr-10'
              {...field}
            />
          </FormControl>

          <FormLabel className='text-muted-foreground absolute inset-y-0 right-0 m-0 flex items-center px-3 py-2'>
            <Search className='size-4' />
          </FormLabel>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default SearchBox
