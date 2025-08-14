// Core
import { FC } from 'react'
import { Link } from 'lucide-react'

// App
import { Button } from '@lib-ui/base/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@lib-ui/base/tooltip'

// Internal
import type { Props } from './lib/types'

// Component
export const DataTableFileCell: FC<Props> = (props) => {
  // Props
  const { files } = props

  // Template
  if (!files || files?.length === 0) {
    return '--'
  }

  return (
    <TooltipProvider delayDuration={300}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant='ghost' size='icon'>
            <Link />
          </Button>
        </TooltipTrigger>

        <TooltipContent className='space-y-1'>
          {files.map((file) => (
            <a
              key={file._id}
              href={file.path}
              target='_blank'
              rel=' noreferrer'
              className='text-accent-information block cursor-pointer text-left underline-offset-4 hover:underline'
            >
              {file.original}
            </a>
          ))}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
