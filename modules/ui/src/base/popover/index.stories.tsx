import type { Meta, StoryObj } from '@storybook/react'
import { Popover, PopoverContent, PopoverTrigger } from '.'
import { Button } from '../button'

const meta: Meta<typeof Popover> = {
  component: Popover,
  title: 'Base/Popover'
}
export default meta
type Story = StoryObj<typeof Popover>

export const Primary: Story = {
  render: function Render() {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button>Open</Button>
        </PopoverTrigger>
        <PopoverContent>Place content for the popover here.</PopoverContent>
      </Popover>
    )
  }
}
