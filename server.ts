import express from 'express';
import http from 'http';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { buildApp } from './backend/src/app';
import { env } from './backend/src/config/env';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const server = express();
  server.use(express.json());

  // Constrói a instância do Fastify (Core do Backend)
  const fastifyApp = buildApp();
  await fastifyApp.ready();

  console.log('⚡ [STRUCTUM] Engine Fastify inicializada com sucesso.');

  // Delega todas as requisições de /api/* diretamente para o Fastify
  // Utiliza fastify.inject para executar todo o pipeline do Fastify (Zod, Hooks, Handlers)
  server.all('/api*', async (req, res) => {
    try {
      const fastifyResponse = await fastifyApp.inject({
        method: req.method as any,
        url: req.originalUrl,
        headers: req.headers as any,
        payload: req.body ? JSON.stringify(req.body) : undefined,
      });

      res.status(fastifyResponse.statusCode);
      for (const [headerKey, headerVal] of Object.entries(fastifyResponse.headers)) {
        if (headerVal !== undefined) {
          res.setHeader(headerKey, headerVal as any);
        }
      }
      res.send(fastifyResponse.body);
    } catch (err: any) {
      console.error('❌ [STRUCTUM Gateway] Erro ao despachar requisição para Fastify:', err);
      res.status(500).json({
        statusCode: 500,
        error: 'Internal Gateway Error',
        message: 'Falha ao processar requisição no backend Fastify',
      });
    }
  });

  const httpServer = http.createServer(server);

  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    // Modo de Desenvolvimento: monta Vite middleware com HMR desabilitado (conforme constraints do ambiente)
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: false,
        watch: null,
      },
      appType: 'spa',
    });
    server.use(vite.middlewares);
  } else {
    // Modo de Produção: serve arquivos estáticos gerados no build
    server.use(express.static(path.resolve(__dirname, 'dist')));
    server.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  const port = Number(process.env.PORT) || 3000;
  const host = '0.0.0.0';

  httpServer.listen(port, host, () => {
    console.log(`\n======================================================`);
    console.log(`  STRUCTUM — Plataforma Empresarial Desktop [v3.4.2]`);
    console.log(`  Desenvolvido por: Alex Fabiano Longo`);
    console.log(`  Ambiente: ${env.NODE_ENV}`);
    console.log(`  Servidor ouvindo em: http://${host}:${port}`);
    console.log(`  API Health Endpoint: http://${host}:${port}/api/health`);
    console.log(`======================================================\n`);
  });
}

startServer().catch(err => {
  console.error('❌ Falha fatal ao iniciar STRUCTUM:', err);
  process.exit(1);
});
