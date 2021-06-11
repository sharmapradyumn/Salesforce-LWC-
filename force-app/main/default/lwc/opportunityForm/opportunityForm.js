import { LightningElement } from 'lwc';

export default class OpportunityForm extends LightningElement {



    saveRecord(){
        var inputBox1 = this.template.querySelectorAll("lightning-input-field");
        //console.log( inputBox1[0].value);
        //console.log( inputBox1[1].value);
        for (let index = 0; index < inputBox1.length; index++) {
            console.log(inputBox1[index ].value);
        }

          
    }



}