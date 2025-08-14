// Core
import { Meta, StoryObj } from '@storybook/react'
// Internal
import { RichTextEditor } from '.'
// Meta
const meta: Meta<typeof RichTextEditor> = {
  title: 'Component/RichTextEditor',
  component: RichTextEditor
}

export default meta

// Stories
type Story = StoryObj<typeof RichTextEditor>

export const Primary: Story = {
  name: 'Primary',
  render: (args) => <RichTextEditor {...args} />,
  args: {
    value: '<p>Text editor</p>',
    placeholder: 'Write something...',
    height: 'h-[400px]',
    uploadFileThroughBrowser: true
  }
}
