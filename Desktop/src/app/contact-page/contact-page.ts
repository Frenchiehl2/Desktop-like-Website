import { Component } from '@angular/core';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { interval } from 'rxjs';

@Component({
  selector: 'app-contact-page',
  imports: [ClipboardModule],
  templateUrl: './contact-page.html',
  styleUrl: './contact-page.css',
})
export class ContactPage {


   userEmail = 'frenchiehl2@gmail.com';
   displayedCopyText = false;

  onCopied(link:HTMLElement) {
    if(!this.displayedCopyText){
      let element = document.createElement('p');
      element.style ="margin-left:20px;padding-top:5px;"
      element.innerHTML = "Coped!"
      link.appendChild(element)
      this.displayedCopyText = true;

      interval(1500).subscribe(() =>{ if(!this.displayedCopyText){return;};link.removeChild(element); this.displayedCopyText = false});
    }
  }
  
}
