import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class AppComponent {
  title = 'Currency Converter';

  constructor(public router: Router) {}

  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}
