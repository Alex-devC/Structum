import { FastifyError, FastifyReply, FastifyRequest } from 'fastify';
import { ZodError } from 'zod';
import { env } from '../config/env';

export interface StandardApiError {
  statusCode: number;
  error: string;
  message: string;
  details?: unknown;
  timestamp: string;
  path: string;
}

export function setupErrorHandler(error: FastifyError, request: FastifyRequest, reply: FastifyReply) {
  const timestamp = new Date().toISOString();
  const path = request.raw.url || '';

  // Log interno do erro no Fastify Logger
  request.log.error({
    err: error,
    reqId: request.id,
    url: path,
    method: request.method,
  }, 'Erro durante processamento da requisição');

  // Tratamento de erro de validação Zod
  if (error instanceof ZodError) {
    const errorResponse: StandardApiError = {
      statusCode: 400,
      error: 'Bad Request',
      message: 'Dados de requisição inválidos',
      details: error.flatten().fieldErrors,
      timestamp,
      path,
    };
    return reply.status(400).send(errorResponse);
  }

  // Erros com status code definido pelo Fastify (ex: 400, 404, 405)
  if (error.statusCode && error.statusCode < 500) {
    const errorResponse: StandardApiError = {
      statusCode: error.statusCode,
      error: error.name || 'Client Error',
      message: error.message,
      timestamp,
      path,
    };
    return reply.status(error.statusCode).send(errorResponse);
  }

  // Erros não tratados (500 Internal Server Error)
  // Em produção, nunca expor a stack trace ou mensagens internas
  const isProd = env.NODE_ENV === 'production';
  const errorResponse: StandardApiError = {
    statusCode: 500,
    error: 'Internal Server Error',
    message: isProd ? 'Ocorreu um erro interno no servidor.' : error.message,
    timestamp,
    path,
    ...(isProd ? {} : { details: error.stack }),
  };

  return reply.status(500).send(errorResponse);
}
