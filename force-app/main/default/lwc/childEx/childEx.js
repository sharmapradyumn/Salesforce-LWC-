import { LightningElement, api, track } from 'lwc';

export default class ChildEx extends LightningElement {
    @track greetings;
    @api
    handleBday(bdayDate){
        this.greetings = 'Hey There Your Bday On ' + bdayDate;
        console.log(this.greetings);
    }
}