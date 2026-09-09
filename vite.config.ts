import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './',
  server: {
    watch: {
      ignored: ['**/Arquivos do nexus/**', '**/public/assets/**', '**/*.mp4', '**/*.mp3']
    }
  }
});
