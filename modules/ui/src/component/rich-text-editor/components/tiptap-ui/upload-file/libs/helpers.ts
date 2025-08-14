export const allowedImageExtensions = ['jpg', 'png']
export const allowedFileExtensions = ['doc', 'docx', 'xls', 'xlsx', 'pdf']

export const getFileExtension = (filename: string): string => {
  return filename.split('.').pop()?.toLowerCase() || ''
}

export const isImage = (filename: string): boolean => {
  const ext = getFileExtension(filename)
  return allowedImageExtensions.includes(ext)
}

export const isAllowedFile = (filename: string): boolean => {
  const ext = getFileExtension(filename)
  return allowedImageExtensions.includes(ext) || allowedFileExtensions.includes(ext)
}
