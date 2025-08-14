import type { Meta, StoryObj } from '@storybook/react'
import { Header } from '.'

const meta: Meta<typeof Header> = {
  component: Header,
  title: 'Layout/Header'
}
export default meta
type Story = StoryObj<typeof Header>

export const Primary: Story = {
  render: () => (
    <div className='bg-background h-dvh w-full'>
      <Header variant='auth' />
    </div>
  )
}
