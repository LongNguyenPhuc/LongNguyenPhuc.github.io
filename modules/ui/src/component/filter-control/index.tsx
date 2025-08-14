// Core
import { SlidersVertical } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form'
import { FC, Fragment, memo, useCallback, useEffect, useMemo, useState } from 'react'

// App
import { Form } from '@lib-ui/base/form'
import { Button } from '@lib-ui/base/button'
import { useIsMobile } from '@hooks/use-mobile'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@lib-ui/base/dialog'

// Internal
import {
  type FilterControlProps,
  type FilterControlForm,
  FilterControlFormSchema,
  DEFAULT_FILTER_CONTROL_FORM_VALUES,
  FILTER_CONTROL_CONTEXT,
  FilterControlContext
} from './lib'
import { FilterBox, SearchBox, FilterActions } from './components'
import { useTranslation } from 'react-i18next'

// Export Component
export const FilterControl: FC<FilterControlProps> = memo(({ filters, onSetFilters, onEnableAdvancedFilter }) => {
  // Hooks
  const isMobile = useIsMobile()
  const { t } = useTranslation('component/filter-control')

  // Form
  const form = useForm<FilterControlForm>({
    resolver: zodResolver(FilterControlFormSchema),
    defaultValues: DEFAULT_FILTER_CONTROL_FORM_VALUES
  })

  // Form array field
  const formFiltersField = useFieldArray({
    control: form.control,
    name: 'filters'
  })

  // States
  const [isOpenFilterDialog, setIsOpenFilterDialog] = useState(false)

  // Methods
  // Handle enable filter
  const handleEnableFilter = () => {
    form.resetField('keyword')
    if (!isMobile || formFiltersField.fields?.length === 0)
      formFiltersField.append({ field: '', apiOperator: '', value: '' })

    if (isMobile) setIsOpenFilterDialog(true)
  }

  // Handle hide filter
  const handleHideFilter = useCallback(() => {
    formFiltersField.remove()
    if (isMobile) setIsOpenFilterDialog(false)
  }, [formFiltersField, isMobile])

  // Handle submit filters
  const handleSubmitFilters: SubmitHandler<FilterControlForm> = useCallback(
    (fieldValues) => {
      onSetFilters(fieldValues)
      if (isMobile && fieldValues.filters?.length > 0) setIsOpenFilterDialog(false)
    },
    [isMobile, onSetFilters]
  )

  // Effects
  // Do something when advanced filter was enabled
  useEffect(() => {
    if (formFiltersField.fields?.length === 0 || !onEnableAdvancedFilter) return

    onEnableAdvancedFilter()
  }, [formFiltersField, onEnableAdvancedFilter])

  // Memos
  // Context value
  const contextValue = useMemo<FilterControlContext>(() => {
    return {
      filters,
      formFiltersField,
      handleSetFilters: handleSubmitFilters,
      handleHideFilter
    }
  }, [filters, formFiltersField, handleSubmitFilters, handleHideFilter])

  // Template
  return (
    <Form {...form}>
      <form className='w-full' onSubmit={form.handleSubmit(onSetFilters)}>
        <FILTER_CONTROL_CONTEXT.Provider value={contextValue}>
          {isMobile ? (
            <Fragment>
              <div className='flex gap-2'>
                <SearchBox />
                <Button
                  variant={formFiltersField.fields?.length > 0 ? 'default' : 'ghost'}
                  size='icon'
                  onClick={handleEnableFilter}
                >
                  <SlidersVertical className='size-4' />
                </Button>
              </div>

              <Dialog open={isOpenFilterDialog} onOpenChange={setIsOpenFilterDialog}>
                <DialogContent aria-describedby={undefined} className='grid-rows-[auto_1fr_auto]'>
                  <DialogHeader>
                    <DialogTitle>{t('filter')}</DialogTitle>
                  </DialogHeader>

                  <main>
                    <FilterBox />
                  </main>

                  <DialogFooter>
                    <FilterActions />
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </Fragment>
          ) : formFiltersField.fields?.length > 0 ? (
            <div className='space-y-4'>
              <FilterBox />
              <FilterActions />
            </div>
          ) : (
            <div className='flex gap-2'>
              <SearchBox />
              <Button variant='ghost' size='icon' onClick={handleEnableFilter}>
                <SlidersVertical className='size-4' />
              </Button>
            </div>
          )}
        </FILTER_CONTROL_CONTEXT.Provider>
      </form>
    </Form>
  )
})

FilterControl.displayName = 'FilterControl'
export * from './lib'
