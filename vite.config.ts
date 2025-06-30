import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/revit-doc/',  // ← CON LA BARRA AL FINAL
})
