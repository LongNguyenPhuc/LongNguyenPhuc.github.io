'use client'
import type { ClassValue } from 'clsx'
import { UI } from '../constants'
import { ClassNames } from '../types'
import { isSameDay, isSameMonth, isSameYear } from 'date-fns'
import { buttonVariants } from '@lib-ui/base/button'
import { cn } from '@utils/cn'

export function appendUIClasses(element: HTMLDivElement, key: string, className: ClassValue) {
  if (Object.values(UI).every((value) => value !== key)) return
  const classes = key.split(' ').reverse()
  const elements: HTMLCollectionOf<Element>[] = [element.getElementsByClassName(`react-calendar__${classes.pop()}`)]
  while (classes?.length > 0) {
    const currentEl: HTMLCollectionOf<Element>[] = []
    do {
      const el = elements.pop()
      const currentClass = classes.pop()
      if (!el) break
      currentEl.push(...Array.from(el).map((e) => e.getElementsByClassName(`react-calendar__${currentClass}`)))
    } while (elements?.length > 0)
    elements.push(...currentEl)
  }

  return elements.forEach((e) =>
    Array.from(e).forEach((el) => {
      const classNameSplits = className?.toString().split(' ').filter(Boolean)
      if (classNameSplits && Array.isArray(classNameSplits)) {
        el.classList.add(...classNameSplits)
      }
    })
  )
}

export function setLayout(element: HTMLDivElement, classNames: ClassNames) {
  return Object.entries(classNames).forEach(([key, className]) => appendUIClasses(element, key, className))
}

export function checkSameValue(
  value: Date,
  valueToCheck: Date,
  view: 'month' | 'year' | 'decade' | 'century' = 'month'
) {
  if (view === 'month') return isSameDay(value, valueToCheck)
  if (view === 'year') return isSameMonth(value, valueToCheck)
  return isSameYear(value, valueToCheck)
}

export function getClassNames(classNames?: ClassNames) {
  return {
    [UI.Nav]: 'flex gap-3 pb-4',
    [UI.NavLabel]: 'capitalize font-semibold',
    [UI.Weekdays]: 'flex justify-between no-wrap text-center pb-2',
    // flex: 0 0 14.2857%
    [UI.Weekday]: 'flex-1 w-9 rounded-md text-[0.8rem] font-normal text-muted-foreground [&>abbr]:no-underline',
    [UI.WeekNumbers]: 'block!',
    [UI.WeekNumber]: 'h-9 w-9 flex-1! flex justify-center items-center text-sm text-muted-foreground',
    [UI.PreviousButton]: cn(
      buttonVariants({ variant: 'outline' }),
      'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 ml-2'
    ),
    [UI.NextButton]: cn(
      buttonVariants({ variant: 'outline' }),
      'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 mr-2'
    ),
    ...classNames
  } as ClassNames
}
