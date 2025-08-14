import * as React from 'react'

import { cn } from '@utils/cn'

export type InputProps = React.ComponentPropsWithRef<'input'>

export const baseInputClassName =
  'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-sm'

const Input = ({ ref, className, type, ...props }: InputProps) => {
  return <input type={type} className={cn(baseInputClassName, className)} ref={ref} {...props} />
}

export { Input }
