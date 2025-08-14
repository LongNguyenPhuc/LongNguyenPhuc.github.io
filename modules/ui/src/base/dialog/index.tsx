'use client'

import type { ComponentPropsWithRef, HTMLAttributes } from 'react'
import { Root, Trigger, Portal, Close, Overlay, Content, Title, Description } from '@radix-ui/react-dialog'
import { X } from 'lucide-react'

import { cn } from '@utils/cn'

const Dialog = Root

const DialogTrigger = Trigger

const DialogPortal = Portal

const DialogClose = Close

const DialogOverlay = ({ ref, className, ...props }: ComponentPropsWithRef<typeof Overlay>) => (
  <Overlay
    ref={ref}
    className={cn(
      'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/80',
      className
    )}
    {...props}
  />
)

const DialogContent = ({ ref, className, children, ...props }: ComponentPropsWithRef<typeof Content>) => (
  <DialogPortal>
    <DialogOverlay />
    <Content
      ref={ref}
      className={cn(
        'bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] fixed top-[50%] left-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border p-6 shadow-lg duration-200 sm:rounded-lg',
        className
      )}
      {...props}
    >
      {children}
      <Close className='dialog-close-button ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none'>
        <X className='h-4 w-4' />
        <span className='sr-only'>Close</span>
      </Close>
    </Content>
  </DialogPortal>
)

const DialogHeader = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex flex-col space-y-1.5 text-center sm:text-left', className)} {...props} />
)

const DialogFooter = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', className)} {...props} />
)

const DialogTitle = ({ ref, className, ...props }: ComponentPropsWithRef<typeof Title>) => (
  <Title ref={ref} className={cn('text-lg leading-none font-semibold tracking-tight', className)} {...props} />
)

const DialogDescription = ({ ref, className, ...props }: ComponentPropsWithRef<typeof Description>) => (
  <Description ref={ref} className={cn('text-muted-foreground text-sm', className)} {...props} />
)

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription
}
