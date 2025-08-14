import { z } from 'zod'

export type StudentLifeIntroductionType = z.infer<typeof StudentLifeIntroductionSchema>
export const StudentLifeIntroductionSchema = z.object({
  id: z.string(),
  image: z.string(),
  title: z.string(),
  description: z.string(),
  cta_content: z.string(),
  content_type: z.string(),
  link: z.string(),
  order: z.number(),
  video: z.string(),
  post_link: z.string(),
  post_id: z.string()
})

export type StudentLifeClubType = z.infer<typeof StudentLifeClubSchema>
export const StudentLifeClubSchema = z.object({
  id: z.string(),
  image: z.string(),
  title: z.string(),
  description: z.string(),
  post_id: z.string(),
  link: z.string(),
  content_type: z.string(),
  order: z.number(),
  display: z.boolean(),
  created_at: z.string(),
  post_link: z.string(),
  cta_content: z.string()
})

export type StudentLifeRewardType = z.infer<typeof StudentLifeRewardSchema>
export const StudentLifeRewardSchema = z.object({
  id: z.string(),
  image: z.string(),
  title: z.string(),
  description: z.string(),
  cta_content: z.string(),
  content_type: z.string(),
  link: z.string(),
  order: z.number(),
  video: z.string(),
  post_id: z.string(),
  post_link: z.string()
})

// For Both Activity and Activity Student
export type StudentLifeActivityType = z.infer<typeof StudentLifeActivitySchema>
export const StudentLifeActivitySchema = z.object({
  category_label: z.string(),
  category_value: z.string()
})

export type StudentLifeJobType = z.infer<typeof StudentLifeJobSchema>
export const StudentLifeJobSchema = z.object({
  id: z.string(),
  image: z.string(),
  title: z.string(),
  description: z.string(),
  cta_content: z.string(),
  content_type: z.string(),
  link: z.string(),
  order: z.number(),
  video: z.string(),
  post_link: z.string()
})
