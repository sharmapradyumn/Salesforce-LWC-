import { LightningElement, track,api,wire} from 'lwc';
import Opportunity_OBJECT from '@salesforce/schema/Opportunity';
import NAME_FIELD from '@salesforce/schema/Opportunity.Name';
import STAGE_FIELD from '@salesforce/schema/Opportunity.StageName';
import CLOSEDATE_FIELD from '@salesforce/schema/Opportunity.CloseDate';
import ACCOUNT_ID from '@salesforce/schema/Opportunity.AccountId';
import createOpportunity from '@salesforce/apex/createOpp.createOpportunity';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class OpportunityFormManualy extends LightningElement {
    @track opportunityId;
    @track error;
    @track oppRec = {
     Name:NAME_FIELD,
     StageName:STAGE_FIELD,
     CloseDate:CLOSEDATE_FIELD,
     AccountId:ACCOUNT_ID
    };

    @wire(getObjectInfo, { objectApiName: Opportunity_OBJECT })
    oppInfo;


    @wire(getPicklistValues,
        {
            recordTypeId:  '$oppInfo.data.defaultRecordTypeId', //pass id dynamically
            fieldApiName: STAGE_FIELD
        }
    ) 
    stageValues;

    
  

  
    handleNameChange(event) {
        this.oppRec.Name = event.target.value;
        //console.log("name1", this.oppRec.Name);
    }
   
    handleStageChange() {
        var selectElement = this.template.querySelector('lightning-combobox');
        this.oppRec.StageName = selectElement.value;
        //console.log("Stage", this.oppRec.StageName);
    }
    
    handleCloseDateChange(event) {
        this.oppRec.CloseDate = event.target.value;
        //console.log("Close Date",this.oppRec.CloseDate);
    }
    
    handleSaveOpportunity() {
       
        createOpportunity({oppObj:this.oppRec})

        .then(result => {
                this.oppRec={};
                this.opportunityId=result.Id;
                window.console.log(this.opportunityId);
                   const toastEvent = new ShowToastEvent({
                        title: 'Success',
                        message: 'Opportunity created',
                        variant: 'success',
                    });
              this.dispatchEvent(toastEvent);
            
            
            //console.log(opportunityId);
            //console.log("result", this.message);
        })
        .catch(error => {
            this.error=error.message;
            
        });
}

handleAccountSelection(event){
    console.log("the selected record id is"+event.detail);
    this.oppRec.AccountId=event.detail;
}


}




















/* saveRecord(){
        var inputBox1 = this.template.querySelectorAll("lightning-input");
        //console.log( inputBox1[0].value);
        //console.log( inputBox1[1].value);
        for (let index = 0; index < inputBox1.length; index++) {
            console.log(inputBox1[index ].value);
        }
        var inputBox2 = this.template.querySelector("select");
        console.log(inputBox2.value);
    }*/