import { join, resolve } from 'path'

const workspaceRoot = resolve(__dirname, '../../')
export function baseAlias() {
  return {
    '@lib-ui': join(workspaceRoot, 'modules', 'ui', 'src')
  }
}
