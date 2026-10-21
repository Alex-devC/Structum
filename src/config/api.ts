/**
 * Configuração centralizada da API no Frontend (STRUCTUM).
 *
 * Evita URLs fixas espalhadas pelos componentes e permite configurar
 * a URL base da API via variável de ambiente VITE_API_BASE_URL
 * (útil para desenvolvimento local, clientes móveis ou ambientes distribuídos).
 */

export const API_CONFIG = {
  baseUrl: (import.meta.env.VITE_API_BASE_URL as string | undefined) || '',
  endpoints: {
    health: '/api/health',
  },
} as const;

/**
 * Constrói a URL completa para uma rota da API a partir da base configurada.
 */
export function getApiUrl(endpoint: string): string {
  const base = API_CONFIG.baseUrl.replace(/\/+$/, '');
  const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${base}${path}`;
}
