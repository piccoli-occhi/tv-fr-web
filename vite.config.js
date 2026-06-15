import vuePlugin from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import symfonyPlugin from 'vite-plugin-symfony'

export default defineConfig({
    plugins: [
        vuePlugin(),
        symfonyPlugin({
            stimulus: true,
        }),
    ],
    build: {
        rollupOptions: {
            input: {
                app: './assets/app.ts',
            },
        },
    },
})
