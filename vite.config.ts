import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { promises as fs } from 'fs'
import getRates from './src/queries/getRates'

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        {
            name: 'get-rates',
            async buildStart() {
                const rates = await getRates()
                await fs.mkdir('src/rates', { recursive: true })
                await fs.writeFile('src/rates/rates.json', JSON.stringify(rates, null, 4))
            }
        }
    ],
})
