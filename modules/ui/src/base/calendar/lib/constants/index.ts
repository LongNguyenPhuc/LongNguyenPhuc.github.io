export enum UI {
  /** The navigation bar with the previous and next buttons. */
  Nav = 'navigation',
  /** The navigation Label. */
  NavLabel = 'navigation__label',
  /** The calendar(s) container */
  Container = 'viewContainer',
  /** The cell */
  Tile = 'tile',
  /** The row grouping the weekdays in the column headers. */
  Weekdays = 'month-view__weekdays',
  /** The column header with the weekday. */
  Weekday = 'month-view__weekdays__weekday',
  /** The container containing the week number cells. */
  WeekNumbers = 'month-view__weekNumbers',
  /** The cell containing the week number. */
  WeekNumber = 'month-view__weekNumbers tile',
  /** The next button in the navigation. */
  NextButton = 'navigation__next-button',
  /** The previous button in the navigation. */
  PreviousButton = 'navigation__prev-button'
}

export enum Flag {
  Today = 'tile--now',
  Disabled = 'tile-disabled'
}

export enum SelectionState {
  selected = 'tile--active'
}
