import { z } from 'zod'

export type TrainingInfoType = z.infer<typeof TrainingInfoSchema>
export const TrainingInfoSchema = z.object({
  id: z.string(),
  type: z.string(),
  title: z.string(),
  order: z.number(),
  link: z.string(),
  description: z.string(),
  display: z.boolean(),
  post: z.null(),
  page: z.object({ id: z.string(), static_link: z.string() }),
  created_at: z.string()
})
