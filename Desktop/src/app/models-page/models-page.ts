import { Component, EventEmitter, Input,Output,output,SimpleChanges} from '@angular/core';
import { ModelRenderer } from '../model-renderer/model-renderer';

@Component({
  selector: 'app-models-page',
  imports: [ModelRenderer],
  templateUrl: './models-page.html',
  styleUrl: './models-page.css',
})
export class ModelsPage {
  @Input() contentWIdth = 100;
  @Input() contentHeight = 100;

  @Input() signal: boolean = false;

  load = false;

  renderers = new Array<ModelRenderer>;
  ngOnChanges(changes: SimpleChanges) {
    if (changes['signal'] && changes['signal'].currentValue) {
      this.loadModles();
    }
  }
  loadModles() {
     this.load = true;
     this.renderers.forEach(element =>{element.OnUnloadModel()});
     setTimeout(() => this.load = false, 100);
   }  
   
   OnClearModels(data:{renderer:ModelRenderer}){    
    
    if(!this.renderers.includes(data.renderer)){
      this.renderers.push(data.renderer);
    }

    this.renderers.forEach(element =>{element.OnUnloadModel()});

   }
}
