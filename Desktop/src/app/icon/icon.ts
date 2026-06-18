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
  var defaultMouseClicks;
 
  if(this.mousePressed == 1){
    this.Open.emit();
  
  }

  this.InitializeOpenCheck();
  }

  InitializeOpenCheck(){
    this.mousePressed ++;
   
    timer(300).subscribe(() => {
    if(this.mousePressed > 0 && !this.starterIcon){
      this.mousePressed = 0;
    }
    });
  }
}
