const nx = require('@nx/eslint-plugin')

module.exports = [
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],
  { ignores: ['**/out', '**/dist', '**/modules/api/*/*.ts', '**/vite.config.*.timestamp*', '**/vitest.config.*.timestamp*'] },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    ignores: ['**/preview.tsx', '**/*.config.ts', '**/config/*.ts'],
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allowCircularSelfDependency: true,
          allow: ['^.*/eslint(\\.base)?\\.config\\.[cm]?js$'],
          depConstraints: [{ sourceTag: '*', onlyDependOnLibsWithTags: ['*'] }]
        }
      ]
    }
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx', '**/*.cjs', '**/*.mjs'],
    // Override or add rules here
    rules: {}
  }
]
