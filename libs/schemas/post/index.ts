import { workScheduleDayDefaultValues, WorkScheduleDaySchema } from './_work-schedule'
import { z } from 'zod'
import { attachmentSchema, categorySchema, imageFileSchema, MutatePostSchema } from './base-schemas'
import { ERROR_MESSAGES, PASSWORD_REGEX } from './constants'

// Work Schedule Schemas
export * from './_work-schedule'
export type MutateNotiWorkSchedule = z.infer<typeof MutateNotiWorkScheduleSchema>
export const MutateNotiWorkScheduleSchema = MutatePostSchema.extend({
  startDate: z.date({
    required_error: 'Vui lòng chọn ngày bắt đầu'
  }),
  days: z.array(WorkScheduleDaySchema)
})
export const mutateNotiWorkScheduleDefaultValues = {
  title: '',
  display: true,
  send_app_lecturer: false,
  days: workScheduleDayDefaultValues
} as MutateNotiWorkSchedule

// Posts schema
export const MutatePostsSchema = MutatePostSchema.extend({
  image: z.union([
    imageFileSchema,
    z.string({ required_error: ERROR_MESSAGES.requiredImage }).min(1, ERROR_MESSAGES.requiredImage)
  ]),
  seoText: z.string().optional(),
  subTitle: z
    .string({ required_error: ERROR_MESSAGES.requiredSubTitle })
    .trim()
    .min(1, ERROR_MESSAGES.requiredSubTitle),
  content: z.string({ required_error: ERROR_MESSAGES.requiredContent }).trim().min(1, ERROR_MESSAGES.requiredContent),
  categories: categorySchema.min(1, ERROR_MESSAGES.requiredCategory),
  attachments: attachmentSchema
})

export type MutatePosts = z.infer<typeof MutatePostsSchema>

export const mutatePostsDefaultValues: MutatePosts = {
  image: '',
  title: '',
  subTitle: '',
  seoText: '',
  categories: [],
  content: '',
  attachments: [],
  display: false
} as MutatePosts

// Noti-Student schema
export const MutateNotiStudentSchema = MutatePostSchema.extend({
  seoText: z.string().optional(),
  content: z.string({ required_error: ERROR_MESSAGES.requiredContent }).trim().min(1, ERROR_MESSAGES.requiredContent),
  categories: categorySchema.min(1, ERROR_MESSAGES.requiredCategory),
  attachments: attachmentSchema
})

export type MutateNotiStudent = z.infer<typeof MutateNotiStudentSchema>

export const mutateNotiStudentDefaultValues: MutateNotiStudent = {
  title: '',
  seoText: '',
  categories: [],
  content: '',
  attachments: [],
  display: false,
  send_app_lecturer: false,
  send_app_student: false
} as MutateNotiStudent

// Noti-Schedule schema
export const MutateNotiScheduleSchema = MutatePostSchema.extend({
  seoText: z.string().optional(),
  content: z.string({ required_error: ERROR_MESSAGES.requiredContent }).trim().min(1, ERROR_MESSAGES.requiredContent),
  categories: categorySchema.min(1, ERROR_MESSAGES.requiredCategory),
  attachments: attachmentSchema
})

export type MutateNotiSchedule = z.infer<typeof MutateNotiScheduleSchema>

export const mutateNotiScheduleDefaultValues: MutateNotiSchedule = {
  title: '',
  seoText: '',
  categories: [],
  content: '',
  attachments: [],
  display: false,
  send_app_lecturer: false,
  send_app_Student: false
} as MutateNotiSchedule

// Noti-Internal schema
export const MutateNotiInternalSchema = MutatePostSchema.extend({
  seoText: z.string().optional(),
  content: z.string({ required_error: ERROR_MESSAGES.requiredContent }).trim().min(1, ERROR_MESSAGES.requiredContent),
  categories: categorySchema.min(1, ERROR_MESSAGES.requiredCategory),
  attachments: attachmentSchema
})

export type MutateNotiInternal = z.infer<typeof MutateNotiInternalSchema>

export const mutateNotiInternalDefaultValues: MutateNotiInternal = {
  title: '',
  seoText: '',
  categories: [],
  content: '',
  attachments: [],
  display: false,
  send_app_lecturer: false,
  send_app_Student: false
} as MutateNotiInternal

// User schema
// Base User schema
const BaseUserSchema = z.object({
  email: z.string().trim().min(1, ERROR_MESSAGES.requiredEmail).email(ERROR_MESSAGES.invalidEmail),
  first_name: z.string().trim().min(1, ERROR_MESSAGES.requiredFirstName),
  last_name: z.string().trim().min(1, ERROR_MESSAGES.requiredLastName),
  permisionCodes: z.array(
    z.object({
      id: z.string(),
      permision: z.object({ id: z.string(), code: z.string(), name: z.string() }),
      permision_id: z.string()
    })
  ),
  userName: z.string().trim().optional()
})

// New User schema (with required password)
export const NewUserSchema = BaseUserSchema.extend({
  password: z
    .string()
    .trim()
    .min(1, ERROR_MESSAGES.requiredPassword)
    .regex(PASSWORD_REGEX, ERROR_MESSAGES.invalidPassword),
  re_password: z.string().trim().min(1, ERROR_MESSAGES.confirmPassword)
}).refine((data) => data.password === data.re_password, {
  message: ERROR_MESSAGES.confirmPasswordNotMatch,
  path: ['re_password']
})

// Existing User schema (with optional password)
export const ExistingUserSchema = BaseUserSchema.extend({
  password: z.string().trim().optional(),
  re_password: z.string().trim().optional()
})

// Dynamic schema that can be used based on isNew flag
export const MutateUserSchema = z.union([NewUserSchema, ExistingUserSchema])

export type MutateUser = z.infer<typeof NewUserSchema>

export const mutateUserDefaultValues: MutateUser = {
  email: '',
  password: '',
  re_password: '',
  first_name: '',
  last_name: '',
  permisionCodes: [],
  userName: ''
} as MutateUser

// News schema
export const MutateNewsSchema = MutatePostSchema.extend({
  image: z.union([
    imageFileSchema,
    z.string({ required_error: ERROR_MESSAGES.requiredImage }).min(1, ERROR_MESSAGES.requiredImage)
  ]),
  seoText: z.string().optional(),
  categories: categorySchema.min(1, ERROR_MESSAGES.requiredCategory),
  content: z.string({ required_error: ERROR_MESSAGES.requiredContent }).trim().min(1, ERROR_MESSAGES.requiredContent),
  attachments: attachmentSchema,
  featured: z.boolean().optional()
})

export type MutateNews = z.infer<typeof MutateNewsSchema>

export const mutateNewsDefaultValues: MutateNews = {
  image: '',
  title: '',
  seoText: '',
  categories: [],
  content: '',
  attachments: [],
  description: '',
  featured: false,
  display: false,
  send_app_lecturer: false,
  send_app_student: false
} as MutateNews

export enum PostTypeEnums {
  POST = 'POST',
  CALENDAR_ANNOUNCEMENT = 'CALENDAR_ANNOUNCEMENT',
  NEWS = 'NEWS',
  PRIVATE_ANNOUNCEMENT = 'PRIVATE_ANNOUNCEMENT',
  SCHEDULE_ANNOUNCEMENT = 'SCHEDULE_ANNOUNCEMENT',
  STUDENT_ANNOUNCEMENT = 'STUDENT_ANNOUNCEMENT'
}
