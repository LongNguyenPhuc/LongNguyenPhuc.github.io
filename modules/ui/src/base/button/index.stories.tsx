import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '.'
import { Fragment } from 'react/jsx-runtime'

const meta: Meta<typeof Button> = {
  component: Button,
  title: 'Base/Button'
}
export default meta
type Story = StoryObj<typeof Button>

export const Primary: Story = {
  args: {
    children: <Fragment>Hello World</Fragment>,
    variant: 'default'
  }
}
