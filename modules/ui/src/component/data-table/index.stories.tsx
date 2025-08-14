// Core
import { Meta, StoryObj } from '@storybook/react'
import { ColumnDef, getExpandedRowModel } from '@tanstack/react-table'

// App
import { Button } from '@lib-ui/base/button'

// Internal
import { DataTable } from '.'

// Meta
const meta: Meta<typeof DataTable> = {
  title: 'Component/DataTable',
  component: DataTable
}

export default meta

// Stories
type Story<T> = StoryObj<typeof DataTable<T>>

// Basic table
type Person = {
  id: string
  firstName: string
  lastName: string
  age: number
}

const basicTableColumnDefs: ColumnDef<Person>[] = [
  {
    id: 'firstName',
    accessorKey: 'firstName',
    header: 'First name'
  },
  {
    id: 'lastName',
    accessorKey: 'lastName',
    header: 'Last name'
  },
  {
    accessorKey: 'age',
    header: () => 'Age'
  }
]

const basicTableData: Person[] = [
  {
    id: '1',
    firstName: 'tanner',
    lastName: 'linsley',
    age: 24
  },
  {
    id: '2',
    firstName: 'tandy',
    lastName: 'miller',
    age: 40
  },
  {
    id: '3',
    firstName: 'joe',
    lastName: 'dirte',
    age: 45
  }
]

export const BasicTableStory: Story<Person> = {
  name: 'Basic',
  args: {
    tableOptions: {
      columns: basicTableColumnDefs,
      data: basicTableData,
      getRowId: (row) => row.id
    }
  }
}

// Column spanning table
type PersonDetail = Person & {
  visits: number
  status: string
  progress: number
}

const columnSpanningTableColumnDefs: ColumnDef<PersonDetail>[] = [
  {
    id: 'name',
    header: () => <div className='text-center'>Name</div>,
    columns: [
      {
        id: 'firstName',
        accessorKey: 'firstName',
        header: 'First name'
      },
      {
        id: 'lastName',
        accessorKey: 'lastName',
        header: 'Last name'
      }
    ]
  },
  {
    id: 'info',
    header: () => <div className='text-center'>Info</div>,
    columns: [
      {
        id: 'age',
        accessorKey: 'age',
        header: () => 'Age'
      },
      {
        id: 'moreInfo',
        header: () => <div className='text-center'>More Info</div>,
        columns: [
          {
            id: 'visits',
            accessorKey: 'visits',
            header: () => <span>Visits</span>
          },
          {
            id: 'status',
            accessorKey: 'status',
            header: 'Status'
          },
          {
            id: 'progress',
            accessorKey: 'progress',
            header: 'Profile Progress'
          }
        ]
      }
    ]
  }
]

const columnSpanningTableData: PersonDetail[] = [
  {
    id: '1',
    firstName: 'tanner',
    lastName: 'linsley',
    age: 24,
    visits: 100,
    status: 'In Relationship',
    progress: 50
  },
  {
    id: '2',
    firstName: 'tandy',
    lastName: 'miller',
    age: 40,
    visits: 40,
    status: 'Single',
    progress: 80
  },
  {
    id: '3',
    firstName: 'joe',
    lastName: 'dirte',
    age: 45,
    visits: 20,
    status: 'Complicated',
    progress: 10
  }
]

export const ColumnSpanningTableStory: Story<PersonDetail> = {
  name: 'Column Spanning',
  args: {
    tableOptions: {
      columns: columnSpanningTableColumnDefs,
      data: columnSpanningTableData,
      getRowId: (row) => row.id
    }
  }
}

// Expanding table
type PersonWithChildren = Person & {
  children: PersonWithChildren[]
}

const expandingTableColumnDefs: ColumnDef<PersonWithChildren>[] = [
  {
    id: 'no',
    header: 'No',
    cell: ({ row }) => {
      const parentRowIndexes = row.getParentRows().map((parentRow) => parentRow.index + 1)
      const renderedValue = [...parentRowIndexes, row.index + 1].join('.')
      const style = {
        marginLeft: `${row.depth * 16}px`
      }

      if (row.getCanExpand()) {
        return (
          <Button variant='ghost' className='gap-1 p-0' style={style} onClick={row.getToggleExpandedHandler()}>
            <span>{renderedValue}</span>
            {row.getCanExpand() && <span>{row.getIsExpanded() ? '👇' : '👉'}</span>}
          </Button>
        )
      }

      return <span style={style}>{renderedValue}</span>
    }
  },
  {
    id: 'firstName',
    accessorKey: 'firstName',
    header: 'First name',
    cell: (info) => info.getValue()
  },
  {
    id: 'lastName',
    accessorKey: 'lastName',
    header: 'Last name',
    cell: (info) => info.getValue()
  },
  {
    id: 'age',
    accessorKey: 'age',
    header: () => 'Age'
  }
]

const expandingTableData: PersonWithChildren[] = [
  {
    id: '1',
    firstName: 'tanner',
    lastName: 'linsley',
    age: 24,
    children: [
      {
        id: '1.1',
        firstName: 'Jane',
        lastName: 'test',
        age: 5,
        children: [
          {
            id: '1.1.1',
            firstName: 'third',
            lastName: 'child',
            age: 0,
            children: []
          },
          {
            id: '1.1.2',
            firstName: 'test 1',
            lastName: 'test 2',
            age: 0,
            children: [
              {
                id: '1.1.2.1',
                firstName: 'test 3',
                lastName: 'test 4',
                age: 0,
                children: []
              },
              {
                id: '1.1.2.2',
                firstName: 'test 5',
                lastName: 'test 6',
                age: 0,
                children: []
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: '2',
    firstName: 'tandy',
    lastName: 'miller',
    age: 40,
    children: [{ id: '2.1', firstName: 'Jim', lastName: 'test', age: 10, children: [] }]
  },
  {
    id: '3',
    firstName: 'joe',
    lastName: 'dirte',
    age: 45,
    children: []
  }
]

export const expandingTableStory: Story<PersonWithChildren> = {
  name: 'Expanding/Sub Rows',
  args: {
    tableOptions: {
      columns: expandingTableColumnDefs,
      data: expandingTableData,
      getExpandedRowModel: getExpandedRowModel(),
      getRowId: (row) => row.id,
      // Need getSubRows for expanding
      getSubRows: (row) => row.children,
      // Expand all by default
      autoResetExpanded: false,
      initialState: {
        expanded: true
      },
      // Not reset page automatically when expanding
      autoResetPageIndex: false
    }
  }
}

// Sum calculation
const sumCalculationTableColumnDefs: ColumnDef<Person>[] = [
  {
    id: 'firstName',
    accessorKey: 'firstName',
    header: 'First name',
    cell: (info) => info.getValue(),
    footer: 'Sum'
  },
  {
    id: 'lastName',
    accessorKey: 'lastName',
    header: 'Last name',
    cell: (info) => info.getValue()
  },
  {
    id: 'age',
    accessorKey: 'age',
    header: () => 'Age',
    footer: ({ table }) =>
      table.getFilteredRowModel().rows.reduce<number>((sum, row) => sum + (row.getValue('age') as number), 0)
  }
]

const sumCalculationTableData: Person[] = [
  {
    id: '1',
    firstName: 'tanner',
    lastName: 'linsley',
    age: 24
  },
  {
    id: '2',
    firstName: 'tandy',
    lastName: 'miller',
    age: 40
  },
  {
    id: '3',
    firstName: 'joe',
    lastName: 'dirte',
    age: 45
  }
]

export const sumTableStory: Story<Person> = {
  name: 'Sum Calculation',
  args: {
    tableOptions: {
      columns: sumCalculationTableColumnDefs,
      data: sumCalculationTableData,
      getRowId: (row) => row.id
    }
  }
}
