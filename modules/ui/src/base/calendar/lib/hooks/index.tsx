// Types
import type { CalendarProps as ReactCalendarProps } from 'react-calendar'
import type { OnClickFunc, TileClassNameFunc } from 'react-calendar'
import type {
  CalendarProps,
  ClassNames,
  Mode,
  MultipleMode,
  MultipleModeState,
  RangeMode,
  RangeModeState,
  SingleMode,
  SingleModeState,
  State
} from '../types'
// React
import {
  useRef,
  useMemo,
  RefObject,
  useCallback,
  useState,
  Ref,
  Dispatch,
  SetStateAction,
  useLayoutEffect
} from 'react'
// Components
import { ChevronLeft, ChevronRight } from 'lucide-react'
// App
import { UI, Flag } from '../constants'
import { cn } from '@utils/cn'
import { endOfDay, isAfter, isBefore, isSameDay, isSameMonth, isSameYear, startOfDay } from 'date-fns'
import { checkSameValue, getClassNames, setLayout } from '../helpers'
import { buttonVariants } from '@lib-ui/base/button'
import { WithRequired } from '@lib-ui/types/lib/with-required'

export function useGetManagedProps(calendarProps: CalendarProps) {
  const {
    classNames: uiClassNames,
    inputRef: controlledInputRef,
    className,
    tileClassName,
    showOutsideDays = true,
    mode = 'single',
    view = 'month',
    selected,
    onSelect,
    onClickMonth: onUserClickMonthFunc,
    onClickYear: onUserClickYearFunc,
    onChange: onUserChangeFunc,
    ...props
  } = calendarProps

  const [values, setValues] = useValueState({ view, mode, selected, onSelect })

  // Input Ref Modifier
  const inputRef = useInputRef(controlledInputRef)

  // ClassNames Modifier
  const classNames = useMemo<ClassNames>(() => getClassNames(uiClassNames), [uiClassNames])

  const getTileClasses: TileClassNameFunc = useCallback(
    ({ activeStartDate, date, view }) => {
      const tileButtonClasses = cn(
        'h-9 w-9 p-0',
        (function () {
          if (mode !== 'range' || !values) return
          const [from, to] = values as [Date, Date | null]
          if (isSameDay(from, date)) {
            const hideRightBorder = to == null || isSameDay(to, date) ? 'rounded-r-full' : ''
            return 'bg-accent rounded-l-full ' + hideRightBorder
          }
          if (!to) return
          if (isAfter(endOfDay(date), startOfDay(from)) && isBefore(date, startOfDay(to))) return 'bg-accent'
          if (isSameDay(to, date)) return 'bg-accent rounded-r-full'
          return
        })()
      )

      const tileAbbrClasses = cn(
        cn(
          // BASE LAYOUT
          '[&>abbr]:flex [&>abbr]:items-center [&>abbr]:justify-center',
          '[&>abbr]:gap-2 [&>abbr]:whitespace-nowrap [&>abbr]:rounded-md [&>abbr]:text-sm [&>abbr]:font-medium',
          '[&>abbr]:ring-offset-background [&>abbr]:transition-colors',
          'focus-visible:[&>abbr]:outline-hidden focus-visible:[&>abbr]:ring-2 focus-visible:[&>abbr]:ring-ring focus-visible:[&>abbr]:ring-offset-2',
          'disabled:[&>abbr]:pointer-events-none disabled:[&>abbr]:opacity-50',
          'hover:cursor-pointer hover:[&>abbr]:bg-accent hover:[&>abbr]:text-accent-foreground [&>abbr]:h-10 [&>abbr]:px-4 [&>abbr]:py-2',
          '[&>abbr]:rounded-full [&>abbr]:h-full [&>abbr]:w-full [&>abbr]:font-normal aria-selected:[&>abbr]:opacity-100',
          // DISABLED STATE
          cn('disabled:[&>abbr]:text-muted-foreground disabled:[&>abbr]:opacity-50', classNames?.[Flag.Disabled]),
          // VIEW SPECIFICS
          (function () {
            if (view !== 'month') return ''
            // TODAY
            if (isSameDay(new Date(), date)) return '[&>abbr]:bg-accent [&>abbr]:text-accent-foreground'
            // OUTSIDE DAYS
            if (!isSameMonth(activeStartDate, date))
              return showOutsideDays ? '[&>abbr]:text-muted-foreground' : '[&>abbr]:invisible'
          })(),
          // SELECTED DATE
          (function () {
            if (!values) return ''
            return cn(
              (Array.isArray(values) ? values : [values]).some(
                (value) => value !== null && checkSameValue(value, date, view)
              ) &&
                (view === 'decade'
                  ? cn(
                      // Base Selected
                      buttonVariants({ variant: 'ghost' }),
                      'bg-primary text-primary-foreground',
                      // On hover
                      'hover:bg-primary hover:text-primary-foreground',
                      // On Focus
                      'focus:bg-primary focus:text-primary-foreground'
                    )
                  : cn(
                      // Base Selected
                      '[&>abbr]:bg-primary [&>abbr]:text-primary-foreground',
                      // On hover
                      'hover:[&>abbr]:bg-primary hover:[&>abbr]:text-primary-foreground',
                      // On Focus
                      'focus:[&>abbr]:bg-primary focus:[&>abbr]:text-primary-foreground'
                    ))
            )
          })()
        )
      )

      const userInputClasses = classNames?.[UI.Tile]
      const userInputClassFunc =
        tileClassName &&
        (typeof tileClassName == 'function' ? tileClassName({ activeStartDate, date, view }) : tileClassName)

      return cn(tileButtonClasses, tileAbbrClasses, userInputClasses, userInputClassFunc)
    },
    [classNames, mode, showOutsideDays, tileClassName, values]
  )

  const onChange = useMemo<OnClickFunc | undefined>(() => {
    if (!onUserChangeFunc && view !== 'month') return undefined
    if (onUserChangeFunc) return onUserChangeFunc
    return (newValue) => {
      if (!newValue) return null
      if (mode === 'single') return (setValues as WithRequired<SingleMode, 'onSelect'>['onSelect'])(newValue)

      const prev = (Array.isArray(values) ? [...values] : [values]).filter((value) => value !== null) as Date[]

      if (mode === 'multiple') {
        const valueSelectedIndex = prev.findIndex((value) => isSameDay(newValue, value))
        const setMultiple = setValues as WithRequired<MultipleMode, 'onSelect'>['onSelect']
        if (valueSelectedIndex === -1) return setMultiple([...prev, newValue])
        return setMultiple(prev.slice(0, valueSelectedIndex).concat(prev.slice(valueSelectedIndex + 1)))
      }

      // Mode = range
      const setRange = setValues as WithRequired<RangeMode, 'onSelect'>['onSelect']
      const prevRange = prev.filter(Boolean)
      if (prevRange?.length < 1) return setRange([newValue, null])
      if (prevRange?.length < 2)
        return setRange(
          isSameDay(prevRange[0], newValue)
            ? null
            : ([...prevRange, newValue].sort((a, b) => a.getTime() - b.getTime()) as [Date, Date])
        )
      // Clear selection
      if (prevRange.every((entry) => isSameDay(entry, newValue))) return setRange(null)
      const [from, to] = prevRange
      if (isBefore(newValue, from)) return setRange([newValue, from])
      if (isSameDay(newValue, to)) return setRange([to, newValue])

      return setRange([from, newValue])
    }
  }, [mode, onUserChangeFunc, setValues, values, view])

  const onClickMonth = useMemo<OnClickFunc | undefined>(() => {
    if (!onUserClickMonthFunc && view !== 'year') return undefined
    if (onUserClickMonthFunc) return onUserClickMonthFunc
    return (value) =>
      (setValues as Dispatch<SetStateAction<typeof value | null>>)((prev) =>
        prev && isSameMonth(value, prev) ? null : value
      )
  }, [onUserClickMonthFunc, setValues, view])

  const onClickYear = useMemo<OnClickFunc | undefined>(() => {
    if (!onUserClickYearFunc && view !== 'decade') return undefined
    if (onUserClickYearFunc) return onUserClickYearFunc
    return (value) =>
      (setValues as Dispatch<SetStateAction<typeof value | null>>)((prev) =>
        prev && isSameYear(value, prev) ? null : value
      )
  }, [onUserClickYearFunc, setValues, view])

  useLayoutEffect(() => setLayout(inputRef.current, classNames), [classNames, inputRef])

  return {
    inputRef,
    view,
    className: cn('p-3', className),
    classNames,
    next2Label: null,
    prev2Label: null,
    nextLabel: <ChevronRight />,
    prevLabel: <ChevronLeft />,
    tileClassName: getTileClasses,
    onClickMonth,
    onClickYear,
    onChange,
    ...props
  } as Omit<ReactCalendarProps, 'value' | 'inputRef' | 'classNames'> & {
    value?: string | Date | null
    inputRef: RefObject<HTMLDivElement>
    classNames: ClassNames
  }
}

// ================================= HELPER HOOKS ========================================

/** Input Ref Modifier */
function useInputRef(controlledInputRef?: Ref<HTMLDivElement>) {
  const uncontrolledInputRef = useRef<HTMLDivElement>(null)
  return useMemo<RefObject<HTMLDivElement>>(
    () => (controlledInputRef as RefObject<HTMLDivElement>) ?? uncontrolledInputRef,
    [controlledInputRef]
  )
}

function useValueState(props: ValueStateProps): State['state'] {
  const { view = 'month', mode, selected, onSelect } = props
  const [uncontrolledValue, setUncontrolledValue] = useState<State['state'][0]>(selected as State['state'][0])

  if (onSelect) return [selected, onSelect] as State['state']
  if (view !== 'month' || mode === 'single')
    return [uncontrolledValue, setUncontrolledValue] as SingleModeState['state']
  if (mode === 'multiple') return [uncontrolledValue, setUncontrolledValue] as MultipleModeState['state']
  return [uncontrolledValue, setUncontrolledValue] as RangeModeState['state']
}

type ValueStateProps = Pick<CalendarProps, 'view'> &
  Omit<Mode, 'mode'> & {
    mode: 'single' | 'multiple' | 'range'
  }
