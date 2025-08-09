import { defineConfig } from 'vite'
import createSvgSpritePlugin from 'vite-plugin-svg-sprite';

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0',
    open: true
  },
  plugins: [
    createSvgSpritePlugin({
      exportType: 'vanilla',
      include: '**/icons/*.svg'
    }),
  ],
})
