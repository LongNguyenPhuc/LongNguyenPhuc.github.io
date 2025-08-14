import { ButtonHTMLAttributes, Fragment, RefObject } from 'react'
import { Slot } from '@radix-ui/react-slot'
import { LoaderCircle } from 'lucide-react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@utils/cn'

const buttonVariants = cva(
  'cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-primary hover:text-secondary',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-accent-information underline-offset-4 hover:underline'
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
)

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  ref?: RefObject<HTMLButtonElement>
  asChild?: boolean
  loading?: boolean
}

const Button = ({
  ref,
  className,
  variant,
  size,
  disabled,
  children,
  loading = false,
  type = 'button',
  asChild = false,
  ...props
}: ButtonProps) => {
  const isDisabled = loading ? true : disabled
  const Comp = asChild ? Slot : 'button'
  const Children = loading ? (
    <Fragment>
      <LoaderCircle className='size-4 animate-spin' />
      {children}
    </Fragment>
  ) : (
    children
  )

  return (
    <Comp
      ref={ref}
      className={cn(buttonVariants({ variant, size, className }))}
      type={type}
      disabled={isDisabled}
      {...props}
    >
      {Children}
    </Comp>
  )
}

export { Button, buttonVariants }
