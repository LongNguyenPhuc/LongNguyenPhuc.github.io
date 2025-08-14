'use client'
// Core
import { ComponentPropsWithRef, FC, Fragment } from 'react'

// App
import {
  Breadcrumb as BreadcrumbUi,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@lib-ui/base/breadcrumb'
import { useBreadcrumbStore } from './hook'

export { useBreadcrumbStore }
// Internal
export type Props = { onClickLink?: (path: string) => void } & ComponentPropsWithRef<'div'>

// Component
export const Breadcrumb: FC<Props> = (props) => {
  // Props
  const { onClickLink, ...divProps } = props

  // Stores
  const breadcrumbs = useBreadcrumbStore((state) => state.breadcrumbs)
  // Template
  return (
    <div {...divProps}>
      <BreadcrumbUi>
        <BreadcrumbList>
          {breadcrumbs.map((breadcrumb, index) => {
            if (index === breadcrumbs?.length - 1) {
              return (
                <BreadcrumbItem key={breadcrumb.fullPath}>
                  <BreadcrumbPage>{breadcrumb.basePath}</BreadcrumbPage>
                </BreadcrumbItem>
              )
            }
            return (
              <Fragment key={breadcrumb.fullPath}>
                <BreadcrumbItem className='hidden md:block'>
                  <BreadcrumbLink asChild>
                    <div
                      role='button'
                      onClick={(e) => {
                        e.preventDefault()
                        onClickLink?.(breadcrumb.fullPath)
                      }}
                    >
                      {breadcrumb.basePath}
                    </div>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className='hidden md:block' />
              </Fragment>
            )
          })}
        </BreadcrumbList>
      </BreadcrumbUi>
    </div>
  )
}
