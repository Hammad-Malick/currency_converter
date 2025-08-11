import { Request, Response } from 'express';
import { CurrencyService } from '../services/currencyService';
import { ConvertQuery, ConvertResponse, ErrorResponse, TestResponse } from '../types';

export class CurrencyController {
  private currencyService: CurrencyService;

  constructor(currencyService: CurrencyService) {
    this.currencyService = currencyService;
  }

  /**
   * Test endpoint to verify backend is working
   */
  test = (_req: Request, res: Response<TestResponse>) => {
    console.log('Test endpoint called');
    res.json({ 
      message: 'Backend is working!', 
      timestamp: new Date().toISOString() 
    });
  };

  /**
   * Get all supported currencies
   */
  getCurrencies = async (_req: Request, res: Response) => {
    try {
      const currencies = await this.currencyService.getAllCurrencies();
      res.json(currencies);
    } catch (error) {
      console.error('Controller error:', error);
      const errorResponse: ErrorResponse = {
        error: 'Failed to fetch currencies',
        details: error instanceof Error ? error.message : 'Unknown error'
      };
      res.status(500).json(errorResponse);
    }
  };

  /**
   * Convert currency with validation
   */
  convertCurrency = async (req: Request<{}, ConvertResponse | ErrorResponse, {}, ConvertQuery>, res: Response<ConvertResponse | ErrorResponse>) => {
    try {
      const { from, to, amount } = req.query;

      // Validation
      if (!from || !to || !amount) {
        const errorResponse: ErrorResponse = {
          error: 'Missing required parameters',
          details: 'Please provide from, to, and amount parameters'
        };
        return res.status(400).json(errorResponse);
      }

      // Convert amount to number and validate
      const numAmount = Number(amount);
      if (isNaN(numAmount) || numAmount <= 0) {
        const errorResponse: ErrorResponse = {
          error: 'Invalid amount',
          details: 'Amount must be a positive number'
        };
        return res.status(400).json(errorResponse);
      }

      // Validate currency codes (basic validation)
      const currencyRegex = /^[A-Z]{3}$/;
      if (!currencyRegex.test(from.toUpperCase()) || !currencyRegex.test(to.toUpperCase())) {
        const errorResponse: ErrorResponse = {
          error: 'Invalid currency code',
          details: 'Currency codes must be 3-letter ISO codes (e.g., USD, EUR)'
        };
        return res.status(400).json(errorResponse);
      }

      // Perform conversion
      const { rate, convertedAmount } = await this.currencyService.convertCurrency(
        from.toUpperCase(),
        to.toUpperCase(),
        numAmount
      );

      const response: ConvertResponse = {
        from: from.toUpperCase(),
        to: to.toUpperCase(),
        amount: numAmount,
        rate,
        result: convertedAmount,
        timestamp: new Date().toISOString()
      };

      return res.json(response);
    } catch (error) {
      console.error(' Conversion error:', error);
      const errorResponse: ErrorResponse = {
        error: 'Failed to convert currency',
        details: error instanceof Error ? error.message : 'Unknown error'
      };
      return res.status(500).json(errorResponse);
    }
  };
}
