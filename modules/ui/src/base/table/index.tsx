import * as React from 'react'

import { cn } from '@utils/cn'

const Table = ({ ref, className, ...props }: React.ComponentPropsWithRef<'table'>) => (
  <table ref={ref} className={cn('h-full w-full caption-bottom text-sm', className)} {...props} />
)

const TableHeader = ({ ref, className, ...props }: React.ComponentPropsWithRef<'thead'>) => (
  <thead ref={ref} className={cn('h-full [&_tr]:border-b', className)} {...props} />
)

const TableBody = ({ ref, className, ...props }: React.ComponentPropsWithRef<'tbody'>) => (
  <tbody ref={ref} className={cn('h-full [&_tr:last-child]:border-0', className)} {...props} />
)

const TableFooter = ({ ref, className, ...props }: React.ComponentPropsWithRef<'tfoot'>) => (
  <tfoot ref={ref} className={cn('bg-muted/40 h-full border-t last:[&>tr]:border-b-0', className)} {...props} />
)

const TableRow = ({ ref, className, ...props }: React.ComponentPropsWithRef<'tr'>) => (
  <tr
    ref={ref}
    className={cn('hover:bg-muted/50 data-[state=selected]:bg-muted h-full border-b transition-colors', className)}
    {...props}
  />
)

const TableHead = ({ ref, className, ...props }: React.ComponentPropsWithRef<'th'>) => (
  <th
    ref={ref}
    className={cn('text-muted-foreground h-12 px-4 text-left align-middle font-medium', className)}
    {...props}
  />
)

const TableCell = ({ ref, className, ...props }: React.ComponentPropsWithRef<'td'>) => (
  <td ref={ref} className={cn('h-full p-4 align-middle', className)} {...props} />
)

const TableCaption = ({ ref, className, ...props }: React.ComponentPropsWithRef<'caption'>) => (
  <caption ref={ref} className={cn('text-muted-foreground mt-4 h-full text-sm', className)} {...props} />
)

export { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption }
