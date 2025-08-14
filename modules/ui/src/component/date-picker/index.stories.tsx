// Core
import { Meta, StoryObj } from '@storybook/react'

// Internal
import { DatePicker } from '.'
import { useState } from 'react'
import { Mode } from '@lib-ui/base/calendar/lib'

// Meta
const meta: Meta<typeof DatePicker> = {
  title: 'Component/DatePicker',
  component: DatePicker
}

export default meta

// Stories
type Story = StoryObj<typeof DatePicker>

export const Primary: Story = {
  name: 'Primary',
  render: function Render() {
    const [date, setDate] = useState<Mode['selected']>(null)
    return (
      <div className='w-[30dvw]'>
        <DatePicker mode='single' value={date} onValueChange={setDate} />
      </div>
    )
  }
}
