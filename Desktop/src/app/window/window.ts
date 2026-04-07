import { Component, EventEmitter, Input, Output,HostBinding, OnInit, ViewChild} from '@angular/core';
import { CdkDrag,CdkDragEnd,DragRef,Point} from "@angular/cdk/drag-drop";
import { DragDropModule } from '@angular/cdk/drag-drop'


@Component({
  selector: 'app-contentWindow',
  imports: [CdkDrag, DragDropModule],
  templateUrl: './window.html',
  styleUrl: './window.scss',
})
export class ContentWindow implements OnInit{
  @Input() appTitle = "App";
  @Input() IconPath = "";
  @Input() visible = false;
  @Input() fullscreenIcon = 'maximize.webp';
  
  @Output() close = new EventEmitter<void>();
  @Output() toTaskbar = new EventEmitter<{appIconPath:string,appTitle:string}>();

  @ViewChild(CdkDrag) cdkDrag!: CdkDrag;
  
  width = 1000;
  height = 800;

  minWidth = this.width;
  minHeight = this.height;
  
  contentWidth = this.width - 12;
  contentHeight = this.height - 40 - 6;
  
  isFullscreen = false;
  
  freePos:Point = {x:window.innerWidth/4,y:window.innerHeight/5};
  
  tempWidth = 0;
  tempHeight = 0;
  ;
  //this timer also doesnt work for some reason
  ngOnInit(): void {
    //interval(500).subscribe(() => { if(this.isFullscreen){this.refreshSize()}});
   
  }
 
  OnMousePressed(dragRef: CdkDrag){
    this.close.emit();
    if(this.isFullscreen){
      this.restoreDefaultResolution(dragRef);
      this.isFullscreen = false;
    }
  }
  OnFullScreenPressed(dragRef: CdkDrag){
    this.isFullscreen = !this.isFullscreen;

    if(this.isFullscreen){
      dragRef.reset();

       this.tempWidth = this.width;
       this.tempHeight = this.height;

       this.refreshSize();
      
       this.fullscreenIcon = 'restore.webp';

    }else{
      this.restoreDefaultResolution(dragRef);
    }
  }
  updateContentWidow(){
    this.contentWidth= this.width - 12;
    this.contentHeight = this.height-40 - 6;
  }
  onDragEnd(event: CdkDragEnd){
    this.freePos = event.source.getFreeDragPosition();
  
  }

  restoreDefaultResolution(dragRef: CdkDrag){
       dragRef.setFreeDragPosition(this.freePos)
       this.width = this.tempWidth;
       this.height = this.tempHeight;
       this.updateContentWidow();
       this.fullscreenIcon = 'maximize.webp';
  }
  
  refreshSize(){
    this.width = window.innerWidth - 12;
    this.height = window.innerHeight - 65;
    console.log("new Width: " + this.width);
    console.log("new height: " + this.height);
       this.updateContentWidow();
  }

  OnMinimize(iconPath:string,appTitle:string){
  
      console.log("call to add to taskbar");
      if(this.isFullscreen){
        this.width = this.tempWidth;
        this.height = this.tempHeight;
        this.fullscreenIcon = 'maximize.webp';
        this.updateContentWidow();
        this.isFullscreen = false;
      }
      this.toTaskbar.emit({appIconPath: iconPath,appTitle:appTitle});
      this.close.emit();
  }

  widthModifier = 200;
  heightModifier = 56;
  taskBarYOffset = 68;
  OnSizeUp(){
    if(this.width + this.widthModifier < window.innerWidth && this.height + this.heightModifier < window.innerHeight){
      
      if(!this.positionRelativeWidthCheck()){
        return;
      }
        
      this.width = this.width + this.widthModifier;
      this.height = this.height + this.heightModifier;
      this.updateContentWidow();
    }
  }
  OnSizeDown(){
    if(this.width-this.widthModifier >= this.minWidth && this.height-this.heightModifier >= this.minHeight){
      this.width = this.width - this.widthModifier;
      this.height = this.height - this.heightModifier;

      this.updateContentWidow();
    }
  }

   positionRelativeWidthCheck():boolean{
    var newSizeWithOffsetX = this.freePos.x + this.width + this.widthModifier;
    var newSizeWithOffsetY = this.freePos.y + this.height + this.heightModifier ;

    if(newSizeWithOffsetX > window.innerWidth){
      var moveOffsetX = newSizeWithOffsetX - window.innerWidth;
      if(this.freePos.x - moveOffsetX - 13 > 1){
        
        this.freePos.x = this.freePos.x - moveOffsetX - 13;
      }else{
        return false;
      }
      
    }
    
    console.log(newSizeWithOffsetY,window.innerHeight)
     if(newSizeWithOffsetY > window.innerHeight - this.taskBarYOffset){
      var moveOffsetY = newSizeWithOffsetY - (window.innerHeight - this.taskBarYOffset);

      if(this.freePos.y-moveOffsetY > 1){
        this.freePos.y = this.freePos.y - moveOffsetY ;
      }else{
        return false;
      }
    }
     console.log(this.freePos);
     this.cdkDrag.setFreeDragPosition(this.freePos);
     return true;
  }

}
