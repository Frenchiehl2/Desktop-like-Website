import { Component,Output,EventEmitter } from '@angular/core';
import { Icon } from '../icon/icon';
import { CdkDrag } from '@angular/cdk/drag-drop';
import { ContentWindow} from '../window/window';
import { ContactPage } from '../contact-page/contact-page';
import { ProjectsPage } from '../projects-page/projects-page';
import { ModelsPage } from '../models-page/models-page';
import { AmoutMePage } from '../amout-me-page/amout-me-page';
import { Taskbar } from '../taskbar/taskbar';
import { HelpPage } from '../help-page/help-page';

@Component({
  selector: 'app-os',
  imports: [Icon, CdkDrag, ContentWindow,ContactPage,ProjectsPage,ModelsPage,ContactPage,AmoutMePage,Taskbar,HelpPage],
  templateUrl: './os.html',
  styleUrl: './os.css',
})
export class OS {

   @Output() snedItemToTaskbar = new EventEmitter<{ appIconPath: string; appTitle: string }>();
   @Output() removeFromTaskbar = new EventEmitter<{appTitle:string}>();

  aboutMeWindowVisible = false;
  projectsWindowVisible = false;
  modelsWidnowVisible = false;
  contactsWindowVisible = false;
  helpWindowVisible = false;

  aboutMeWindowMinimized = false;
  projectsWindowMinimized = false;
  modelsWidnowMinimized = false;
  contactsWindowMinimized = false;
  helpWindowMinimized = false;



  OnWindowClose(element:ContentWindow){
    switch(element.appTitle){
      case "About Me":
          this.aboutMeWindowVisible = false;
        break;
      case "Projects":
          this.projectsWindowVisible = false;
        break; 
       case "Models":
          this.modelsWidnowVisible = false;
        break;
        case "Contact":
          this.contactsWindowVisible = false;
        break;
        case "Help":
          this.helpWindowVisible = false;
          break;
        }
  }

   OnWindowOpen(element:Icon){
    switch(element.Title){
      case "About":
          console.log("Open about me");
          this.aboutMeWindowVisible = true;
        break;
      case "Projects":
          this.projectsWindowVisible = true;
        break;
        case "Models":
          this.modelsWidnowVisible = true;
        break;
       case "Contact":
          this.contactsWindowVisible = true;
        break;
         case "Help":
          this.helpWindowVisible = true;
          break;   
      }
  }

  handleSendingToTaskbar(data: { appIconPath: string; appTitle: string }){
    console.log("signal to add to taskbar");


    this.snedItemToTaskbar.emit({appIconPath :data.appIconPath , appTitle: data.appTitle});
  }

  addToDesktop(appTitle:string){
  
    switch(appTitle){
      case "About Me":
           this.aboutMeWindowVisible = true;
           this.aboutMeWindowMinimized = false;
        break;
      case "Projects":
           this.projectsWindowVisible = true;
           this.projectsWindowMinimized = false;
        break;
        case "Models":
            this.modelsWidnowVisible = true;
            this.modelsWidnowMinimized = false;
        break;
       case "Contact":
            this.contactsWindowVisible = true;
            this.contactsWindowMinimized = false;
        break;
         case "Help":
            this.helpWindowVisible = true;
            this.helpWindowMinimized = false;
        break;
    }
  }

  Onactivate(element:HTMLElement){
    element.focus();
  }

  OnGameworksOpen(){
    let win = window.open('https://bitegameworks.com/', '_blank')!;
    win.opener  = null;
    win.focus();
  }
}
