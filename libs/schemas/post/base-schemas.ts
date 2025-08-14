import { z } from 'zod'
import { MAX_FILE_SIZE, ACCEPTED_DOCUMENT_FORMATS, ACCEPTED_IMAGE_FORMATS, ERROR_MESSAGES } from './constants'

// Base schema for all posts/notifications
export const MutatePostSchema = z.object({
  title: z.string({ required_error: ERROR_MESSAGES.requiredTitle }).trim().min(1, ERROR_MESSAGES.requiredTitle),
  description: z.string().optional(),
  display: z.boolean().optional(),
  send_app: z.boolean().optional(),
  send_app_lecturer: z.boolean().optional(),
  send_app_student: z.boolean().optional()
})

// Reusable schema components
export const fileSchema = (acceptedFormats: string[], errorMessage: string) =>
  z.instanceof(File).refine(
    (file) => {
      const extension = file.name.split('.').pop()?.toLowerCase() || ''
      return acceptedFormats.includes(extension)
    },
    { message: errorMessage }
  )

export const fileSizeSchema = (maxSize: number) =>
  z
    .instanceof(File)
    .refine((file) => !file || file.size !== 0 || file.size <= maxSize, { message: ERROR_MESSAGES.fileSizeLimit })

export const imageFileSchema = z
  .instanceof(File, { message: ERROR_MESSAGES.requiredImage })
  .refine(
    (file) => {
      const extension = file.name.split('.').pop()?.toLowerCase() || ''
      return ACCEPTED_IMAGE_FORMATS.includes(extension)
    },
    { message: ERROR_MESSAGES.invalidImageFormat }
  )
  .refine((file) => !file || file.size !== 0 || file.size <= MAX_FILE_SIZE, {
    message: ERROR_MESSAGES.fileSizeLimit
  })

export const documentFilesSchema = z
  .array(fileSchema(ACCEPTED_DOCUMENT_FORMATS, ERROR_MESSAGES.invalidDocFormat))
  .refine((files) => files.every((file) => file.size <= MAX_FILE_SIZE), { message: ERROR_MESSAGES.fileSizeLimit })

export const attachmentSchema = z
  .union([
    documentFilesSchema,
    z.array(
      z.object({
        id: z.string().optional(),
        name: z.string().optional(),
        path: z.string().optional(),
        content_type: z.string().optional()
      })
    )
  ])
  .optional()

export const categorySchema = z.array(
  z.object({
    label: z.string({ required_error: 'Trường label là bắt buộc' }),
    value: z.union([z.string(), z.number()], {
      required_error: 'Trường value là bắt buộc'
    }),
    category_id: z.union([z.string(), z.number()], {
      required_error: 'Trường category_id là bắt buộc'
    })
  })
)
