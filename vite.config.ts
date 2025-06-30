import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const isGitHubPages = process.env.GITHUB_PAGES === 'true' || process.env.NODE_ENV === 'production';

export default defineConfig({
  plugins: [react()],
  base: isGitHubPages ? '/revit-doc/' : '/',
});
