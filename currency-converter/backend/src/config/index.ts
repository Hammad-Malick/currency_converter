import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

export interface AppConfig {
  port: number;
  apiKey: string;
  apiBaseUrl: string;
  corsOrigins: string[];
  nodeEnv: string;
}

/**
 * Application configuration
 */
export const config: AppConfig = {
  port: parseInt(process.env['PORT'] || '3000', 10),
  apiKey: process.env['API_KEY'] || '4E0VK7BnkdeUuh1vegAt808v2IUjzUR6lxcvBMT2',
  apiBaseUrl: process.env['API_BASE_URL'] || 'https://api.freecurrencyapi.com/v1',
  corsOrigins: process.env['CORS_ORIGINS']?.split(',') || [
    'http://localhost:4200',
    'http://localhost:3000',
    'https://*.vercel.app',
    'https://currency-converter-frontend-*.vercel.app'
  ],
  nodeEnv: process.env['NODE_ENV'] || 'development'
};

/**
 * Validate required configuration
 */
export const validateConfig = (): void => {
  if (!config.apiKey) {
    throw new Error('API_KEY environment variable is required');
  }

  if (config.port < 1 || config.port > 65535) {
    throw new Error('PORT must be a valid port number (1-65535)');
  }

  console.log('Configuration validated successfully');
};
