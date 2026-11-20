import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Minimal declaration so we can read PORT without pulling in @types/node.
declare const process: { env: Record<string, string | undefined> }

// Honor a PORT assigned by the harness/preview tool; fall back to 5174 locally.
export default defineConfig({
  base: '/a-modo-mio/',
  plugins: [react()],
  // react-helmet-async va incluso nel bundle SSR (interop ESM/CJS in Node).
  ssr: { noExternal: ['react-helmet-async'] },
  server: {
    port: Number(process.env.PORT) || 5180,
    strictPort: false,
  },
})
