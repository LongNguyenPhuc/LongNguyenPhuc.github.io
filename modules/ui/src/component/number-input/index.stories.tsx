// Core
import { useForm } from 'react-hook-form'
import { Meta, StoryObj } from '@storybook/react'

// App
import { Form, FormField, FormItem, FormControl, FormMessage } from '../../base/form'

// Internal
import { NumberInput, NumberInputProps } from '.'

// Meta
const meta: Meta<typeof NumberInput> = {
  title: 'Component/Number Input',
  component: NumberInput
}

export default meta

// Stories
type Story = StoryObj<typeof NumberInput>

export const ExampleStory: Story = {
  name: 'Example',
  args: {
    value: 0
  },
  render: function Render(args: NumberInputProps) {
    const form = useForm<{
      numberField: string
    }>({
      defaultValues: {
        numberField: args.value as string
      }
    })

    return (
      <Form {...form}>
        <form>
          <FormField
            control={form.control}
            name='numberField'
            render={({ field: { onChange, ...fieldRest } }) => (
              <FormItem className='w-[400px]'>
                <FormControl>
                  <NumberInput
                    {...fieldRest}
                    onValueChange={(event: { value: unknown }) => onChange(event.value)}
                    onFieldChange={onChange}
                    ref={undefined}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    )
  }
}
