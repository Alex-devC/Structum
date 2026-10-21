import { FastifyInstance, FastifyPluginOptions, FastifyReply, FastifyRequest } from 'fastify';
import { env } from '../config/env';
import { checkDatabaseHealth } from '../db/prisma';

export interface HealthResponse {
  status: 'ok' | 'degraded';
  service: string;
  version: string;
  timestamp: string;
  uptimeSeconds: number;
  environment: 'development' | 'production' | 'test';
  database: {
    driver: string;
    configured: boolean;
    connected: boolean;
    status: 'conectado' | 'nao_configurado' | 'indisponivel';
    message: string;
  };
}

export async function healthRoutes(fastify: FastifyInstance, _options: FastifyPluginOptions) {
  fastify.get('/health', async (_request: FastifyRequest, reply: FastifyReply) => {
    const dbHealth = await checkDatabaseHealth();

    const response: HealthResponse = {
      status: 'ok',
      service: 'STRUCTUM-Backend-Core',
      version: '3.4.2',
      timestamp: new Date().toISOString(),
      uptimeSeconds: Math.floor(process.uptime()),
      environment: env.NODE_ENV,
      database: {
        driver: dbHealth.driver,
        configured: dbHealth.configured,
        connected: dbHealth.connected,
        status: dbHealth.status,
        message: dbHealth.message,
      },
    };

    return reply.status(200).send(response);
  });
}
