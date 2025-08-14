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
import { MultiSelect } from '.'

// Meta
const meta: Meta<typeof MultiSelect> = {
  title: 'Component/MultiSelect',
  component: MultiSelect
}

export default meta

// Stories
type Story = StoryObj<typeof MultiSelect>

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
        frameworks: []
      },
      resolver: zodResolver(
        z.object({
          frameworks: z.array(z.string()).min(1, {
            message: 'Please select the framework'
          })
        })
      )
    })

    const handleSubmit = (values: { frameworks: string[] }) => {
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
            name='frameworks'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Frameworks</FormLabel>
                <FormControl>
                  <MultiSelect
                    className='w-dvw'
                    value={field.value}
                    options={args.options}
                    onValueChange={field.onChange}
                    placeholder='Select frameworks'
                    maxCount={3}
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
