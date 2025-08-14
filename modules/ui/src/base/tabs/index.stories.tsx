import type { Meta, StoryObj } from '@storybook/react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '.'

const meta: Meta<typeof Tabs> = {
  component: Tabs,
  title: 'Base/Tabs'
}
export default meta
type Story = StoryObj<typeof Tabs>

export const Primary: Story = {
  render: function Render() {
    return (
      <Tabs defaultValue='account' className='w-[400px]'>
        <TabsList>
          <TabsTrigger value='account'>Account</TabsTrigger>
          <TabsTrigger value='password'>Password</TabsTrigger>
        </TabsList>
        <TabsContent value='account'>Make changes to your account here.</TabsContent>
        <TabsContent value='password'>Change your password here.</TabsContent>
      </Tabs>
    )
  }
}
