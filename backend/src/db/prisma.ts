import { PrismaClient } from '@prisma/client';
import { env } from '../config/env';

/**
 * Gerenciamento seguro do cliente Prisma.
 *
 * Em modo de desenvolvimento sem banco de dados configurado,
 * o cliente não tenta instanciar nem conectar desnecessariamente,
 * permitindo que a API opere em modo de fundação sem erros.
 */
declare global {
  // eslint-disable-next-line no-var
  var prismaClientInstance: PrismaClient | undefined;
}

export function isDatabaseConfigured(): boolean {
  return Boolean(env.DATABASE_URL && env.DATABASE_URL.trim().length > 0);
}

export function getPrismaClient(): PrismaClient | null {
  if (!isDatabaseConfigured()) {
    return null;
  }

  if (!globalThis.prismaClientInstance) {
    globalThis.prismaClientInstance = new PrismaClient({
      log: env.LOG_LEVEL === 'debug' ? ['query', 'info', 'warn', 'error'] : ['error', 'warn'],
    });
  }

  return globalThis.prismaClientInstance;
}

export interface DatabaseHealthResult {
  configured: boolean;
  connected: boolean;
  driver: string;
  status: 'conectado' | 'nao_configurado' | 'indisponivel';
  message: string;
}

/**
 * Verifica o estado da conexão sem presumir que o banco existe ou está conectado.
 * Quando não há DATABASE_URL configurada, reporta claramente 'nao_configurado'.
 */
export async function checkDatabaseHealth(): Promise<DatabaseHealthResult> {
  if (!isDatabaseConfigured()) {
    return {
      configured: false,
      connected: false,
      driver: 'mysql',
      status: 'nao_configurado',
      message: 'Banco de dados não configurado (DATABASE_URL ausente no ambiente de desenvolvimento).',
    };
  }

  const client = getPrismaClient();
  if (!client) {
    return {
      configured: false,
      connected: false,
      driver: 'mysql',
      status: 'nao_configurado',
      message: 'Cliente de banco de dados não inicializado.',
    };
  }

  try {
    await client.$queryRawUnsafe('SELECT 1');
    return {
      configured: true,
      connected: true,
      driver: 'mysql',
      status: 'conectado',
      message: 'Conexão com o banco de dados operacional.',
    };
  } catch {
    return {
      configured: true,
      connected: false,
      driver: 'mysql',
      status: 'indisponivel',
      message: 'DATABASE_URL definida, porém o servidor de banco está inacessível ou offline.',
    };
  }
}
