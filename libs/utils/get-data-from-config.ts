import { PageConfigQueryData } from '@api/types/page-config'

export function getDataFromConfig<T = unknown>(codeToGet: string, queryData: PageConfigQueryData): T | null {
  if (queryData?.status !== 'success') return null

  const banners = queryData.responseData.page_config_tab.find(({ code }) => code === codeToGet)

  return banners?.config ? (JSON.parse(banners.config) as T) : null
}
