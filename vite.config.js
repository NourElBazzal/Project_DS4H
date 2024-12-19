import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(() => {
    return {
        esbuild: {
          loader: 'jsx'
        },
        optimizeDeps: {
            esbuildOptions: {
                loader: {
                    '.js': 'jsx',
                }
            }
        },
        build: {
            outDir: 'build',
        },
        plugins: [react()],
    };
});