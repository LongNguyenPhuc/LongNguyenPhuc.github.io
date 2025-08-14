// Core
import { useForm } from 'react-hook-form'
import { Meta, StoryObj } from '@storybook/react'

// App
import { Form, FormField, FormItem, FormControl } from '@lib-ui/base/form'

// Internal
import { PasswordInput } from '.'

// Meta
const meta: Meta<typeof PasswordInput> = {
  title: 'Component/PasswordInput',
  component: PasswordInput
}

export default meta

// Stories
type Story = StoryObj<typeof PasswordInput>

export const ExampleStory: Story = {
  name: 'Example',
  args: {
    value: ''
  },
  render: function Render(args) {
    const form = useForm<{
      password: string
    }>({
      defaultValues: {
        password: args.value as string
      }
    })

    return (
      <Form {...form}>
        <form>
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem className='w-[400px]'>
                <FormControl>
                  <PasswordInput {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </form>
      </Form>
    )
  }
}
