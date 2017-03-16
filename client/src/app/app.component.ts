import { Component, HostListener } from '@angular/core';
import { Peoples } from './shared/peoples';
import { Database } from './shared/database';


@Component({
    
  moduleId: module.id,
  selector: 'app',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']

})



export class AppComponent  { 
    
    private data: Peoples[] = Database;
    private tableConf: string[] = Object.keys(this.data[0]);
    private steps: number = this.data.length;
    private editable: boolean = false;
    private prevElement;
    private parent;
    
 
    //------------------------------------------------------------------------------
    focus(event):void{
      
        let element: HTMLCollectionOf<Element>  = document.getElementsByClassName('focused');
        
        if (this.editable && event.target.localName != 'input'){
            this.stopModify(false);
        }
      
      if (element.length){
        
          for (let item of element){
              item.className = '';
          }
      }

      if(event.target.nodeName === "TD" && event.target.className !='identificator'){
          event.target.className = 'focused';  
      } 
      
    }
   //------------------------------------------------------------------------------- 
    @HostListener('document:keyup', ['$event'])
    
    movement(event: KeyboardEvent){
      
        let focused: HTMLCollectionOf<Element> = document.getElementsByClassName('focused');
        let key: number = event.keyCode;
        let numberOfTd: number = this.steps * (this.tableConf.length -1);
        const AllowdKeys: number[] = [13,27,37,38,39,40];
        let keyFilter:number = AllowdKeys.indexOf(key);
        let currentPosition: number;
        let column:number;
        
        if (this.editable && key == 13){
            
             this.stopModify(true);
             return;
          
         }
         if (this.editable && key == 27){
          
             this.stopModify(false);
             return;
          
         }
        
         if(!focused.length || keyFilter == -1) {return;}
         currentPosition = +focused[0].attributes[1].nodeValue;
        
        

         switch(key) {
         case 13: this.modify(focused[0],event);
            break;
         case 37: dirrection(currentPosition - this.steps);
            break;
         case 38: dirrection(currentPosition - 1);
            break;
         case 39: dirrection(currentPosition + this.steps);
            break;
         case 40: dirrection(currentPosition +1);
            break;
         }

         function dirrection(move):void{
              
             if(move > numberOfTd || move < 1) {return};

             let nextPosition = document.getElementsByName(move);
             focused[0].className = '';
             nextPosition[0].className = 'focused'
         }
         
    }
    //----------------------------------------------------------------------------
    modify(event:any, keyEvent = undefined){
      
      let content;
      let element;

      if ( this.editable && event.type == 'dblclick' ) {
        return;
      } 

      if(event.type == 'dblclick'){
        
        this.prevElement = event.target;
        this.parent = event.target.parentNode;
        content = event.target.innerHTML;
        
      } else if(keyEvent.keyCode == 13){
       
        this. prevElement = event;
        this.parent = event.parentNode;
        content = event.innerText;
      } 

      element = document.createElement('input');
      element.type = 'text';
      element.width =  this.prevElement.clientWidth;
      element.height =  this.prevElement.clientHeight;
      element.setAttribute('value', content);
      element.setAttribute('autofocus','');
      element.setAttribute('id','editable');
      
      
      this.parent.replaceChild(element, this.prevElement);
      this.editable = true;

      
    }
    stopModify(hint){
        
         
        let element = document.getElementById('editable');
          
        if ( hint ){
            this.prevElement.innerText = element.value;
        }

        this.parent.replaceChild(this.prevElement, element);
        this.editable = false;
    }
  }
    

