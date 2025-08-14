export function manualChunks(id: string) {
  if (id.indexOf('node_modules') === -1) return

  const packageNameWithPnpmPrefix = id.toString().split('node_modules/')[1]
  const splitPackageNameWithPnpmPrefixBySlash = packageNameWithPnpmPrefix.split('/')

  // doesn't start with .pnpm/
  if (splitPackageNameWithPnpmPrefixBySlash[0] !== '.pnpm') return splitPackageNameWithPnpmPrefixBySlash[0].toString()

  const packageName = splitPackageNameWithPnpmPrefixBySlash[1]
  const result = packageName.split('@')[packageName[0] === '@' ? 1 : 0].toString()
  return result
}
