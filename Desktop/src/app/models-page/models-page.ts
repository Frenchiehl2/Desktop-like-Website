import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-models-page',
  imports: [],
  templateUrl: './models-page.html',
  styleUrl: './models-page.css',
})
export class ModelsPage {
  @Input() contentWIdth = 100;
  @Input() contentHeight = 100;
}
