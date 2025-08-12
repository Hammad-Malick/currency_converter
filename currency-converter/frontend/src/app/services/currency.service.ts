import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap, timeout, catchError } from 'rxjs';

export interface ConversionResult {
  from: string;
  to: string;
  amount: number;
  result: number;
  rate: number;
  timestamp: string;
}

export interface ConversionHistory extends ConversionResult {
  id: string;
}

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private readonly API_URL = this.getApiUrl();
  private readonly HISTORY_KEY = 'conversion_history';
  private currenciesCache: any = null;

  private getApiUrl(): string {
    // Check if we're in production (Vercel)
    if (typeof window !== 'undefined' && window.location.hostname.includes('vercel.app')) {
      // Production: Use environment-specific backend URL
      return 'https://currency-converter-backend-sage.vercel.app';
    }
    // Development: Use local backend
    return 'http://localhost:3000';
  }

  constructor(private http: HttpClient) {}

  getCurrencies(): Observable<any> {
    if (this.currenciesCache) {
      return of(this.currenciesCache);
    }
    
    return this.http.get(`${this.API_URL}/currencies`, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).pipe(
      timeout(10000),
      tap(data => {
        this.currenciesCache = data;
      }),
      catchError(error => {
        throw error;
      })
    );
  }

  convertCurrency(from: string, to: string, amount: number): Observable<ConversionResult> {
    return this.http.get<ConversionResult>(`${this.API_URL}/convert`, {
      params: { from, to, amount: amount.toString() }
    });
  }

  saveToHistory(conversion: ConversionResult): void {
    const history = this.getHistory();
    const newEntry: ConversionHistory = {
      ...conversion,
      id: new Date().getTime().toString()
    };
    history.unshift(newEntry);
    localStorage.setItem(this.HISTORY_KEY, JSON.stringify(history));
  }

  getHistory(): ConversionHistory[] {
    const history = localStorage.getItem(this.HISTORY_KEY);
    return history ? JSON.parse(history) : [];
  }

  clearHistory(): void {
    localStorage.removeItem(this.HISTORY_KEY);
  }
}
