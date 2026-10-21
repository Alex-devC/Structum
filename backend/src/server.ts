import { buildApp } from './app';
import { env } from './config/env';
import { getPrismaClient, isDatabaseConfigured } from './db/prisma';

const app = buildApp();

async function start() {
  try {
    await app.listen({
      port: env.PORT,
      host: env.HOST,
    });
    console.log(`🚀 [STRUCTUM Backend] Servidor Fastify ativo em http://${env.HOST}:${env.PORT}`);
    console.log(`📋 [STRUCTUM Backend] Endpoint de saúde disponível em: http://${env.HOST}:${env.PORT}${env.API_PREFIX}/health`);
    console.log(`🔒 [STRUCTUM Backend] Ambiente: ${env.NODE_ENV}`);
    console.log(
      `💾 [STRUCTUM Backend] Banco de dados: ${
        isDatabaseConfigured()
          ? 'Configurado (MySQL Prisma)'
          : 'Não configurado (Modo de desenvolvimento sem banco)'
      }`
    );

    if (env.NODE_ENV === 'production' && !isDatabaseConfigured()) {
      console.warn(
        '⚠️  [STRUCTUM Backend] ATENÇÃO: Ambiente de PRODUÇÃO sem DATABASE_URL. Módulos que requerem persistência permanecerão bloqueados.'
      );
    }
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

// Encerramento gracioso (Graceful Shutdown)
const signals: NodeJS.Signals[] = ['SIGINT', 'SIGTERM'];
for (const signal of signals) {
  process.on(signal, async () => {
    console.log(`\n🛑 [STRUCTUM Backend] Recebido sinal ${signal}, encerrando graciosamente...`);
    try {
      await app.close();
      const client = getPrismaClient();
      if (client) {
        await client.$disconnect();
      }
      console.log('✅ [STRUCTUM Backend] Conexões encerradas com sucesso.');
      process.exit(0);
    } catch (err) {
      console.error('❌ [STRUCTUM Backend] Erro durante encerramento:', err);
      process.exit(1);
    }
  });
}

// Inicia se executado diretamente
if (import.meta.url === `file://${process.argv[1]}`) {
  start();
}

export { app, start };
