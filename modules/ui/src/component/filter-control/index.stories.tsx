// Core
import { toast } from 'sonner'
import { Meta, StoryObj } from '@storybook/react'

// Internal
import { FilterControl } from '.'
import { FilterApiOperator } from './lib/enums'
import { FilterInputType } from './lib/enums'

// Meta
const meta: Meta<typeof FilterControl> = {
  title: 'Component/FilterControl',
  component: FilterControl
}

export default meta

// Stories
type Story = StoryObj<typeof FilterControl>

export const ExampleStory: Story = {
  name: 'Example',
  args: {
    filters: [
      {
        label: 'Tên',
        value: 'full_name',
        inputType: FilterInputType.Text,
        apiOperators: [
          {
            value: FilterApiOperator.Equal,
            label: 'Bằng'
          },
          {
            value: FilterApiOperator.Contain,
            label: 'Chứa'
          }
        ]
      },
      {
        label: 'Lương',
        value: 'salary',
        inputType: FilterInputType.Number,
        apiOperators: [
          {
            value: FilterApiOperator.Equal,
            label: 'Bằng'
          },
          {
            value: FilterApiOperator.LessThan,
            label: 'Ít hơn'
          },
          {
            value: FilterApiOperator.GreaterThan,
            label: 'Nhiều hơn'
          }
        ]
      },
      {
        label: 'Chức năng',
        value: 'role',
        inputType: FilterInputType.Select,
        apiOperators: [
          {
            value: FilterApiOperator.Equal,
            label: 'Bằng'
          }
        ],
        options: [
          {
            value: 'admin',
            label: 'Admin'
          },
          {
            value: 'user',
            label: 'Người dùng'
          },
          {
            value: 'manager',
            label: 'Quản lý'
          }
        ]
      },
      {
        label: 'Ngày tạo',
        value: 'created_at',
        inputType: FilterInputType.Date,
        apiOperators: [
          {
            value: FilterApiOperator.LessThanOrEqual,
            label: 'Trước'
          },
          {
            value: FilterApiOperator.GreaterThanOrEqual,
            label: 'Sau'
          }
        ]
      }
    ],
    onSetFilters: (formValues) => {
      const filter =
        formValues.filters?.length > 0
          ? formValues.filters
              .map((filter) => `${filter.logicalOperator ?? ''}${filter.field}${filter.apiOperator}${filter.value}`)
              .join(' ')
          : `keyword=${formValues.keyword}`
      toast.success('Kết quả bộ lọc', {
        description: filter
      })
    }
  },
  render: (args) => {
    return (
      <div className='w-full max-w-[80dvw]'>
        <FilterControl {...args} />
      </div>
    )
  }
}
