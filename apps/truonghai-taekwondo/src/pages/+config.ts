import type { Config } from 'vike/types'
import vikeReact from 'vike-react/config'

// https://vike.dev/config
const config: Config = {
  prerender: true,
  extends: [vikeReact]
}

export default config
