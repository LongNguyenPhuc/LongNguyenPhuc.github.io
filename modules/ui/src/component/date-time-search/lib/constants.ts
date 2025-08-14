export enum DateTimeSearchOptions {
  ALL,
  TODAY,
  YESTERDAY,
  SEVEN_DAYS_AGO,
  THIRTY_DAYS_AGO,
  BY_DATE,
  BY_DATE_RANGE,
  BY_WEEK,
  BY_MONTH,
  BY_YEAR
}

export const defaultOptions: DateTimeSearchOptions[] = [
  DateTimeSearchOptions.ALL,
  DateTimeSearchOptions.TODAY,
  DateTimeSearchOptions.YESTERDAY,
  DateTimeSearchOptions.SEVEN_DAYS_AGO,
  DateTimeSearchOptions.THIRTY_DAYS_AGO,
  DateTimeSearchOptions.BY_DATE,
  DateTimeSearchOptions.BY_DATE_RANGE,
  DateTimeSearchOptions.BY_WEEK,
  DateTimeSearchOptions.BY_MONTH,
  DateTimeSearchOptions.BY_YEAR
]

export const getLabelsByEnum = (key: DateTimeSearchOptions) => {
  switch (key) {
    default:
      throw new Error('Invalid value')
    case DateTimeSearchOptions.ALL:
      return 'Tất cả'
    case DateTimeSearchOptions.TODAY:
      return 'Hôm nay'
    case DateTimeSearchOptions.YESTERDAY:
      return 'Hôm qua'
    case DateTimeSearchOptions.SEVEN_DAYS_AGO:
      return '7 ngày trước'
    case DateTimeSearchOptions.THIRTY_DAYS_AGO:
      return '30 ngày trước'
    case DateTimeSearchOptions.BY_DATE:
      return 'Theo ngày'
    case DateTimeSearchOptions.BY_DATE_RANGE:
      return 'Theo khoảng ngày'
    case DateTimeSearchOptions.BY_MONTH:
      return 'Theo tháng'
    case DateTimeSearchOptions.BY_WEEK:
      return 'Theo tuần'
    case DateTimeSearchOptions.BY_YEAR:
      return 'Theo năm'
  }
}
