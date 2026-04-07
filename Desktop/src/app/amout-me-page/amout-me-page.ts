import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-amout-me-page',
  imports: [],
  templateUrl: './amout-me-page.html',
  styleUrl: './amout-me-page.css',
})
export class AmoutMePage {
  @Input() contentWIdth = 100;
  @Input() contentHeight = 100;
}
