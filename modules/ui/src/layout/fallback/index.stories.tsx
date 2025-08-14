// Core
import { Meta, StoryObj } from '@storybook/react'

// Internal
import { Fallback } from '.'

// Meta
const meta: Meta<typeof Fallback> = {
  title: 'Layout/Fallback',
  component: Fallback
}

export default meta

// Stories
type Story = StoryObj<typeof Fallback>

export const ExampleStory: Story = {
  name: 'Example',
  args: {}
}
