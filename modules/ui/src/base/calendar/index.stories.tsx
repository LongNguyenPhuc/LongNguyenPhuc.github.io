import type { Meta, StoryObj } from '@storybook/react'
import { Calendar } from '.'

import { addDays, subDays } from 'date-fns'

const meta: Meta<typeof Calendar> = {
  component: Calendar,
  title: 'Base/Calendar'
}
export default meta
type Story = StoryObj<typeof Calendar>

export const Primary: Story = {
  args: {
    className: 'rounded-md border w-96',
    mode: 'single',
    selected: subDays(new Date(), 1),
    showOutsideDays: false
  }
}

export const Multiple: Story = {
  args: {
    className: 'rounded-md border w-96',
    mode: 'multiple',
    selected: [subDays(new Date(), 1), subDays(new Date(), 2)]
  }
}

export const Range: Story = {
  args: {
    className: 'rounded-md border w-96',
    mode: 'range',
    selected: [addDays(new Date(), 2), addDays(new Date(), 6)]
  }
}

export const Week: Story = {
  args: {
    className: 'rounded-md border w-96',
    mode: 'range',
    showWeekNumbers: true
  }
}

export const YearView: Story = {
  args: {
    className: 'rounded-md border w-96',
    view: 'year'
  }
}

export const DecadeView: Story = {
  args: {
    className: 'rounded-md border w-96',
    view: 'decade'
  }
}
