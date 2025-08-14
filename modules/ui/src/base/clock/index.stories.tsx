import type { Meta, StoryObj } from '@storybook/react'
import { DigitalClock } from '.'
import { setHours, setMinutes, setSeconds } from 'date-fns'

const meta: Meta<typeof DigitalClock> = {
  component: DigitalClock,
  title: 'Base/DigitalClock'
}
export default meta
type Story = StoryObj<typeof DigitalClock>

export const Primary: Story = {
  args: {
    minTime: setSeconds(setMinutes(setHours(new Date(), 12), 12), 0),
    // maxTime: setSeconds(setMinutes(setHours(new Date(), 12), 37), 58),
    // steps: {
    //   hours: 7,
    //   minutes: 3,
    //   seconds: 5
    // }
    views: ['hours', 'minutes', 'seconds'],
    ampm: false
  }
}
