import { z } from 'zod'

export const ACCEPTED_IMAGE_FORMATS = ['jpg', 'png']
export const ACCEPTED_VIDEO_FORMATS = ['mp4']
export const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB

export const VideoFileSchema = z
  .instanceof(File, { message: 'Vui lòng upload video.' })
  .refine(
    (file) => {
      const extension = file.name.split('.').pop()?.toLowerCase() || ''
      return ACCEPTED_VIDEO_FORMATS.includes(extension)
    },
    { message: 'Vui lòng chọn đúng định dạng .mp4' }
  )
  .refine((file) => !file || file.size !== 0 || file.size <= MAX_FILE_SIZE, {
    message: 'Kích thước video không được vượt quá 5MB.'
  })

export const imageFileSchema = z
  .instanceof(File, { message: 'Vui lòng upload hình ảnh.' })
  .refine(
    (file) => {
      const extension = file.name.split('.').pop()?.toLowerCase() || ''
      return ACCEPTED_IMAGE_FORMATS.includes(extension)
    },
    { message: 'Vui lòng chọn đúng định dạng .jpg hoặc .png' }
  )
  .refine((file) => !file || file.size !== 0 || file.size <= MAX_FILE_SIZE, {
    message: 'Kích thước hình ảnh không được vượt quá 5MB.'
  })

export const BannerSchema = z
  .object({
    id: z.string().uuid(),
    image: z.union([imageFileSchema, z.string()]).optional(),
    video: z.union([VideoFileSchema, z.string()]).optional(),
    title: z.string(),
    display: z.boolean().optional(),
    description: z.string(),
    cta_content: z.string(),
    link: z.union([z.literal(''), z.string().url('Link không hợp lệ, vui lòng nhập đúng định dạng URL!')]).optional(),
    post_id: z.string().optional(),
    content_type: z.enum(['POST', 'PAGE_CONFIG', 'LINK']),
    post_link: z.string(),
    created_by: z.string(),
    order: z.number()
  })
  .refine(
    (data) => {
      // Check if either image or video has a value
      return (!!data.image && data.image !== '') || (!!data.video && data.video !== '')
    },
    {
      path: ['image'],
      message: 'Vui lòng upload hình ảnh hoặc video!'
    }
  )
  .refine(
    (data) => {
      // Duplicate check to ensure error shows on video field too
      return (!!data.image && data.image !== '') || (!!data.video && data.video !== '')
    },
    {
      path: ['video'],
      message: 'Vui lòng upload hình ảnh hoặc video!'
    }
  )

export type Banner = z.infer<typeof BannerSchema>

export const defaultBannerValues = {
  id: '',
  image: '',
  video: '',
  title: '',
  display: true,
  description: '',
  cta_content: '',
  content_type: 'LINK',
  post_link: '',
  created_by: '',
  order: 0,
  link: ''
} as Banner
