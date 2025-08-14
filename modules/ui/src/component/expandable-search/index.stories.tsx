import type { Meta, StoryObj } from '@storybook/react'
import { ExpandableSearch } from '.'

const meta: Meta<typeof ExpandableSearch> = {
  component: ExpandableSearch,
  title: 'Component/ExpandableSearch'
}
export default meta
type Story = StoryObj<typeof ExpandableSearch>

export const Primary: Story = {
  args: {}
}
