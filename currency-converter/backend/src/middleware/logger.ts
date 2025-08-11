import { Request, Response, NextFunction } from 'express';

/**
 * Request logging middleware
 */
export const requestLogger = (req: Request, res: Response, next: NextFunction): void => {
  const timestamp = new Date().toISOString();
  const method = req.method;
  const url = req.url;
  const userAgent = req.get('User-Agent') || 'Unknown';
  const ip = req.ip || req.connection.remoteAddress || 'Unknown';

  console.log(`${timestamp} - ${method} ${url}`);
  console.log(`IP: ${ip} | User-Agent: ${userAgent}`);
  
  if (Object.keys(req.query).length > 0) {
    console.log(' Query params:', req.query);
  }
  
  if (Object.keys(req.body).length > 0) {
    console.log(' Body:', req.body);
  }

  // Log response when it finishes
  const originalSend = res.json;
  res.json = function(data: any) {
    console.log(` ${method} ${url} - Status: ${res.statusCode}`);
    return originalSend.call(this, data);
  };

  next();
};

/**
 * Error logging middleware
 */
export const errorLogger = (error: Error, req: Request, _res: Response, next: NextFunction): void => {
  console.error(` Error on ${req.method} ${req.url}:`, error.message);
  console.error('Stack trace:', error.stack);
  next(error);
};
