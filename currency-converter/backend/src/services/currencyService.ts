import axios, { AxiosResponse } from 'axios';
import { CurrenciesResponse, ConversionRateResponse } from '../types';

export class CurrencyService {
  private readonly apiKey: string;
  private readonly baseUrl: string;
  private readonly timeout: number;

  constructor(apiKey: string, baseUrl: string = 'https://api.freecurrencyapi.com/v1', timeout: number = 10000) {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
    this.timeout = timeout;
  }

  /**
   * Fetch all supported currencies from the API
   */
  async getAllCurrencies(): Promise<CurrenciesResponse> {
    console.log('🔄 Fetching all currencies from Free Currency API...');
    
    try {
      const response: AxiosResponse<CurrenciesResponse> = await axios.get(
        `${this.baseUrl}/currencies`,
        {
          headers: {
            'apikey': this.apiKey
          },
          timeout: this.timeout
        }
      );

      console.log(' Successfully fetched all currencies from API');
      return response.data;
    } catch (error) {
      console.error(' Error fetching currencies:', error instanceof Error ? error.message : 'Unknown error');
      throw new Error('Failed to fetch currencies from external API');
    }
  }

  /**
   * Get conversion rate between two currencies
   */
  async getConversionRate(baseCurrency: string, targetCurrency: string): Promise<number> {
    console.log(` Fetching conversion rate: ${baseCurrency} -> ${targetCurrency}`);
    
    try {
      const response: AxiosResponse<ConversionRateResponse> = await axios.get(
        `${this.baseUrl}/latest`,
        {
          params: {
            base_currency: baseCurrency.toUpperCase(),
            currencies: targetCurrency.toUpperCase()
          },
          headers: {
            'apikey': this.apiKey
          },
          timeout: this.timeout
        }
      );

      const rate = response.data.data[targetCurrency.toUpperCase()];
      
      if (rate === undefined) {
        throw new Error(`No conversion rate found for ${baseCurrency} to ${targetCurrency}`);
      }

      console.log(` Conversion rate fetched: 1 ${baseCurrency} = ${rate} ${targetCurrency}`);
      return rate;
    } catch (error) {
      console.error(' Error fetching conversion rate:', error instanceof Error ? error.message : 'Unknown error');
      throw new Error('Failed to fetch conversion rate from external API');
    }
  }

  /**
   * Convert amount from one currency to another
   */
  async convertCurrency(baseCurrency: string, targetCurrency: string, amount: number): Promise<{
    rate: number;
    convertedAmount: number;
  }> {
    const rate = await this.getConversionRate(baseCurrency, targetCurrency);
    const convertedAmount = amount * rate;
    
    console.log(` Converted ${amount} ${baseCurrency} = ${convertedAmount.toFixed(6)} ${targetCurrency}`);
    
    return {
      rate,
      convertedAmount
    };
  }
}
