import { Component, EventEmitter, Output, output, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OS } from './os/os';
import { Icon } from "./icon/icon";
import { Taskbar } from "./taskbar/taskbar";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, OS, Icon, Taskbar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  


  protected readonly title = signal('Frenchies Portfolio');

  addToTaskBar(element:Taskbar, data: { appIconPath: string; appTitle: string }){

    element.OnAppendToTaskBar(data.appIconPath,data.appTitle);
  }

  addToDesktop(element:OS ,data:{appTitle:string}){
    element.addToDesktop(data.appTitle)
  }

  removeFromtaskBar(element:Taskbar,data:{appTitle:string}){
    element. removeFromtaskBar(data.appTitle);
  }
}
