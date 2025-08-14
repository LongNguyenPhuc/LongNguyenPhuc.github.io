import type { Meta, StoryObj } from '@storybook/react'
import { Avatar, AvatarFallback, AvatarImage } from '.'
import { Fragment } from 'react/jsx-runtime'

const meta: Meta<typeof Avatar> = {
  component: Avatar,
  title: 'Base/Avatar'
}
export default meta
type Story = StoryObj<typeof Avatar>

export const Primary: Story = {
  args: {
    children: (
      <Fragment>
        <AvatarImage src='https://github.com/shadcn.png' />
        <AvatarFallback>CN</AvatarFallback>
      </Fragment>
    )
  }
}
