import { LightningElement,api,track,wire} from 'lwc';
import getConList from '@salesforce/apex/contactList.getConList';
const columns = [
    { label: 'First Name', fieldName: 'FirstName' },
    { label: 'Last Name', fieldName: 'URL', wrapText: true, type: 'url',  sortable: "true",
    typeAttributes: {
        label: { 
            fieldName: 'LastName' 
        },
        target : '_blank'
    } },
    { label: 'Title', fieldName: 'Title' },
    { label: 'Phone', fieldName: 'Phone', type: 'phone' },
    { label: 'Email', fieldName: 'Email', type: 'email' },
    { label: 'Account Name', fieldName: 'AccountURL', wrapText: true, type: 'url',  sortable: "true",
    typeAttributes: {
        label: { 
            fieldName: 'AccountName' 
        },
        target : '_blank'
    } }
    
];

export default class ListOfContactRecord extends LightningElement {
    error;
    columns = columns;
    @track contactlist;
    @track contactssize;
    // @wire(getConList)


connectedCallback(){

    this.getContactDetails();
}


getContactDetails(){
    getConList()
    .then(data => {
        /* Iterate with Each record and check if the Case is Associated with Account or Contact
            then get the Name and display into datatable
        */
        /* Prepare the Org Host */
        let baseUrl = 'https://enterprise-enterprise-9417-dev-ed.lightning.force.com/';
        //console.log(location.host);
        //console.log(baseUrl);
        data.forEach(accRec => {
            //accRec.Url = '/'+accRec.Id;
            accRec.URL = baseUrl+accRec.Id;
           
            if(accRec.AccountId){

                accRec.AccountName=accRec.Account.Name;
                accRec.AccountURL = baseUrl+accRec.AccountId;
               
            }

          
        });
        
        
        this.contactlist=data;
        this.contactssize=data.length;
        this.error = undefined;
    })
    .catch(error => {
        this.error = error;
        window.console.log(' error ', error);
        this.result = undefined;
    });
     



     
    }
    


}
/*if(data){
data.forEach(accRec => {
    console.log(accRec.AccountId);
    if(accRec.AccountId){
        accRec.AccountName=accRec.Account.Name;
    }
    
});
this.contactlist=data;
this.contactssize=data.length;*/