import { Component,EventEmitter,input,Input, Output} from '@angular/core';
import {CdkDrag} from '@angular/cdk/drag-drop';
import { timer } from 'rxjs';

@Component({
  selector: 'app-icon',
  imports: [CdkDrag],
  templateUrl: './icon.html',
  styleUrl: './icon.css',
})
export class Icon {
 @Input() IconPath:String = "book-icon.svg";
 @Input() Title:string = "App title";
 @Input() starterIcon:boolean = false;
 @Output() Open = new EventEmitter<void>();

 mousePressed = 0;
  onMousePressDown(element: HTMLElement){
  this.mousePressed ++;
 var defaultMouseClicks;
 
  if(this.starterIcon){
    defaultMouseClicks = 1;
  }else{
    defaultMouseClicks = 2;
  }
  if(this.mousePressed == defaultMouseClicks){
    this.Open.emit();
    this.mousePressed = 0;
  }

  timer(600).subscribe(() => {
    if(this.mousePressed > 0 && !this.starterIcon){
      this.mousePressed --;
    }
    });
  }
}
