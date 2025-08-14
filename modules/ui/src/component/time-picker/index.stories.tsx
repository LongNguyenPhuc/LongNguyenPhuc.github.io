import type { Meta, StoryObj } from '@storybook/react'
import { TimePicker } from '.'

const meta: Meta<typeof TimePicker> = {
  component: TimePicker,
  title: 'Component/TimePicker'
}
export default meta
type Story = StoryObj<typeof TimePicker>

export const Primary: Story = {
  args: {
    className: 'w-[30dvw]',
    format: 'HH:mm',
    views: ['hours', 'minutes'],
    ampm: false
  }
}
