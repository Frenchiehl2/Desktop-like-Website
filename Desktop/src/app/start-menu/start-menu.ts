import { Component, EventEmitter, Input, Output  } from '@angular/core';
import { Icon } from '../icon/icon';


@Component({
  selector: 'app-start-menu',
  imports: [Icon],
  templateUrl: './start-menu.html',
  styleUrl: './start-menu.css',
})
export class StartMenu {
  @Input() visible = false;

  @Output() openFromStart = new EventEmitter<{apptitle:string}> 

   OnPowerPress(){
    window.close();
  }

  OnAppOpen(app:Icon){
    this.openFromStart.emit({apptitle:app.Title}); 
  }
}
