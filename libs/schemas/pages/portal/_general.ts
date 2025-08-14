import { z } from 'zod'

export type GeneralPartnerType = z.infer<typeof GeneralPartnerSchema>
export const GeneralPartnerSchema = z.object({
  id: z.string(),
  title: z.string(),
  link: z.string(),
  image: z.string(),
  faculty_id: z.string(),
  faculty_label: z.string(),
  class: z.string(),
  name: z.string(),
  description: z.string(),
  company: z.string(),
  position: z.string(),
  display: z.boolean(),
  created_at: z.string(),
  stt: z.number(),
  type: z.enum(['domestic', 'foreign']).optional()
})
