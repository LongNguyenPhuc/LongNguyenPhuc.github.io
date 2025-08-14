import { format } from 'date-fns'
import { DateTimeSearchOptions } from './constants'
import { Value } from './types'

export const isOptionRequireCalendar = (key: DateTimeSearchOptions) =>
  key !== DateTimeSearchOptions.ALL &&
  key !== DateTimeSearchOptions.TODAY &&
  key !== DateTimeSearchOptions.YESTERDAY &&
  key !== DateTimeSearchOptions.SEVEN_DAYS_AGO &&
  key !== DateTimeSearchOptions.THIRTY_DAYS_AGO

export const isOptionsRange = (key: DateTimeSearchOptions) =>
  key === DateTimeSearchOptions.BY_DATE_RANGE || key === DateTimeSearchOptions.BY_WEEK

export function getDisplayValue(selectedItem?: Value, dateFormat = 'dd/MM/yyyy') {
  if (typeof selectedItem?.key == 'undefined') return 'Chọn ngày'
  if (selectedItem.key === DateTimeSearchOptions.ALL) return 'Tất cả'
  if (selectedItem.key === DateTimeSearchOptions.BY_MONTH)
    return selectedItem.value ? format(selectedItem.value?.[0], 'MM/yyyy') : 'Chọn tháng'
  if (selectedItem.key === DateTimeSearchOptions.BY_YEAR)
    return selectedItem.value ? selectedItem.value?.[0].getFullYear() : 'Chọn năm'
  if (
    isOptionsRange(selectedItem.key) ||
    selectedItem.key === DateTimeSearchOptions.SEVEN_DAYS_AGO ||
    selectedItem.key === DateTimeSearchOptions.THIRTY_DAYS_AGO
  ) {
    if (!selectedItem.value) return '--'
    const [from, to] = selectedItem.value
    return `${format(from, dateFormat)} - ${format(to, dateFormat)}`
  }
  if (selectedItem.key === DateTimeSearchOptions.YESTERDAY || selectedItem.key === DateTimeSearchOptions.TODAY)
    return (
      <p>
        <span className='font-semibold'>
          {selectedItem.key === DateTimeSearchOptions.YESTERDAY ? 'Hôm qua' : 'Hôm nay'}:
        </span>{' '}
        {format(selectedItem.value?.[0] as Date, dateFormat)}
      </p>
    )
  if (selectedItem.value) {
    const days = selectedItem.value
      .filter(Boolean)
      .map((date) => format(date, dateFormat))
      .join(', ')
    return days.trim()?.length === 0 ? 'Chọn ngày' : days
  }
}
