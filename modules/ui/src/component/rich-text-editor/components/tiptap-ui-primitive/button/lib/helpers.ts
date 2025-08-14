import { MAC_SYMBOLS } from './types'

export const formatShortcutKey = (key: string, isMac: boolean) => {
  if (isMac) {
    const lowerKey = key.toLowerCase()
    return MAC_SYMBOLS[lowerKey] || key.toUpperCase()
  }
  return key.charAt(0).toUpperCase() + key.slice(1)
}

export const parseShortcutKeys = (shortcutKeys: string | undefined, isMac: boolean) => {
  if (!shortcutKeys) return []

  return shortcutKeys
    .split('-')
    .map((key) => key.trim())
    .map((key) => formatShortcutKey(key, isMac))
}
