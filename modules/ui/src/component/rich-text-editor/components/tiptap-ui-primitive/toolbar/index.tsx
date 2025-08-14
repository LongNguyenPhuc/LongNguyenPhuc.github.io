export const Toolbar = ({ children }: React.PropsWithChildren) => {
  return (
    <div className='scrollbar-none flex w-full touch-pan-x flex-col divide-y divide-gray-300 overflow-x-auto overscroll-x-contain rounded-t-md border border-gray-300 bg-white max-sm:top-auto max-sm:bottom-0 max-sm:border-t max-sm:border-b-0 max-sm:pb-[env(safe-area-inset-bottom,0px)]'>
      {children}
    </div>
  )
}

export const ToolbarRow = ({ children, className }: React.PropsWithChildren & { className?: string }) => {
  return (
    <div
      className={`flex min-h-[2.75rem] flex-wrap items-center gap-1 px-1.5 empty:hidden max-sm:flex-nowrap max-sm:justify-start lg:flex-nowrap ${className}`}
    >
      {children}
    </div>
  )
}

export const ToolbarGroup = ({ children }: React.PropsWithChildren) => {
  return (
    <div className='empty:next-[.tiptap-separator]:hidden flex flex-wrap items-center gap-0.5 empty:hidden max-sm:flex-none lg:flex-nowrap [.tiptap-separator+&]:empty:hidden'>
      {children}
    </div>
  )
}
