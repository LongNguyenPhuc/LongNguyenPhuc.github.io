import { Mark } from './type'

// Types that don't have active states
export const NON_ACTIVE_TYPES = ['cut', 'copy', 'paste', 'paintFormat']

// Custom event to notify when format state changes
export const FORMAT_COPIED_EVENT = 'formatCopiedStateChanged'

// Name mappings for UI display
export const MARK_NAMES: Record<Mark, string> = {
  cut: 'mark.cut',
  copy: 'mark.copy',
  paste: 'mark.paste',
  paintFormat: 'mark.paintFormat'
}
