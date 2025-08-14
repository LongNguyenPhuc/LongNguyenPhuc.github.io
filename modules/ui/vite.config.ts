import { defineConfig } from 'vite'
import { resolve, join, extname, relative } from 'path'
import { glob } from 'glob'
// import { readFile, writeFile } from 'fs/promises'
import { fileURLToPath } from 'url'
// import { execSync as exec } from 'child_process'
// ================= PLUGINS =================
import react from '@vitejs/plugin-react-swc'
import dts from 'vite-plugin-dts'
import packageJson from './package.json'
// CSS PLUGINS
import tailwindcss from '@tailwindcss/vite'
import autoprefixer from 'autoprefixer'
import { Language } from '../../libs/utils/i18n'
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin'
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin'
import { readdirSync } from 'fs'
// import postcss from 'postcss'
// import atImport from 'postcss-import'

const workspaceRoot = resolve(__dirname, '../../')
// const buildPath = resolve(workspaceRoot, 'out/modules/ui')
export default defineConfig(({ command }) => ({
  root: __dirname,
  base: '/storybook',
  server: { port: 6006 },
  cacheDir: resolve(workspaceRoot, 'node_modules/.vite/modules/ui'),
  plugins: [
    react(),
    nxViteTsPaths(),
    nxCopyAssetsPlugin(['*.md']),
    tailwindcss(),
    dts({
      entryRoot: 'src',
      tsconfigPath: join(__dirname, 'typescript', 'tsconfig.lib.json'),
      logLevel: 'error'
    })
    // {
    //   name: 'tailwindcss-build',
    //   async writeBundle() {
    //     if (command === 'serve') return
    //     const cssFilePath = resolve(workspaceRoot, 'libs/styles/css/index.css')
    //     const cssToPath = resolve(__dirname, 'dist/index.css')
    //     const plugins = [
    //       atImport(),
    //       tailwindcss({ config: resolve(__dirname, './tailwind.config.ts') }),
    //       autoprefixer()
    //     ]
    //     const { css } = await postcss(plugins).process(await readFile(cssFilePath), {
    //       from: cssFilePath,
    //       to: cssToPath
    //     })
    //     await writeFile(cssToPath, css)
    //     return
    //   }
    // }
  ],
  css: {
    postcss: {
      // from: resolve(__dirname, '../styles/css/index.css'),
      plugins: [autoprefixer()]
    }
  },
  // See: https://vitejs.dev/guide/build.html#library-mode
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    reportCompressedSize: true,
    minify: false,
    lib: {
      // Could also be a dictionary or array of multiple entry points.
      entry: Object.fromEntries(
        glob.sync(['src/index.ts', 'src/*/*/index.{ts,tsx}', 'src/*/index.ts']).map((file) => [
          // The name of the entry point
          // lib/nested/foo.ts becomes nested/foo
          relative('src', file.slice(0, file?.length - extname(file)?.length)),
          // The absolute path to the entry file
          // lib/nested/foo.ts becomes /project/lib/nested/foo.ts
          fileURLToPath(new URL(file, import.meta.url))
        ])
      ),
      fileName: 'index',
      // Change this to the formats you want to support.
      // Don't forget to update your package.json as well.
      formats: ['es']
    },
    rollupOptions: {
      // External packages that should not be bundled into your library.
      external: [
        ...Object.keys(packageJson.peerDependencies),
        'react/jsx-runtime',
        'zustand/middleware',
        'zustand/react/shallow'
      ],
      output: {
        entryFileNames: '[name].js',
        assetFileNames: 'assets/[name][ext]',
        chunkFileNames: (chunk) => {
          if (!Object.values(Language).some((lng) => chunk.name === lng)) return 'assets/[name].js'
          const path = chunk.facadeModuleId?.replace(join(__dirname, 'src/'), '')?.split('/')
          path?.pop()
          return `${path?.join('/') ?? 'assets'}/[name].js`
        },
        manualChunks: (id) => {
          if (id.indexOf('node_modules') === -1) return

          const packageNameWithPnpmPrefix = id.toString().split('node_modules/')[1]
          const splitPackageNameWithPnpmPrefixBySlash = packageNameWithPnpmPrefix.split('/')

          // doesn't start with .pnpm/
          if (splitPackageNameWithPnpmPrefixBySlash[0] !== '.pnpm')
            return splitPackageNameWithPnpmPrefixBySlash[0].toString()

          const packageName = splitPackageNameWithPnpmPrefixBySlash[1]
          const result = packageName.split('@')[packageName[0] === '@' ? 1 : 0].toString()
          return result
        }
      }
    }
  },
  resolve: {
    alias: {
      '@lib-ui': resolve(__dirname, './src'),
      '@api': resolve(__dirname, '../api'),
      ...readdirSync(join(workspaceRoot, 'libs')).reduce<Record<string, string>>((acc, val) => {
        if (val === '@types') return acc
        acc[`@${val}`] = join(workspaceRoot, 'libs', val)
        return acc
      }, {})
    }
  }
}))
