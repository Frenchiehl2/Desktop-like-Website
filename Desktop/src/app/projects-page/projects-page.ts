import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-projects-page',
  imports: [],
  templateUrl: './projects-page.html',
  styleUrl: './projects-page.css',
})
export class ProjectsPage {
  @Input() contentWIdth = 100;
  @Input() contentHeight = 100;
} 
 