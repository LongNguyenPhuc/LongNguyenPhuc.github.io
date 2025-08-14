// Core
import { getYear } from 'date-fns'
import { ChevronDown, Check } from 'lucide-react'
import { FC, useCallback, useMemo, useState } from 'react'

// App
import { cn } from '@utils/cn'
import { Button } from '../../base/button'
import { SelectOption } from '@lib-ui/types'
import { Popover, PopoverContent, PopoverTrigger } from '../../base/popover'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '../../base/command'

// Internal
import { type ComboboxProps, MONTH_OPTIONS } from './lib'

// Component
export const Combobox = ({
  ref,
  ...props
}: ComboboxProps & {
  ref?: React.RefObject<HTMLButtonElement>
}) => {
  // Props
  const {
    options,
    value,
    placeholder,
    popoverProps,
    popoverTriggerProps,
    buttonTriggerProps,
    popoverContentProps,
    onValueChange
  } = props

  // Hooks

  // Methods
  // Handle filter
  const handleFilter = useCallback<(value: string, search: string, keywords?: string[]) => number>((value, search) => {
    const searchTrim = search.trim().toLowerCase()
    return !searchTrim || value.toLowerCase().includes(searchTrim) ? 1 : 0
  }, [])

  // Memos
  // Label
  const label = useMemo(() => {
    const label = options.find((option) => option.value === value)?.label
    return typeof label === 'string' ? label : label?.['vi']
  }, [options, value])

  // Template
  return (
    <Popover {...popoverProps}>
      {/* Trigger */}
      <PopoverTrigger {...popoverTriggerProps} asChild={popoverTriggerProps?.asChild ?? true}>
        {popoverTriggerProps?.children ?? (
          <Button
            {...buttonTriggerProps}
            ref={ref}
            variant='outline'
            role='combobox'
            className={cn('w-full px-3', buttonTriggerProps?.className)}
          >
            <div
              className={cn(
                'flex flex-1 items-center justify-between gap-2 font-normal',
                !value && 'text-muted-foreground'
              )}
            >
              {label ?? placeholder}
              <ChevronDown className='text-muted-foreground size-4 shrink-0' />
            </div>
          </Button>
        )}
      </PopoverTrigger>

      {/* Content */}
      <PopoverContent
        {...popoverContentProps}
        align={popoverContentProps?.align ?? 'start'}
        className={cn('min-w-(--radix-popover-trigger-width) p-0', popoverContentProps?.className)}
      >
        <Command filter={handleFilter}>
          <CommandInput placeholder='Tìm kiếm...' className='h-9' />
          <CommandList className='scrollbar'>
            <CommandEmpty>Không tìm thấy lựa chọn nào.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => {
                const isSelected = option.value === value
                const label = typeof option.label === 'string' ? option.label : option.label['vi']

                return (
                  <CommandItem
                    key={option.value}
                    value={label}
                    onSelect={() => onValueChange(value === option.value ? null : option.value)}
                  >
                    {label}
                    <Check className={cn('ml-auto size-4', isSelected ? 'opacity-100' : 'opacity-0')} />
                  </CommandItem>
                )
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export const MonthSelection: FC<Omit<ComboboxProps, 'options'>> = (props) => {
  return <Combobox {...props} options={MONTH_OPTIONS} />
}

export const YearSelection: FC<Omit<ComboboxProps, 'options'>> = (props) => {
  // States
  const [yearOptions] = useState<SelectOption[]>(() => {
    const currentYear = getYear(new Date())
    return Array.from({ length: 201 }, (_, index) => {
      const year = currentYear - 100 + index
      return {
        value: year.toString(),
        label: year.toString()
      }
    })
  })
  return <Combobox {...props} options={yearOptions} />
}

Combobox.displayName = 'Combobox'
export * from './lib'
