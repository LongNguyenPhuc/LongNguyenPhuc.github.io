// Core
import { ControllerRenderProps } from 'react-hook-form'
import { NumericFormatProps } from 'react-number-format'

// App
import { InputProps } from '../../../base/input'

// Types
export type NumberInputProps = NumericFormatProps<InputProps> & {
  isDisplayStepper?: boolean
  onFieldChange?: ControllerRenderProps['onChange']
}
