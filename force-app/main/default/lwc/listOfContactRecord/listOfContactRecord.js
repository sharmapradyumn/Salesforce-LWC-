import { LightningElement,api,track,wire} from 'lwc';
import getConList from '@salesforce/apex/contactList.getConList';
const columns = [
    { label: 'First Name', fieldName: 'FirstName' },
    { label: 'Last Name', fieldName: 'LastName' },
    { label: 'Title', fieldName: 'Title' },
    { label: 'Phone', fieldName: 'Phone', type: 'phone' },
    { label: 'Email', fieldName: 'Email', type: 'email' }
];

export default class ListOfContactRecord extends LightningElement {
    error;
    columns = columns;
    @track contactlist;
    @track contactssize;
     @wire(getConList)
     contacts({error, data}){
if(data){
this.contactlist=data;
this.contactssize=data.length;
//console.log(contactlist);
}else if(error){
this.error=error;
console.log(error);
}

     }

    


}