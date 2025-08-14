import { Card, CardContent } from '@lib-ui/base/card'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '.'
import { Meta, StoryObj } from '@storybook/react'
import { Fragment } from 'react/jsx-runtime'

const meta: Meta<typeof Carousel> = {
  component: Carousel,
  title: 'Base/Carousel'
}
export default meta
type Story = StoryObj<typeof Carousel>

export const Primary: Story = {
  args: {
    className: 'w-full max-w-xs',
    children: (
      <Fragment>
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index}>
              <div className='p-1'>
                <Card>
                  <CardContent className='flex aspect-square items-center justify-center p-6'>
                    <span className='text-4xl font-semibold'>{index + 1}</span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Fragment>
    )
  }
}
