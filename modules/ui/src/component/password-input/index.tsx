// Core
import { forwardRef, useState } from 'react'
import { EyeNoneIcon, EyeOpenIcon } from '@radix-ui/react-icons'

// App
import { cn } from '@utils/cn'
import { Input } from '@lib-ui/base/input'

// Internal
import { type PasswordInputProps } from './lib'

// Component
export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(({ className, ...props }, ref) => {
  // States
  const [passwordVisibility, setPasswordVisibility] = useState(false)

  // Template
  return (
    <div className='relative'>
      <Input
        ref={ref}
        type={passwordVisibility ? 'text' : 'password'}
        autoComplete='on'
        {...props}
        className={cn('pr-10', className)}
      />
      <div
        className='text-muted-foreground absolute inset-y-0 right-0 flex cursor-pointer items-center px-3 py-2'
        onClick={() => setPasswordVisibility(!passwordVisibility)}
      >
        {passwordVisibility ? <EyeNoneIcon className='size-4' /> : <EyeOpenIcon className='size-4' />}
      </div>
    </div>
  )
})

PasswordInput.displayName = 'PasswordInput'
export * from './lib'
