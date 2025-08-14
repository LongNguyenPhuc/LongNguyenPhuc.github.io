// Core

import { useTranslation } from 'react-i18next'
import { CheckIcon, XCircle, XIcon, ChevronDown } from 'lucide-react'

// App
import { cn } from '@utils/cn'
import { Language } from '@utils/i18n'
import { Badge } from '@lib-ui/base/badge'
import { buttonVariants } from '@lib-ui/base/button'
import { Separator } from '@lib-ui/base/separator'
import { SelectOption } from '@lib-ui/types'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@lib-ui/base/command'

// Internal
import { isOptionsGrouped, SelectOptionProps, type MultiSelectProps } from './lib'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@lib-ui/base/dropdown-menu'
import { uniqueId } from 'lodash-es'

// Component
export * from './lib'
export const MultiSelect = (props: MultiSelectProps) => {
  // Props
  const {
    ref,
    className,
    options,
    value,
    placeholder,
    maxCount = 3,
    dropdownProps,
    valueClassName,
    dropdownTriggerProps,
    dropdownContentProps,
    onValueChange
  } = props

  // Hooks
  const { t } = useTranslation('component/multi-select')

  // Methods
  // Handle toggle option
  const handleToggleOption = (option: SelectOption['value']) => {
    const newSelectedValues = value.includes(option) ? value.filter((value) => value !== option) : [...value, option]
    onValueChange(newSelectedValues)
  }

  const triggerClassName = cn(
    buttonVariants({ variant: 'outline' }),
    'h-fit min-h-10 w-full py-1 font-normal [&_svg]:pointer-events-auto overflow-hidden',
    className
  )

  // Template
  return (
    <DropdownMenu {...dropdownProps}>
      {/* Trigger */}
      <DropdownMenuTrigger ref={ref} className={triggerClassName} {...dropdownTriggerProps}>
        <DisplayValues
          className={valueClassName}
          value={value}
          placeholder={placeholder}
          maxCount={maxCount}
          options={isOptionsGrouped(options) ? options.flatMap((group) => group.options) : options}
          onValueChange={onValueChange}
          handleToggleOption={handleToggleOption}
        />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        {...dropdownContentProps}
        align={dropdownContentProps?.align ?? 'start'}
        className={cn(
          'w-full min-w-[--radix-dropdown-trigger-width] p-0',
          triggerClassName.split(' ').filter((val) => val.includes('w-')) // trigger class width
        )}
      >
        <Command>
          <CommandInput placeholder={t('searchPlaceholder')} />
          <CommandList className='scrollbar'>
            <CommandEmpty>{t('empty')}</CommandEmpty>
            {(isOptionsGrouped(options) ? options : [{ groupLabel: '', options }]).map((group) => (
              <CommandGroup heading={group.groupLabel} key={uniqueId()}>
                {group.options.map((option) => (
                  <Option key={option.value} option={option} value={value} handleToggleOption={handleToggleOption} />
                ))}
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

/***************************************** DISPLAY VALUES *****************************************/
type DisplayValuesProps = Pick<MultiSelectProps, 'value' | 'placeholder' | 'maxCount' | 'onValueChange'> & {
  className?: string
  options: Array<SelectOptionProps>
  handleToggleOption: (option: SelectOption['value']) => void
}
function DisplayValues(props: DisplayValuesProps) {
  const { className, options, value, placeholder, maxCount = 3, onValueChange, handleToggleOption } = props
  const { t, i18n } = useTranslation('components/shared/multi-select')

  // Handle clear
  const handleClear = () => {
    onValueChange([])
  }

  // Handle clear extra options
  const handleClearExtraOptions = () => {
    const newSelectedValues = value.slice(0, maxCount)
    onValueChange(newSelectedValues)
  }

  if (!value || value?.length <= 0)
    return (
      <div className='mx-auto flex w-full items-center justify-between gap-2'>
        <span className='text-sm'>{placeholder ?? t('placeholder')}</span>
        <ChevronDown className='h-4' />
      </div>
    )

  return (
    <div className='grid w-full grid-cols-4 items-center justify-between'>
      <div className='col-span-3 flex items-center gap-2'>
        <div className='flex flex-wrap gap-1'>
          {value.slice(0, maxCount).map((value) => {
            const option = options.find((option) => option.value === value)
            const label = typeof option?.label === 'string' ? option.label : option?.label[i18n.language as Language]
            const IconComponent = option?.icon

            return (
              <Badge className={cn('grid grid-cols-3', className)} key={value} variant='secondary'>
                <div className='col-span-2 flex items-center gap-2'>
                  {IconComponent && <IconComponent className='mr-2 size-4' />}
                  <span className='overflow-hidden text-ellipsis'>{label}</span>
                </div>

                <div className='flex w-full justify-end'>
                  <XCircle
                    className='ml-2 size-6'
                    onClick={(event) => {
                      event.stopPropagation()
                      handleToggleOption(value)
                    }}
                  />
                </div>
              </Badge>
            )
          })}
        </div>

        {value?.length > maxCount && (
          <Badge variant='secondary'>
            {`+ ${value?.length - maxCount}`}
            <XCircle
              className='ml-2 size-4 cursor-pointer'
              onClick={(event) => {
                event.stopPropagation()
                handleClearExtraOptions()
              }}
            />
          </Badge>
        )}
      </div>

      <div className='text-muted-foreground flex items-center justify-end gap-1'>
        <div
          className='hover:bg-accent hover:text-accent-foreground cursor-pointer'
          onClick={(event) => {
            event.stopPropagation()
            handleClear()
          }}
        >
          <XIcon className='size-4' />
        </div>

        <Separator orientation='vertical' className='flex h-full min-h-6' />

        <ChevronDown className='h-4' />
      </div>
    </div>
  )
}

/***************************************** Command Render *****************************************/
type OptionRenderProps = {
  value: MultiSelectProps['value']
  option: SelectOptionProps
  handleToggleOption: (option: SelectOption['value']) => void
}
function Option(props: OptionRenderProps) {
  const { value, option, handleToggleOption } = props
  const { i18n } = useTranslation('components/shared/multi-select')

  const isSelected = value.includes(option.value)
  const label = typeof option.label === 'string' ? option.label : option.label[i18n.language as Language]

  return (
    <CommandItem
      key={option.value}
      value={label}
      className='cursor-pointer'
      onSelect={() => handleToggleOption(option.value)}
    >
      <div
        className={cn(
          'flex size-4 items-center justify-center rounded-sm',
          isSelected ? 'text-primary' : 'opacity-50 [&_svg]:invisible'
        )}
      >
        <CheckIcon className='size-4' />
      </div>
      {option.icon && <option.icon className='text-muted-foreground mr-2 size-4' />}
      <span>{label}</span>
    </CommandItem>
  )
}
