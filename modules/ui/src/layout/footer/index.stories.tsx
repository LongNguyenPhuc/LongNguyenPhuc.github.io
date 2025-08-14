import type { Meta, StoryObj } from '@storybook/react'
import { Footer } from '.'

const meta: Meta<typeof Footer> = {
  component: Footer,
  title: 'Layout/Footer'
}
export default meta
type Story = StoryObj<typeof Footer>

export const Primary: Story = {
  render: () => (
    <div className='bg-background flex h-dvh w-full items-end'>
      <Footer />
    </div>
  )
}
