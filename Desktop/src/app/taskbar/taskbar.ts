import { ApplicationRef, Component, ComponentRef, EventEmitter, inject, numberAttribute, Output, viewChild, ViewContainerRef, ViewRef} from '@angular/core';
import { DatePipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { NgZone } from '@angular/core';
import { TaskBarBox } from '../task-bar-box/task-bar-box';
import { ɵEmptyOutletComponent } from "@angular/router";
import { StartMenu } from '../start-menu/start-menu';
import { elementAt, map } from 'rxjs';


@Component({
  selector: 'app-taskbar',
  imports: [CommonModule, TaskBarBox, ɵEmptyOutletComponent,StartMenu],
  templateUrl: './taskbar.html',
  styleUrl: './taskbar.css',
  providers: [DatePipe]
})
export class Taskbar{
  

  @Output() toDesktop = new EventEmitter<{appTitle:string}>();

  tasksListMap : Map<string,number> = new Map<string,number>();
  taskList:string[] =[]
  taskTracerList:taskTracker[] = [];
  CurrentDate = new Date()
  interval = 0;
  
  vrc = viewChild('tasks',{read:ViewContainerRef});
  taskbarVisible = false;
  
  appRef = inject(ApplicationRef);

  #taskListRef?:ComponentRef<TaskBarBox>;
  
  constructor(private ngZone: NgZone){
  }
  
  ngOnInit(){
      //this date time simply refuses to update
       this.interval = setInterval(() => {
        this.ngZone.run(() => {
          this.CurrentDate = new Date();
          //console.log(this.CurrentDate)
      });
      }, 1000);
    }
    
  updateCurrentDate(){
    setInterval(() =>{this.CurrentDate = new Date();},1000);
  }

  OnMousePressDown(element:HTMLElement){
    this.taskbarVisible = !this.taskbarVisible;
  }

  OnAppendToTaskBar(iconPath:string = "",apptitle:string = "Default"){

    if(!this.checkTaskBar(apptitle)){
      return;
    }

    let task = this.vrc()?.createComponent(TaskBarBox);
    task?.setInput('iconPath',iconPath);
    task?.setInput('appTitle',apptitle);
    console.log(task?.instance.appTitle);
  
    task?.instance.moveToDesktop.subscribe(() => {this.toDesktop.emit( {appTitle: (task?.instance.appTitle) as string}); this.removeFromtaskBar((task?.instance.appTitle) as string)});
    task?.instance.terminate.subscribe(() => { this.removeFromtaskBar((task?.instance.appTitle) as string)});
    this.taskList?.push(apptitle);
    
    this.taskTracerList?.push({appID:apptitle,app:task});

  }
  
  OnMoveToDesktop(data:{apptitle:string}){
    this.toDesktop.emit({appTitle:data.apptitle})
  }
  
  removeFromtaskBar(appTitle:string){
   
    let indexToRemove = 0;
    
    for(let index = 0 ; index < this.taskTracerList.length;index++){
      let element = this.taskTracerList.at(index);

      if(element?.appID == appTitle){
        element?.app?.destroy();
        break;
      }else{
        indexToRemove++;
      }
    }
    
    this.taskTracerList.splice(indexToRemove,1);

  }

  checkTaskBar(appTitle:string):boolean{
    
    if(this.taskTracerList.find((element) => element.appID == appTitle)){
      return false;
    }

    return true;
}
}

type taskTracker = { appID: string; app: ComponentRef<TaskBarBox> | undefined};

