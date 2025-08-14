// App
import type { ReactNode } from 'react'
import Err500Image from './lib/assets/err500.png'
import Err404Image from './lib/assets/err404.png'

// Component
export function RouterErrorBoundary({ status, children }: { status: number; children?: ReactNode }) {
  const routerError = getErrorType(status)

  // Template
  return (
    <div className='flex h-screen w-screen items-center justify-center py-10'>
      <div className='app-container'>
        <div className='flex flex-col items-center justify-center gap-10 lg:flex-row lg:gap-20'>
          <img
            src={routerError.image}
            // src={typeof routerError.image === 'string' ? routerError.image : routerError.image.src}
            className='w-1/2 lg:w-1/3'
            alt='error'
          />
          <div className='flex flex-col items-center gap-4'>
            <h2 className='text-app-blue text-2xl font-bold'>{routerError.message}</h2>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default RouterErrorBoundary

const getErrorType = (status: number) => {
  if (status === 404) {
    return {
      message: 'Oops! Không tìm thấy trang.',
      image: Err404Image
    }
  }

  if (status === 403) {
    return {
      message: 'Oops! Bạn không có quyền truy cập trang này.',
      image: Err500Image
    }
  }

  return {
    message: 'Oops! Có lỗi xảy ra.',
    image: Err500Image
  }
}
