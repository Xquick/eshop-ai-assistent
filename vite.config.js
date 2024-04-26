import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
    ],
    define: {
        'process.env': {}  // You can add more specific environment variables if needed
    },
    build: {
        lib: {
            entry: path.resolve(__dirname, 'src/main.ts'),  // Adjust this if your entry file is different
            name: 'BlueAssistant',  // This is the global variable name.
            formats: ['iife']  // Builds a self-executing function, suitable for inclusion as a <script> tag.
        },
        rollupOptions: {
            // Make sure to externalize deps that shouldn't be bundled
            // into your library
            output: {
                    globals: {
                      vue: 'Vue'
                    }
                  }
        }
    },
    resolve: {
        alias: {
            '@': '/src',
        },
    },
})