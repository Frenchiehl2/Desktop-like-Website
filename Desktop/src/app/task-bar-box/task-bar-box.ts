import { Component, EventEmitter, Inject, inject, Injectable, Input, Output} from '@angular/core';

@Component({
  selector: 'app-task-bar-box',
  imports: [],
  templateUrl: './task-bar-box.html',
  styleUrl: './task-bar-box.css',
})
@Injectable({ providedIn: 'root' })
export class TaskBarBox {

  @Input() taskID = 0;
  @Input() iconPath = '';
  @Input() appTitle = 'Default app name';
  @Output() appTitleOutput = this.appTitle;

  @Output() moveToDesktop = new EventEmitter<void>();
  @Output() terminate = new EventEmitter<void>();

  OnMousePressed($event: MouseEvent){
    if($event.button == 0){
      this.moveToDesktop.emit();
    }else{
      this.terminate.emit();
    }
  }
}
