import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CurrencyService, ConversionHistory } from '../../services/currency.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-history',
  standalone: false,
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  history: ConversionHistory[] = [];

  constructor(
    private currencyService: CurrencyService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadHistory();
  }

  loadHistory() {
    this.history = this.currencyService.getHistory();
  }

  clearHistory() {
    this.currencyService.clearHistory();
    this.history = [];
    this.snackBar.open('History cleared successfully!', 'Close', { 
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }

  navigateToConverter() {
    this.router.navigate(['/converter']);
  }

  formatDate(timestamp: string): string {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 1) {
      const diffInMinutes = Math.floor(diffInHours * 60);
      return diffInMinutes <= 1 ? 'Just now' : `${diffInMinutes} minutes ago`;
    } else if (diffInHours < 24) {
      const hours = Math.floor(diffInHours);
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  }

  getUniqueCurrencies(): string[] {
    const currencies = new Set<string>();
    this.history.forEach(item => {
      currencies.add(item.from);
      currencies.add(item.to);
    });
    return Array.from(currencies);
  }

  getTotalAmount(): number {
    return this.history.reduce((total, item) => total + item.amount, 0);
  }
}
