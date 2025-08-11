import express, { Application } from 'express';
import cors from 'cors';
import { config, validateConfig } from './config';
import { CurrencyService } from './services/currencyService';
import { CurrencyController } from './controllers/currencyController';
import { requestLogger, errorLogger } from './middleware/logger';

/**
 * Currency Converter Backend Server
 * Built with TypeScript, Express, and proper architecture
 */
class Server {
  private app: Application;
  private currencyService: CurrencyService;
  private currencyController: CurrencyController;

  constructor() {
    this.app = express();
    this.currencyService = new CurrencyService(config.apiKey, config.apiBaseUrl);
    this.currencyController = new CurrencyController(this.currencyService);
    
    this.initializeMiddleware();
    this.initializeRoutes();
    this.initializeErrorHandling();
  }

  /**
   * Initialize middleware
   */
  private initializeMiddleware(): void {
    // CORS configuration
    this.app.use(cors({
      origin: config.corsOrigins,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: '*',
      credentials: true,
      preflightContinue: false,
      optionsSuccessStatus: 200
    }));

    // Body parsing
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    // Custom logging middleware
    this.app.use(requestLogger);
  }

  /**
   * Initialize API routes
   */
  private initializeRoutes(): void {
    // Health check endpoint
    this.app.get('/test', this.currencyController.test);
    this.app.get('/health', this.currencyController.test);

    // Currency endpoints
    this.app.get('/currencies', this.currencyController.getCurrencies);
    this.app.get('/convert', this.currencyController.convertCurrency);

    // 404 handler for unknown routes
    this.app.use('*', (req, res) => {
      res.status(404).json({
        error: 'Route not found',
        details: `${req.method} ${req.originalUrl} is not a valid endpoint`
      });
    });
  }

  /**
   * Initialize error handling
   */
  private initializeErrorHandling(): void {
    this.app.use(errorLogger);
    
    // Global error handler
    this.app.use((error: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
      res.status(500).json({
        error: 'Internal server error',
        details: config.nodeEnv === 'development' ? error.message : 'Something went wrong'
      });
    });
  }

  /**
   * Get the Express app instance (for Vercel)
   */
  public getApp(): Application {
    validateConfig();
    return this.app;
  }

  /**
   * Start the server
   */
  public start(): void {
    try {
      validateConfig();
      
      this.app.listen(config.port, () => {
        console.log('Currency Converter Backend Server Started');
        console.log(`Server running on port ${config.port}`);
      });
    } catch (error) {
      console.error(' Failed to start server:', error);
      process.exit(1);
    }
  }
}

// Initialize the server
const server = new Server();

// For Vercel serverless deployment
if (process.env['NODE_ENV'] === 'production') {
  // Export the Express app for Vercel
  module.exports = server.getApp();
} else {
  // Start the server locally
  server.start();
}
