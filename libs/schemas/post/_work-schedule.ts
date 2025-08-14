import { z } from 'zod'
import { v4 as uuid } from 'uuid'

/************************************* WorkScheduleContent *************************************/
export type WorkScheduleContentTimePlace = z.infer<typeof WorkScheduleContentTimePlaceSchema>
export const WorkScheduleContentTimePlaceSchema = z.object({
  startTime: z
    .string()
    .refine((val) => z.string().time().safeParse(val.concat(':00')).success, 'Vui lòng chọn thời gian'),
  endTime: z
    .string()
    .refine((val) => z.string().time().safeParse(val.concat(':00')).success, 'Vui lòng chọn thời gian'),
  content: z.string().min(1, 'Vui lòng nhập nội dung'),
  address: z.string().min(1, 'Vui lòng nhập địa điểm')
})

export type WorkScheduleContentPartakers = z.infer<typeof WorkScheduleContentPartakersSchema>
export const WorkScheduleContentPartakersSchema = z.object({
  participant: z.string().min(1, 'Vui lòng nhập thành phần tham gia'),
  implementer: z.string().min(1, 'Vui lòng nhập người chủ trì')
})

export type WorkScheduleContentRequirement = z.infer<typeof WorkScheduleContentRequirementSchema>
export const WorkScheduleContentRequirementSchema = z.object({
  requirement: z.string().default('').optional()
})

// Main
export type WorkScheduleContent = z.infer<typeof WorkScheduleContentSchema>
export const WorkScheduleContentSchema = z
  .object({
    id: z.string().uuid()
  })
  .merge(WorkScheduleContentTimePlaceSchema)
  .merge(WorkScheduleContentPartakersSchema)
  .merge(WorkScheduleContentRequirementSchema)
/************************************* WorkScheduleContent *************************************/

/************************************* WorkScheduleDays *************************************/
export type WorkScheduleDay = z.infer<typeof WorkScheduleDaySchema>
export const dates = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'] as const
export const WorkScheduleDaySchema = z.object({
  date: z.enum(dates),
  schedules: z.array(
    z.object({
      id: z.string().uuid(),
      startTime: z.string(),
      endTime: z.string(),
      content: z.string(),
      address: z.string(),
      participant: z.string(),
      implementer: z.string(),
      requirement: z.string().default('').optional()
    })
  )
})
/************************************* WorkScheduleDays *************************************/

/************************************* Default Values *************************************/
export const workScheduleContentDefaultValues: Omit<WorkScheduleContent, 'id'> = {
  startTime: '',
  endTime: '',
  content: '',
  address: '',
  participant: '',
  implementer: '',
  requirement: ''
}

export const workScheduleDayDefaultValues: WorkScheduleDay[] = dates.map((date) => ({
  date,
  schedules: [
    {
      id: uuid(),
      startTime: '',
      endTime: '',
      content: '',
      address: '',
      participant: '',
      implementer: '',
      requirement: ''
    }
  ]
}))

type WorkScheduleRow = {
  id: string
  day: WorkScheduleDay['date']
  time_place: WorkScheduleContentTimePlace
  partakers: WorkScheduleContentPartakers
  requirements: WorkScheduleContentRequirement
  children: WorkScheduleRow[]
}
export function mapDaysToTable(days: WorkScheduleDay[]) {
  return days.map(({ date: day, schedules }) => {
    const data = {} as WorkScheduleRow
    const scheduleClone = [...schedules]

    if (scheduleClone?.length === 0) scheduleClone.push({ ...workScheduleContentDefaultValues, id: uuid() })
    scheduleClone.forEach((schedule, index) => {
      const { id, startTime, endTime, address, content, participant, implementer, requirement } = schedule
      if (index === 0) {
        Object.assign(data, {
          day,
          id,
          time_place: { startTime, endTime, address, content },
          partakers: { participant, implementer },
          requirements: { requirement },
          children: []
        })
        return
      }

      data.children.push({
        day,
        id,
        time_place: { startTime, endTime, address, content },
        partakers: { participant, implementer },
        requirements: { requirement },
        children: []
      })
      return
    })

    return data
  })
}
