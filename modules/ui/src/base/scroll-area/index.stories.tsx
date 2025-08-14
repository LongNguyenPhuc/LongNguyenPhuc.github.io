import type { Meta, StoryObj } from '@storybook/react'
import { ScrollArea } from '.'

const meta: Meta<typeof ScrollArea> = {
  component: ScrollArea,
  title: 'Base/ScrollArea'
}
export default meta
type Story = StoryObj<typeof ScrollArea>

const tags = Array.from({ length: 50 }).map((_, i, a) => `v1.2.0-beta.${a?.length - i}`)
export const Primary: Story = {
  args: {
    className: 'h-72 w-48 rounded-md border',
    children: (
      <div className='p-4'>
        <h4 className='mb-4 text-sm leading-none font-medium'>Tags</h4>
        {tags.map((tag) => (
          <div key={tag} className='text-sm'>
            {tag}
          </div>
        ))}
      </div>
    )
  }
}
