import { z } from 'zod'

export type InfoCateType = z.infer<typeof InfoCateSchema>
export const InfoCateSchema = z.object({
  id: z.string(),
  contentType: z.string(),
  image: z.string(),
  title: z.string(),
  description: z.string(),
  link: z.string(),
  order: z.number(),
  common: z.boolean(),
  display: z.boolean(),
  categories: z.array(z.object({ label: z.string(), value: z.string() })),
  created_at: z.string()
})

export type CommonNewsType = z.infer<typeof CommonNewsSchema>
export const CommonNewsSchema = z.object({
  id: z.string(),
  contentType: z.string(),
  image: z.string(),
  title: z.string(),
  description: z.string(),
  link: z.string(),
  order: z.string(),
  common: z.boolean(),
  display: z.boolean(),
  categories: z.array(z.object({ label: z.string(), value: z.string() })),
  created_at: z.string()
})

export type NewInfoType = z.infer<typeof NewInfoSchema>
export const NewInfoSchema = z.object({
  id: z.string(),
  title: z.string(),
  seo_text: z.string(),
  image: z.string(),
  display: z.boolean(),
  hot_news: z.boolean(),
  categories: z.array(z.object({ label: z.string(), value: z.string() })),
  order: z.number(),
  content: z.string(),
  created_at: z.string(),
  views: z.number(),
  description: z.string(),
  video: z.string(),
  post_link: z.string(),
  cta_content: z.string(),
  link: z.string(),
  content_type: z.string()
})
