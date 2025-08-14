import { FC, ReactNode, useCallback } from 'react'

export function LogoComponent(props: LogoComponentProps) {
  const { logo, LogoWrapper } = props
  const LogoComponentWrapper: FC<{ className: string; children: ReactNode }> = useCallback(
    (props) => {
      const Wrapper = LogoWrapper ?? 'div'
      return <Wrapper {...props} />
    },
    [LogoWrapper]
  )

  return (
    <LogoComponentWrapper className='flex items-center gap-3 px-3'>
      <picture>
        <img
          // className='h-11 min-h-11 min-w-11'
          className='h-14 min-h-14 min-w-14'
          // src={logo ?? '/logo.webp'}
          src={logo ?? '/logo.png'}
          alt={'logo'}
          onError={(e) => (e.currentTarget.src = '/logo.webp')}
        />
      </picture>

      {/* <div className='text-left font-sans text-xs font-bold whitespace-nowrap uppercase'>
        <p className={cn('mb-1', variant === 'auth' ? 'text-primary' : 'text-primary-foreground')}>
          Trường đại học giao thông vận tải
        </p>
        <p className='text-secondary'>Phân hiệu tại tp. hồ chí minh</p>
      </div> */}
    </LogoComponentWrapper>
  )
}

export type LogoComponentProps = {
  variant?: 'default' | 'admin' | 'auth'
  logo?: string
  LogoWrapper?: (props: { className: string; children: ReactNode }) => ReactNode
}
