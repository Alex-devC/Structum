import Fastify, { FastifyInstance, FastifyServerOptions } from 'fastify';
import cors from '@fastify/cors';
import { env } from './config/env';
import { loggerConfig } from './plugins/logger';
import { setupErrorHandler } from './plugins/errorHandler';
import { healthRoutes } from './routes/health';

/**
 * Constrói e inicializa a instância do Fastify com todos os plugins,
 * middlewares de segurança, tratador centralizado de erros e rotas.
 */
export function buildApp(opts: FastifyServerOptions = {}): FastifyInstance {
  const app = Fastify({
    logger: loggerConfig,
    ...opts,
  });

  // Tratamento centralizado de erros
  app.setErrorHandler(setupErrorHandler);

  // Rota 404 padronizada
  app.setNotFoundHandler((request, reply) => {
    reply.status(404).send({
      statusCode: 404,
      error: 'Not Found',
      message: `Rota ${request.method} ${request.url} não encontrada no backend STRUCTUM`,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  });

  // Habilitação de CORS correspondendo à origem real do ambiente de execução
  app.register(cors, {
    origin: (origin, cb) => {
      // Requisições sem cabeçalho Origin (cURL, health checks internos, SSR)
      if (!origin) {
        return cb(null, true);
      }

      // Se CORS_ORIGIN for '*' ou não definido, reflete a origem real da requisição
      if (!env.CORS_ORIGIN || env.CORS_ORIGIN === '*') {
        return cb(null, true);
      }

      const allowedOrigins = env.CORS_ORIGIN.split(',').map(s => s.trim()).filter(Boolean);

      // Adiciona dinamicamente APP_URL caso injetada pela infraestrutura (ex: Cloud Run)
      if (process.env.APP_URL) {
        allowedOrigins.push(process.env.APP_URL.trim());
      }

      const isAllowed = allowedOrigins.some(allowed => {
        if (allowed === '*') return true;
        try {
          return new URL(origin).origin === new URL(allowed).origin;
        } catch {
          return origin === allowed;
        }
      });

      if (isAllowed) {
        return cb(null, true);
      }

      return cb(new Error(`Origem CORS '${origin}' não autorizada pelas políticas do STRUCTUM`), false);
    },
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
    credentials: true,
  });

  // Registro das rotas da API com prefixo /api
  app.register(healthRoutes, { prefix: '/api' });

  return app;
}
