import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  base: mode === 'production' ? '/living-chronicle/' : '/',
  server: {
    watch: {
      ignored: ['**/Arquivos do nexus/**', '**/public/assets/**', '**/*.mp4', '**/*.mp3']
    }
  }
}));

