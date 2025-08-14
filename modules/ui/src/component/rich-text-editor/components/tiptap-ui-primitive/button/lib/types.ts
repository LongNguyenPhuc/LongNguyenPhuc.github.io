export interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  showTooltip?: boolean
  tooltip?: React.ReactNode
  shortcutKeys?: string
  textTrim?: boolean
}

export type PlatformShortcuts = Record<string, string>

export const MAC_SYMBOLS: PlatformShortcuts = {
  ctrl: '⌘',
  alt: '⌥',
  shift: '⇧'
} as const
