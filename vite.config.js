import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * Serves the functions in api/ during `npm run dev`.
 *
 * Vite alone knows nothing about api/, so POSTing to /api/contact returns 404
 * and the contact form reports a generic failure. In production Vercel runs
 * those files as serverless functions; this plugin gives them the same shape
 * locally, so the form works with a plain `npm run dev` and no Vercel login.
 *
 * The handler is imported per request so edits to api/*.js take effect without
 * restarting the server.
 */
function apiRoutes(env) {
  return {
    name: 'local-api-routes',
    configureServer(server) {
      server.middlewares.use('/api/contact', async (req, res) => {
        // The functions read credentials from process.env, as they do on Vercel.
        Object.assign(process.env, env);

        const chunks = [];
        for await (const chunk of req) chunks.push(chunk);
        const raw = Buffer.concat(chunks).toString('utf8');

        // Minimal stand-in for the Vercel request/response objects.
        req.body = raw;
        const reply = {
          status(code) {
            res.statusCode = code;
            return reply;
          },
          json(payload) {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(payload));
            return reply;
          },
          setHeader(key, value) {
            res.setHeader(key, value);
            return reply;
          },
        };

        try {
          const mod = await server.ssrLoadModule('/api/contact.js');
          await mod.default(req, reply);
        } catch (err) {
          server.config.logger.error(`[api/contact] ${err.stack || err}`);
          if (!res.writableEnded) {
            reply.status(500).json({ error: 'The local API route threw an error.' });
          }
        }
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  // '' as the prefix loads every variable, not just VITE_ ones. These stay on
  // the server: nothing here is exposed to the client bundle.
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react(), apiRoutes(env)],
    build: {
      outDir: 'dist',
    },
  };
});
