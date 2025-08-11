import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CurrencyService } from '../../services/currency.service';
import { CurrencyIconsService } from '../../services/currency-icons.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-converter',
  standalone: false,
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss']
})
export class ConverterComponent implements OnInit {
  converterForm: FormGroup;
  currencies: { [key: string]: any } = {};
  currencyListCache: any[] = [];
  isLoading = false;
  conversionResult: number | null = null;


  constructor(
    private fb: FormBuilder,
    private currencyService: CurrencyService,
    private currencyIconsService: CurrencyIconsService,
    private snackBar: MatSnackBar
  ) {
    this.converterForm = this.fb.group({
      fromCurrency: ['', Validators.required],
      toCurrency: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit() {
    this.loadCurrencies();
  }

  loadCurrencies() {
    this.isLoading = true;
    
    this.currencyService.getCurrencies().subscribe({
      next: (data) => {
        this.currencies = data.data || {};
        this.currencyListCache = Object.entries(this.currencies).map(([code, details]: [string, any]) => ({
          code,
          ...details
        }));
        this.isLoading = false;
      },
      error: (error) => {
        this.snackBar.open('Error loading currencies', 'Close', { duration: 3000 });
        this.isLoading = false;
      }
    });
  }

  onSubmit() {
    if (this.converterForm.valid) {
      const { fromCurrency, toCurrency, amount } = this.converterForm.value;
      this.isLoading = true;

      this.currencyService.convertCurrency(fromCurrency, toCurrency, amount).subscribe({
        next: (result) => {
          this.conversionResult = result.result;
          this.currencyService.saveToHistory(result);
          this.isLoading = false;
        },
        error: (error) => {
          this.snackBar.open('Error converting currency', 'Close', { duration: 3000 });
          this.isLoading = false;
        }
      });
    }
  }

  get currencyList() {
    return this.currencyListCache;
  }

  get currencyCount() {
    return Object.keys(this.currencies).length;
  }

  getCurrencySymbol(currencyCode: string): string {
    return this.currencyIconsService.getCurrencySymbol(currencyCode);
  }

  getCurrencyIcon(currencyCode: string): string {
    return this.currencyIconsService.getCurrencyIcon(currencyCode);
  }

  getCountryFlag(currencyCode: string): string {
    return this.currencyIconsService.getCountryFlag(currencyCode);
  }
}
