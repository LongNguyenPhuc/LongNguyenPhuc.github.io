/// <reference types='vitest' />
import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin'
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin'
import { join, resolve } from 'path'

//
import { manualChunks } from '../../libs/build/vite'
import { baseAlias } from '../../libs/build/(common)'

// CSS
import autoprefixer from 'autoprefixer'
import tailwindcss from '@tailwindcss/vite'

const baseDir = resolve(__dirname, '../../')
export default defineConfig(() => ({
  root: __dirname,
  cacheDir: join(baseDir, 'node_modules/.vite/apps/truonghai-taekwondo'),
  server: { port: 4200, host: 'localhost' },
  preview: { port: 4300, host: 'localhost' },
  plugins: [react(), nxViteTsPaths(), nxCopyAssetsPlugin(['*.md']), tailwindcss()],
  css: { postcss: { plugins: [autoprefixer()] } },
  define: { 'import.meta.env.built_at': new Date() },
  build: {
    outDir: join(baseDir, 'dist/apps/truonghai-taekwondo'),
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: { transformMixedEsModules: true },
    rollupOptions: { output: { manualChunks } }
  },
  resolve: { alias: { ...baseAlias() } }
}))
