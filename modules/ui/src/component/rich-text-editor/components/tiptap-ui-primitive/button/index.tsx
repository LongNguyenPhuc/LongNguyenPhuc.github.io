import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@lib-ui/base'
import { cn } from '@utils/cn'
import { ButtonProps } from './lib/types'
import { parseShortcutKeys } from './lib/helpers'
import { Fragment } from 'react/jsx-runtime'
import { useMemo } from 'react'

export const ShortcutDisplay = ({ shortcuts }: { shortcuts: string[] }) => {
  if (shortcuts?.length === 0) return null

  return (
    <div className='flex items-center gap-1'>
      {shortcuts.map((key, index) => (
        <Fragment key={index}>
          {index > 0 && <kbd className='text-gray-400'>+</kbd>}
          <kbd className='text-gray-400'>{key}</kbd>
        </Fragment>
      ))}
    </div>
  )
}

export const Button = ({
  className = '',
  children,
  tooltip,
  showTooltip = true,
  shortcutKeys,
  textTrim = false,
  'aria-label': ariaLabel,
  ...props
}: ButtonProps) => {
  const isMac = useMemo(() => typeof navigator !== 'undefined' && navigator.platform.toLowerCase().includes('mac'), [])

  const shortcuts = useMemo(() => parseShortcutKeys(shortcutKeys, isMac), [shortcutKeys, isMac])

  const buttonClasses = cn(
    // Base styles
    'cursor-pointer font-medium flex items-center justify-center border-none transition-all',
    'focus-visible:outline-none',
    'text-sm h-8 min-w-8 p-2 gap-1 rounded-md',
    // Style variants
    'bg-gray-100/5 text-gray-900 hover:bg-gray-200',
    // Active state
    'data-[active-state=on]:bg-secondary data-[active-state=on]:text-[rgb(6,65,44)]',
    'data-[state=open]:bg-secondary data-[state=open]:text-[rgb(6,65,44)]',
    // Disabled state
    'disabled:bg-gray-50/4 disabled:text-gray-400/42 disabled:cursor-default',
    // Highlighted state
    'data-[highlighted=true]:bg-gray-200 data-[highlighted=true]:text-gray-900/98',

    className
  )

  if (!tooltip || !showTooltip) {
    return (
      <button className={buttonClasses} aria-label={ariaLabel} data-text-trim={textTrim ? 'on' : 'off'} {...props}>
        {children}
      </button>
    )
  }

  return (
    <TooltipProvider delayDuration={400}>
      <Tooltip>
        <TooltipTrigger
          className={buttonClasses}
          aria-label={ariaLabel}
          data-text-trim={textTrim ? 'on' : 'off'}
          {...props}
        >
          {children}
        </TooltipTrigger>
        <TooltipContent className='flex flex-col items-center bg-gray-900'>
          {tooltip}
          <ShortcutDisplay shortcuts={shortcuts} />
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default Button
