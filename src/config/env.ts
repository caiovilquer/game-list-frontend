// Configuração de variáveis de ambiente
export const config = {
  // API Configuration
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:8080',
  
  // Environment
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
  mode: import.meta.env.MODE,
  
  // Application Settings
  appName: import.meta.env.VITE_APP_NAME || 'GameList',
  appVersion: import.meta.env.VITE_APP_VERSION || '1.0.0',
  
  // Optional: Debug settings
  enableDebug: import.meta.env.VITE_ENABLE_DEBUG === 'true' || import.meta.env.DEV,
} as const;

// Type definitions for better TypeScript support
export type Config = typeof config;

// Validation function to ensure required environment variables are set
export function validateEnvironment(): void {
  const requiredVars = ['VITE_API_URL'];
  const missingVars = requiredVars.filter(varName => !import.meta.env[varName]);
  
  if (missingVars.length > 0) {
    console.warn('Missing environment variables:', missingVars);
    console.warn('Using default values. Please check your environment configuration.');
  }
}

// Helper function to get environment-specific values
export function getEnvValue(key: string, defaultValue?: string): string {
  const value = import.meta.env[key];
  if (!value && !defaultValue) {
    throw new Error(`Environment variable ${key} is required but not set`);
  }
  return value || defaultValue || '';
}

export default config;
