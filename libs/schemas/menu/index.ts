import { z } from 'zod'

// Define the form schema type
export const menuFormSchema = z.object({
  name: z.string().trim().min(1, 'Vui lòng nhập tên header'),
  type: z.enum(['HEADER', 'MENU']),
  content_type: z.enum(['POST', 'LIST_POST', 'PAGE', 'LINK']),
  link: z.string(),
  sequence: z.coerce.number().min(1, 'Vui lòng nhập số thứ tự'),
  display: z.boolean(),
  parent_id: z.string().nullable(),
  rank: z.enum(['ROOT', 'CHILD']),
  postId: z.string()
})

export type Menu = z.infer<typeof menuFormSchema> & { id: string }

export const menuDefaultValues: Omit<Menu, 'id'> = {
  name: '',
  type: 'HEADER',
  content_type: 'LINK',
  link: '',
  sequence: 1,
  display: true,
  parent_id: null,
  rank: 'ROOT',
  postId: ''
}

export enum MenuTypeEnums {
  HEADER = 'HEADER',
  MENU = 'MENU'
}
