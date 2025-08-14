import { z } from 'zod'

export enum FooterTypeEnums {
  ANNOUNCE = 'ANNOUCE',
  SOCIAL = 'SOSIAL',
  CONNECT = 'CONNECT'
}

export enum FooterAnnounceNameEnums {
  ADDRESS = 'Địa chỉ',
  FAX = 'Fax',
  TRAINING = 'Email ne',
  MOBILE = 'Điện thoại',
  LOGO = 'Logo'
}

export enum FooterConnectNameEnums {
  ADMISSION = 'Tuyển sinh',
  QUICK_CONNECT = 'Liên kết nhanh'
}
export const ConnectItemSchema = z.object({
  child: z.string(),
  url: z.string(),
  sequence: z.string(),
  display: z.boolean(),
  create_date: z.string(),
  stt: z.number(),
  id: z.string(),
  created_by: z.string()
})
export type ConnectItem = z.infer<typeof ConnectItemSchema>
