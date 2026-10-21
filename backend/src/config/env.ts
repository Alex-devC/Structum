import { z } from 'zod';
import dotenv from 'dotenv';

// Carrega variáveis de ambiente se disponíveis
dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().int().positive().default(3000),
  HOST: z.string().default('0.0.0.0'),
  LOG_LEVEL: z.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace']).default('info'),
  // CORS_ORIGIN: opcional. Se omitido, reflete dinamicamente a origem real do frontend (APP_URL / sandbox)
  CORS_ORIGIN: z.string().optional(),
  // DATABASE_URL: NÃO é obrigatória em desenvolvimento para permitir trabalhar sem banco de dados configurado
  DATABASE_URL: z.string().trim().min(1).optional(),
  // APP_URL: URL do frontend/serviço injetada pela infraestrutura de hospedagem (ex: Cloud Run no AI Studio)
  APP_URL: z.string().optional(),
  // Metadados do Serviço
  SERVICE_NAME: z.string().default('STRUCTUM-Backend-Core'),
  APP_VERSION: z.string().default('3.4.2'),
  API_PREFIX: z.string().default('/api'),
});

const parseEnv = () => {
  const result = envSchema.safeParse(process.env);

  if (!result.success) {
    const errorDetails = result.error.issues.map(issue => ({
      field: issue.path.join('.'),
      message: issue.message,
    }));

    console.error('❌ [STRUCTUM Backend] Falha na validação das variáveis de ambiente:');
    console.error(JSON.stringify(errorDetails, null, 2));
    throw new Error('Configuração de ambiente inválida. Verifique o arquivo .env');
  }

  return result.data;
};

export const env = parseEnv();
export type EnvConfig = z.infer<typeof envSchema>;

/**
 * Validação para funcionalidades que exigem banco de dados em produção.
 * Em produção, as funcionalidades que dependem do banco devem chamar esta função
 * antes de executar operações de persistência.
 */
export function assertDatabaseConfigured(featureName = 'esta operação'): string {
  if (!env.DATABASE_URL || env.DATABASE_URL.trim() === '') {
    throw new Error(
      `[STRUCTUM Security] Banco de dados não configurado para ${featureName}. É necessário definir DATABASE_URL.`
    );
  }
  return env.DATABASE_URL;
}
