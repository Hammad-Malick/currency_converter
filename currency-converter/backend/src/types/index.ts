// API Response Types
export interface CurrencyData {
  [currencyCode: string]: {
    symbol: string;
    name: string;
    symbol_native: string;
    decimal_digits: number;
    rounding: number;
    code: string;
    name_plural: string;
  };
}

export interface CurrenciesResponse {
  data: CurrencyData;
}

export interface ConversionRateData {
  [currencyCode: string]: number;
}

export interface ConversionRateResponse {
  data: ConversionRateData;
}

// Request/Response Types
export interface ConvertRequest {
  from: string;
  to: string;
  amount: string | number;
}

export interface ConvertResponse {
  from: string;
  to: string;
  amount: number;
  rate: number;
  result: number;
  timestamp: string;
}

export interface ErrorResponse {
  error: string;
  details?: string;
}

export interface TestResponse {
  message: string;
  timestamp: string;
}

// Express Request Extensions
export interface ConvertQuery {
  from?: string;
  to?: string;
  amount?: string;
}
