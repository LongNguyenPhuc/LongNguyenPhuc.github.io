import { NumericFormat } from 'react-number-format'
import { ChevronDown, ChevronUp } from 'lucide-react'

// App
import { cn } from '@utils/cn'
import { Input } from '../../base/input'
import { Button } from '../../base/button'

// Internal
import { type NumberInputProps } from './lib'

// Component
export const NumberInput = ({
  ref,
  ...props
}: NumberInputProps & {
  ref?: React.RefObject<HTMLInputElement>
}) => {
  // Props
  const {
    value,
    placeholder = 'Nhập giá trị',
    min = -Infinity,
    max = Infinity,
    step = 1,
    decimalScale = 0,
    allowNegative = false,
    thousandSeparator = ',',
    valueIsNumericString = true,
    className,
    isDisplayStepper = true,
    onFieldChange,
    ...restProps
  } = props

  // Methods
  // Handle increment
  const handleIncrement = () => {
    if (!value) {
      return
    }
    onFieldChange?.(+value + +step)
  }

  // Handle decrement
  const handleDecrement = () => {
    if (!value) {
      return
    }
    onFieldChange?.(+value - +step)
  }

  // Handle blur
  const handleBlur = () => {
    if (!value) {
      return
    }
    if (value < min) {
      return onFieldChange?.(min)
    }
    if (value > max) {
      return onFieldChange?.(max)
    }
  }

  // Template
  return (
    <div className={cn('relative flex items-center', className)}>
      <NumericFormat
        getInputRef={ref}
        value={value}
        placeholder={placeholder}
        thousandSeparator={thousandSeparator}
        valueIsNumericString={valueIsNumericString}
        decimalScale={decimalScale}
        customInput={Input}
        allowNegative={allowNegative}
        className={cn(
          '[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none'
        )}
        {...restProps}
        onBlur={handleBlur}
      />

      {isDisplayStepper && (
        <div className='absolute top-0 right-0 bottom-0 flex flex-col justify-between border-l [&_button]:grow'>
          <Button
            aria-label='Increase value'
            size='icon'
            variant='outline'
            className='text-muted-foreground rounded-l-none rounded-br-none border-b-[0.5px] border-l-0 focus-visible:relative'
            onClick={handleIncrement}
            disabled={!!value && +value >= +max}
          >
            <ChevronUp />
          </Button>

          <Button
            aria-label='Decrease value'
            variant='outline'
            size='icon'
            className='text-muted-foreground rounded-l-none rounded-tr-none border-t-[0.5px] border-l-0 focus-visible:relative'
            onClick={handleDecrement}
            disabled={!!value && +value <= +min}
          >
            <ChevronDown />
          </Button>
        </div>
      )}
    </div>
  )
}

NumberInput.displayName = 'NumberInput'
export * from './lib'
