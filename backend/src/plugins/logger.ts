import { FastifyServerOptions } from 'fastify';
import { env } from '../config/env';

/**
 * Configuração de logging estruturado (Pino/Fastify)
 * Sanitiza cabeçalhos sensíveis para evitar vazamento em logs.
 */
export const loggerConfig: FastifyServerOptions['logger'] = {
  level: env.LOG_LEVEL,
  redact: {
    paths: [
      'req.headers.authorization',
      'req.headers.cookie',
      'req.body.password',
      'req.body.token',
      'req.body.secret',
      'DATABASE_URL',
    ],
    censor: '[REDACTED]',
  },
  serializers: {
    req(req) {
      return {
        id: req.id,
        method: req.method,
        url: req.url,
        hostname: req.hostname,
        remoteAddress: req.ip,
      };
    },
    res(res) {
      return {
        statusCode: res.statusCode,
      };
    },
  },
};
