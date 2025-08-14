import type { Meta, StoryObj } from '@storybook/react'
import { Badge } from '.'
import { Fragment } from 'react/jsx-runtime'

const meta: Meta<typeof Badge> = {
  component: Badge,
  title: 'Base/Badge'
}
export default meta
type Story = StoryObj<typeof Badge>

export const Primary: Story = {
  args: {
    children: <Fragment>Badge</Fragment>,
    variant: 'default'
  }
}
