import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { seoPlugin } from './scripts/vite-seo-plugin.js'

/**
 * Serves api/contact.js and api/chat.js during `npm run dev`, so the contact form and the AI chat
 * assistant work locally without `vercel dev`. In production Vercel runs the same files as
 * serverless functions.
 */
function devContactApi(env) {
  return {
    name: 'vks-dev-contact-api',
    apply: 'serve',
    configureServer(server) {
      for (const [key, value] of Object.entries(env)) process.env[key] ??= value

      for (const name of ['contact', 'chat']) {
      server.middlewares.use(`/api/${name}`, async (req, res) => {
        const chunks = []
        for await (const chunk of req) chunks.push(chunk)
        try {
          req.body = JSON.parse(Buffer.concat(chunks).toString() || 'null')
        } catch {
          req.body = null
        }
        res.status = (code) => {
          res.statusCode = code
          return res
        }
        res.json = (payload) => {
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify(payload))
        }
        try {
          const { default: handler } = await server.ssrLoadModule(`/api/${name}.js`)
          await handler(req, res)
        } catch (err) {
          server.config.logger.error(String(err?.stack ?? err))
          if (!res.writableEnded) res.status(500).json({ ok: false, error: 'Server error.' })
        }
      })
      }
    },
  }
}

export default defineConfig(({ mode }) => ({
  plugins: [react(), tailwindcss(), seoPlugin(), devContactApi(loadEnv(mode, process.cwd(), ''))],
  build: {
    target: 'es2020',
    assetsInlineLimit: 2048,
    rolldownOptions: {
      output: {
        // long-lived vendor chunks cache well across content updates
        codeSplitting: {
          groups: [
            { name: 'react', test: /node_modules[\\/](react|react-dom|react-router|react-router-dom|scheduler)[\\/]/ },
            { name: 'motion', test: /node_modules[\\/](motion|motion-dom|motion-utils|framer-motion)[\\/]/ },
            { name: 'gsap', test: /node_modules[\\/](gsap|@gsap)[\\/]/ },
          ],
        },
      },
    },
  },
}))
