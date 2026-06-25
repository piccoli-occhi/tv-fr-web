import fs from 'node:fs'
import { fileURLToPath, URL } from 'node:url'
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
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./assets', import.meta.url)),
        },
    },
    server: {
        https: {
            key: fs.readFileSync('certs/vite.key.pem'),
            cert: fs.readFileSync('certs/vite.crt.pem'),
        },
        cors: true,
    },
    build: {
        rollupOptions: {
            input: {
                app: './assets/app.ts',
            },
        },
    },
})
