import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '../button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from '.'
import { Fragment } from 'react/jsx-runtime'

const meta: Meta<typeof Drawer> = {
  component: Drawer,
  title: 'Base/Drawer'
}
export default meta
type Story = StoryObj<typeof Drawer>

export const Primary: Story = {
  args: {
    children: (
      <Fragment>
        <DrawerTrigger>Open</DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Are you absolutely sure?</DrawerTitle>
            <DrawerDescription>This action cannot be undone.</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <Button>Submit</Button>
            <DrawerClose>
              <Button variant='outline'>Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Fragment>
    )
  }
}
