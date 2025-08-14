// Core
import { z } from 'zod'
import { toast } from 'sonner'
import { useForm } from 'react-hook-form'
import { Meta, StoryObj } from '@storybook/react'
import { zodResolver } from '@hookform/resolvers/zod'

// App
import { Button } from '@lib-ui/base/button'
import { Form, FormField, FormItem, FormControl, FormMessage, FormLabel } from '@lib-ui/base/form'

// Internal
import { Combobox } from '.'

// Meta
const meta: Meta<typeof Combobox> = {
  title: 'Component/Combobox',
  component: Combobox
}

export default meta

// Stories
type Story = StoryObj<typeof Combobox>

export const ExampleStory: Story = {
  name: 'Example',
  args: {
    options: [
      { value: 'react', label: 'React' },
      { value: 'angular', label: 'Angular' },
      { value: 'vue', label: 'Vue' },
      { value: 'svelte', label: 'Svelte' },
      { value: 'ember', label: 'Ember' }
    ]
  },
  render: function Render(args) {
    const form = useForm({
      defaultValues: {
        framework: ''
      },
      resolver: zodResolver(
        z.object({
          framework: z.string().min(1, {
            message: 'Please select the language'
          })
        })
      )
    })

    const handleSubmit = (values: { framework: string }) => {
      toast.info('Giá trị', {
        description: JSON.stringify(values)
      })
    }

    return (
      <Form {...form}>
        <form className='space-y-6' onSubmit={form.handleSubmit(handleSubmit)}>
          {/* Username */}
          <FormField
            control={form.control}
            name='framework'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Framework</FormLabel>
                <FormControl>
                  <Combobox
                    value={field.value}
                    options={args.options}
                    onValueChange={field.onChange}
                    placeholder='Select framework'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className='space-y-2'>
            <Button type='submit' className='w-full'>
              Submit
            </Button>
          </div>
        </form>
      </Form>
    )
  }
}
