import type { Meta, StoryObj } from '@storybook/react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '.'

const meta: Meta<typeof TooltipProvider> = {
  component: Tooltip,
  title: 'Base/Tooltip'
}
export default meta
type Story = StoryObj<typeof TooltipProvider>

export const Primary: Story = {
  render: function Render() {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>Hover</TooltipTrigger>
          <TooltipContent>
            <p>Add to library</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }
}
