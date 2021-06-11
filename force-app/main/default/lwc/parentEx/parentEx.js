import { LightningElement, api } from 'lwc';

export default class ParentEx extends LightningElement {
    passBday(event){
        console.log(event.target.value);
        this.template.querySelector('c-child-ex').handleBday(event.target.value);
        
        
    }
}