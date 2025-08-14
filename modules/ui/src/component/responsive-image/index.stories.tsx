import type { Meta, StoryObj } from '@storybook/react'
import { ResponsiveImage } from '.'

const meta: Meta<typeof ResponsiveImage> = {
  component: ResponsiveImage,
  title: 'Component/ResponsiveImage'
}
export default meta
type Story = StoryObj<typeof ResponsiveImage>

export const Primary: Story = {
  args: {
    src: 'https://utc2.erp.meu-solutions.com/images/060220251029_f8ocB.png',
    classNames: {
      container: 'h-40 w-40'
    }
  }
}
