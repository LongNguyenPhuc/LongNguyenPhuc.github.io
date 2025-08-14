import type { Meta, StoryObj } from '@storybook/react'
import { RangePicker } from '.'

const meta: Meta<typeof RangePicker> = {
  component: RangePicker,
  title: 'Component/RangePicker'
}
export default meta
type Story = StoryObj<typeof RangePicker>

export const Primary: Story = {
  args: {
    className: 'w-[45dvw]'
  }
}
