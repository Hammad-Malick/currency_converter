import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CurrencyIconsService {
  
  private currencyToCountry: { [key: string]: string } = {
    'USD': 'US',
    'EUR': 'EU',
    'GBP': 'GB',
    'JPY': 'JP',
    'AUD': 'AU',
    'CAD': 'CA',
    'CHF': 'CH',
    'CNY': 'CN',
    'SEK': 'SE',
    'NZD': 'NZ',
    'MXN': 'MX',
    'SGD': 'SG',
    'HKD': 'HK',
    'NOK': 'NO',
    'KRW': 'KR',
    'TRY': 'TR',
    'RUB': 'RU',
    'INR': 'IN',
    'BRL': 'BR',
    'ZAR': 'ZA',
    'PLN': 'PL',
    'DKK': 'DK',
    'CZK': 'CZ',
    'HUF': 'HU',
    'ILS': 'IL',
    'CLP': 'CL',
    'PHP': 'PH',
    'AED': 'AE',
    'COP': 'CO',
    'SAR': 'SA',
    'MYR': 'MY',
    'RON': 'RO',
    'THB': 'TH',
    'BGN': 'BG',
    'HRK': 'HR',
    'ISK': 'IS',
    'EGP': 'EG',
    'QAR': 'QA',
    'UAH': 'UA',
    'UYU': 'UY',
    'PEN': 'PE',
    'BOB': 'BO',
    'PAB': 'PA',
    'CRC': 'CR',
    'JMD': 'JM',
    'TTD': 'TT',
    'GTQ': 'GT',
    'HNL': 'HN',
    'NIO': 'NI',
    'DOP': 'DO'
  };

  private currencyIcons: { [key: string]: string } = {
    'USD': 'attach_money',
    'EUR': 'euro_symbol',
    'GBP': 'currency_pound',
    'JPY': 'currency_yen',
    'INR': 'currency_rupee',
    'KRW': 'currency_won',
    'CNY': 'currency_yuan',
    'RUB': 'currency_ruble',
    'BTC': 'currency_bitcoin'
  };

  constructor() { }

  getCurrencyIcon(currencyCode: string): string {
    return this.currencyIcons[currencyCode] || 'monetization_on';
  }

  getCountryFlag(currencyCode: string): string {
    const countryCode = this.currencyToCountry[currencyCode];
    if (countryCode) {
      // Return flag emoji using regional indicator symbols
      return this.getCountryFlagEmoji(countryCode);
    }
    return '🌍'; // Default world emoji
  }

  private getCountryFlagEmoji(countryCode: string): string {
    const flagMap: { [key: string]: string } = {
      'US': '🇺🇸',
      'EU': '🇪🇺',
      'GB': '🇬🇧',
      'JP': '🇯🇵',
      'AU': '🇦🇺',
      'CA': '🇨🇦',
      'CH': '🇨🇭',
      'CN': '🇨🇳',
      'SE': '🇸🇪',
      'NZ': '🇳🇿',
      'MX': '🇲🇽',
      'SG': '🇸🇬',
      'HK': '🇭🇰',
      'NO': '🇳🇴',
      'KR': '🇰🇷',
      'TR': '🇹🇷',
      'RU': '🇷🇺',
      'IN': '🇮🇳',
      'BR': '🇧🇷',
      'ZA': '🇿🇦',
      'PL': '🇵🇱',
      'DK': '🇩🇰',
      'CZ': '🇨🇿',
      'HU': '🇭🇺',
      'IL': '🇮🇱',
      'CL': '🇨🇱',
      'PH': '🇵🇭',
      'AE': '🇦🇪',
      'CO': '🇨🇴',
      'SA': '🇸🇦',
      'MY': '🇲🇾',
      'RO': '🇷🇴',
      'TH': '🇹🇭',
      'BG': '🇧🇬',
      'HR': '🇭🇷',
      'IS': '🇮🇸',
      'EG': '🇪🇬',
      'QA': '🇶🇦',
      'UA': '🇺🇦',
      'UY': '🇺🇾',
      'PE': '🇵🇪',
      'BO': '🇧🇴',
      'PA': '🇵🇦',
      'CR': '🇨🇷',
      'JM': '🇯🇲',
      'TT': '🇹🇹',
      'GT': '🇬🇹',
      'HN': '🇭🇳',
      'NI': '🇳🇮',
      'DO': '🇩🇴'
    };
    return flagMap[countryCode] || '🌍';
  }

  getCurrencySymbol(currencyCode: string): string {
    const symbols: { [key: string]: string } = {
      'USD': '$',
      'EUR': '€',
      'GBP': '£',
      'JPY': '¥',
      'CNY': '¥',
      'KRW': '₩',
      'INR': '₹',
      'RUB': '₽',
      'CAD': 'C$',
      'AUD': 'A$',
      'NZD': 'NZ$',
      'CHF': 'CHF',
      'SEK': 'kr',
      'NOK': 'kr',
      'DKK': 'kr',
      'PLN': 'zł',
      'CZK': 'Kč',
      'HUF': 'Ft',
      'BGN': 'лв',
      'HRK': 'kn',
      'RON': 'lei',
      'TRY': '₺',
      'BRL': 'R$',
      'MXN': '$',
      'CLP': '$',
      'COP': '$',
      'PEN': 'S/',
      'ARS': '$',
      'UYU': '$U',
      'BOB': 'Bs',
      'PYG': '₲',
      'VES': 'Bs.S',
      'GYD': '$',
      'SRD': '$',
      'TTD': 'TT$',
      'BBD': '$',
      'JMD': 'J$',
      'BSD': '$',
      'KYD': '$',
      'BZD': 'BZ$',
      'GTQ': 'Q',
      'HNL': 'L',
      'NIO': 'C$',
      'CRC': '₡',
      'PAB': 'B/.',
      'DOP': 'RD$',
      'HTG': 'G',
      'CUP': '₱',
      'XCD': '$'
    };
    return symbols[currencyCode] || currencyCode;
  }
}
