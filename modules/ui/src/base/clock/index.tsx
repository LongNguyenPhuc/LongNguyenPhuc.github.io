'use client'
import type { ClassValue } from 'clsx'
import { useCallback, useMemo } from 'react'
import { Button } from '../button'
import { ScrollArea } from '../scroll-area'
import { State, useComponentState } from '@lib-ui/types'
import { addHours, format, getHours, getMinutes, getSeconds, setHours, setMinutes, setSeconds, parse } from 'date-fns'

/**
 * References:
 * - https://mui.com/x/react-date-pickers/digital-clock/
 * - https://ant.design/components/time-picker
 */
export function DigitalClock(props: DigitalClockProps) {
  const { ampm, views = ['hours', 'minutes', 'seconds'], steps, minTime, maxTime } = props
  const [value, setValue] = useComponentState(props)

  const is12hFormat = useMemo(() => {
    if (ampm !== undefined) return ampm
    const dateLocale = new Date().toLocaleTimeString().toUpperCase()
    return dateLocale.includes('AM') || dateLocale.includes('PM')
  }, [ampm])

  const hourOptions = useMemo(() => {
    const hourStep = steps?.hours && steps?.hours > 1 ? steps?.hours : 1
    if (!is12hFormat)
      return Array.from({ length: Math.max(24 / hourStep, 2) }, (_, hour) =>
        (hour * hourStep).toString().padStart(2, '0')
      )

    const hours = Array.from({ length: Math.max(12 / hourStep, 2) }, (_, hour) =>
      (hour * hourStep).toString().padStart(2, '0')
    )
    hours[0] = '12'

    return hours
  }, [is12hFormat, steps?.hours])

  const minuteAndSecondOptions = useCallback(
    (option: 'minute' | 'second') => {
      const stepToGet = option === 'minute' ? steps?.minutes : steps?.seconds
      const step = stepToGet && stepToGet > 1 ? stepToGet : 1
      return Array.from({ length: Math.max(60 / step, 2) }, (_, index) => (index * step).toString().padStart(2, '0'))
    },
    [steps?.minutes, steps?.seconds]
  )

  const defaultTime = useMemo(() => parse('00:00:00', 'HH:mm:ss', new Date()), [])

  return (
    <div className='flex w-fit border-b-2'>
      {/* Hour */}
      {views.includes('hours') && (
        <ScrollArea className='clock-hour h-80 w-14 border-r'>
          {hourOptions.map((displayHour) => {
            const hour = (() => {
              const intHour = parseInt(displayHour)
              if (!is12hFormat) return intHour

              const isCurrentTimePM = format(value ?? defaultTime, 'hh:mm:ss a')
                .toUpperCase()
                .includes('PM')
              const offset = isCurrentTimePM ? 12 : 0

              if (intHour === 12) return offset
              return intHour + offset
            })()

            const disabled = (() => {
              let isDisabled = false
              if (minTime) {
                const isMinTimeFirstHour = getMinutes(minTime) === 0 && getSeconds(minTime) === 0
                isDisabled = isDisabled || (isMinTimeFirstHour ? getHours(minTime) > hour : getHours(minTime) >= hour)
              }

              if (maxTime) {
                const isMaxTimeLastHour = getMinutes(maxTime) === 59 && getSeconds(maxTime) === 59
                isDisabled = isDisabled || (isMaxTimeLastHour ? getHours(maxTime) <= hour : getHours(maxTime) < hour)
              }

              return isDisabled
            })()

            return (
              <Button
                key={hour}
                children={displayHour}
                variant='ghost'
                className='aria-selected:bg-accent-table-header w-14'
                disabled={disabled}
                aria-selected={value !== null && !disabled && getHours(value) === hour}
                onClick={() => setValue(setHours(value ?? defaultTime, hour))}
              />
            )
          })}
        </ScrollArea>
      )}

      {/* Minute */}
      {views.includes('minutes') && (
        <ScrollArea className='clock-minute h-80 w-14 border-x'>
          {minuteAndSecondOptions('minute').map((minute) => {
            const disabled = (() => {
              let isDisabled = views.includes('hours') && value === null

              // Min time
              if (minTime) {
                /**
                 * An hour is min when
                 * - The views specified does not include hour view OR
                 * - There is a value present AND said value equals to the min hour specified in Min time
                 */
                const isHourMin = !views.includes('hours') || (value !== null && getHours(value) === getHours(minTime))
                /**
                 * A second is min when
                 * - The views specified include seconds view and min time has a second value > 0 THEN
                 *   the minute can be equal to min time minute OR
                 * - The minute is less than min time minute
                 */
                const isSecondsMin =
                  (views.includes('seconds') && getSeconds(minTime) > 0 && getMinutes(minTime) > parseInt(minute)) ||
                  getMinutes(minTime) >= parseInt(minute)

                isDisabled = isDisabled || getMinutes(minTime) === 59 || (isHourMin && isSecondsMin)
              }

              // Max time
              if (maxTime) {
                const isHourMax = !views.includes('hours') || (value && getHours(value) === getHours(maxTime))
                if (getMinutes(maxTime) !== 0 && isHourMax)
                  isDisabled =
                    isDisabled ||
                    (getSeconds(maxTime) === 59
                      ? getMinutes(maxTime) < parseInt(minute)
                      : getMinutes(maxTime) <= parseInt(minute))
              }

              return isDisabled
            })()

            return (
              <Button
                key={minute}
                children={minute}
                disabled={disabled}
                variant='ghost'
                className='aria-selected:bg-accent-table-header w-14'
                aria-selected={value !== null && getMinutes(value) === parseInt(minute)}
                onClick={() => setValue(setMinutes(value ?? defaultTime, parseInt(minute)))}
              />
            )
          })}
        </ScrollArea>
      )}

      {/* Seconds */}
      {views.includes('seconds') && (
        <ScrollArea className='clock-second h-80 w-14 border-l'>
          {minuteAndSecondOptions('second').map((seconds) => {
            // TODO: Enhance disabled seconds
            const disabled = (() => {
              let isDisabled = (views.includes('hours') || views.includes('minutes')) && value === null

              if (minTime) {
                const isHourMin = !views.includes('hours') || (value !== null && getHours(value) >= getHours(minTime))
                const isMinuteMin =
                  !views.includes('minutes') || (value !== null && getMinutes(value) >= getMinutes(minTime))

                isDisabled = isDisabled || (isHourMin && isMinuteMin && getSeconds(minTime) >= parseInt(seconds))
              }

              if (maxTime) {
                const isHourMax = !views.includes('hours') || (value !== null && getHours(value) <= getHours(maxTime))
                const isMinuteMax =
                  !views.includes('minutes') || (value !== null && getMinutes(value) <= getMinutes(maxTime))

                isDisabled = isDisabled || (isHourMax && isMinuteMax && getSeconds(maxTime) <= parseInt(seconds))
              }

              return isDisabled
            })()

            return (
              <Button
                key={seconds}
                children={seconds}
                disabled={disabled}
                variant='ghost'
                className='aria-selected:bg-accent-table-header w-14'
                aria-selected={value !== null && getSeconds(value) === parseInt(seconds)}
                onClick={() => setValue(setSeconds(value ?? defaultTime, parseInt(seconds)))}
              />
            )
          })}
        </ScrollArea>
      )}

      {/* AM / PM */}
      {views.includes('hours') &&
        is12hFormat &&
        (() => {
          const isCurrentTimePM = value !== null && format(value, 'hh:mm:ss a').toUpperCase().includes('PM')

          return (
            <div className='w-14'>
              <Button
                children='AM'
                variant='ghost'
                className='aria-selected:bg-accent-table-header'
                aria-selected={value !== null && !isCurrentTimePM}
                onClick={() => {
                  // Do nothing if already selected
                  if (!isCurrentTimePM) return
                  setValue(addHours(value ?? defaultTime, -12))
                }}
              />

              <Button
                children='PM'
                variant='ghost'
                className='aria-selected:bg-accent-table-header'
                aria-selected={value !== null && isCurrentTimePM}
                onClick={() => {
                  // Do nothing if already selected
                  if (isCurrentTimePM) return
                  setValue(addHours(value ?? defaultTime, 12))
                }}
              />
            </div>
          )
        })()}
    </div>
  )
}
export type DigitalClockProps = {
  /** ClassNames */
  className?: ClassValue
  /** Set clock format to 12h format */
  ampm?: boolean
  /**
   * Set the views to render\
   * Default to ["hours", "minutes", "seconds"]
   */
  views?: ViewKeys[]
  /**
   * Set steps to iterate through
   */
  steps?: { [key in ViewKeys]?: number }
  /**
   * The mininum time in a date
   */
  minTime?: Date
  /**
   * The maximum time in a date
   */
  maxTime?: Date
} & State<Date | null>
export type ViewKeys = 'hours' | 'minutes' | 'seconds'
