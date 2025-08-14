// Core
import { Meta, StoryObj } from '@storybook/react'

// Internal
import { Pagination } from '.'

// Meta
const meta: Meta<typeof Pagination> = {
  title: 'Component/Pagination',
  component: Pagination
}

export default meta

// Stories
type Story = StoryObj<typeof Pagination>

export const ExampleStory: Story = {
  name: 'Example',
  args: {
    pageCount: 10,
    page: 1,
    isHasNextPage: true
  }
}
