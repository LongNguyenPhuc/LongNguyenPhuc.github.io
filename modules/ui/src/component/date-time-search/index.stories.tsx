import type { Meta, StoryObj } from '@storybook/react'
import { DateTimeSearch } from '.'

const meta: Meta<typeof DateTimeSearch> = {
  component: DateTimeSearch,
  title: 'Component/DateTimeSearch'
}
export default meta
type Story = StoryObj<typeof DateTimeSearch>

export const Primary: Story = {
  args: {},
  render: function Render(args) {
    return <DateTimeSearch {...args} />
  }
}
