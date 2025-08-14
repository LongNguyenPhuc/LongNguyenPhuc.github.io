import { z } from 'zod'

export type SearchKeysType = z.infer<typeof SearchKeysSchema>
export const SearchKeysSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  order: z.number(),
  display: z.boolean(),
  access_times: z.number(),
  content_type: z.string(),
  link: z.string()
})

export type CertificateType = z.infer<typeof CertificateSchema>
export const CertificateSchema = z.object({
  id: z.string(),
  image: z.string(),
  title: z.string(),
  description: z.string(),
  link: z.string(),
  order: z.number(),
  display: z.boolean()
})

export type StudyRouteType = z.infer<typeof StudyRouteSchema>
export const StudyRouteSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  subtitle: z.string(),
  post_id: z.string(),
  link: z.string(),
  content_type: z.string(),
  order: z.number(),
  display: z.boolean(),
  post_link: z.string(),
  cta_content: z.string()
})

export type CoreReasonType = z.infer<typeof CoreReasonSchema>
export const CoreReasonSchema = z.object({
  image: z.string(),
  post_link: z.string(),
  title: z.string(),
  content: z.string(),
  student_qty: z.string(),
  major_qty: z.number(),
  post_qty: z.string()
})

export type FeedbackType = z.infer<typeof FeedbackSchema>
export const FeedbackSchema = z.object({
  id: z.string(),
  image: z.string(),
  title: z.string(),
  role: z.string(),
  description: z.string(),
  order: z.number(),
  display: z.boolean(),
  created_at: z.string()
})

export type QuickLinkType = z.infer<typeof QuickLinkSchema>
export const QuickLinkSchema = z.object({
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
  post_link: z.string()
})

export type PartnerType = z.infer<typeof PartnerSchema>
export const PartnerSchema = z.object({
  id: z.string(),
  image: z.string(),
  title: z.string(),
  link: z.string(),
  order: z.number(),
  display: z.boolean()
})

export type RegInfoType = z.infer<typeof RegInfoSchema>
export const RegInfoSchema = z.object({
  id: z.string(),
  image: z.string(),
  title: z.string(),
  link: z.string(),
  order: z.number(),
  display: z.boolean()
})
