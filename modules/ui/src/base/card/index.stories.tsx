import { Button } from '@lib-ui/base/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@lib-ui/base/card'
import { Input } from '@lib-ui/base/input'
import { Label } from '@lib-ui/base/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@lib-ui/base/select'
import { Meta, StoryObj } from '@storybook/react'
import { Fragment } from 'react/jsx-runtime'

const meta: Meta<typeof Card> = {
  component: Card,
  title: 'Base/Card'
}
export default meta
type Story = StoryObj<typeof Card>

export const Primary: Story = {
  args: {
    className: 'w-[350px]',
    children: (
      <Fragment>
        <CardHeader>
          <CardTitle>Create project</CardTitle>
          <CardDescription>Deploy your new project in one-click.</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className='grid w-full items-center gap-4'>
              <div className='flex flex-col space-y-1.5'>
                <Label htmlFor='name'>Name</Label>
                <Input id='name' placeholder='Name of your project' />
              </div>
              <div className='flex flex-col space-y-1.5'>
                <Label htmlFor='framework'>Framework</Label>
                <Select>
                  <SelectTrigger id='framework'>
                    <SelectValue placeholder='Select' />
                  </SelectTrigger>
                  <SelectContent position='popper'>
                    <SelectItem value='next'>Next.js</SelectItem>
                    <SelectItem value='sveltekit'>SvelteKit</SelectItem>
                    <SelectItem value='astro'>Astro</SelectItem>
                    <SelectItem value='nuxt'>Nuxt.js</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className='flex justify-between'>
          <Button variant='outline'>Cancel</Button>
          <Button>Deploy</Button>
        </CardFooter>
      </Fragment>
    )
  }
}
