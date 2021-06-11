import { api,LightningElement, wire,track} from 'lwc';
import getAccList from '@salesforce/apex/accountList.getAccList';
const Columns = [{
    label: 'Name',
    fieldName: 'Name'
}
];
export default class ListOfAccountRecord extends LightningElement {

    @api objName;
    @api iconName;
    @api filter = '';
    @api searchPlaceholder='Search';

    @track selectedName;
    @track records;
    @track isValueSelected;
    @track blurTimeout;

    @track searchedAccountData = [];
    @track accountAllData = [];
    @track searchString='';
    accountColumns = Columns;

    @track boxClass = 'slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click slds-has-focus';
    @track inputClass = '';
    

    
    connectedCallback() {
        getAccList()
        .then((result)=>{
            this.accountAllData = result;
            
        })
        .catch((error)=>{
            console.log('Error' + error);
        })
    }
    Searchhandler(event){
        var searchString =event.target.value.toUpperCase();
        var allRecords =   this.accountAllData;
        var searchResults =[];
       
    
        for(let i=0; i<allRecords.length; i++){
           if((allRecords[i].Name) && (allRecords[i].Name.toUpperCase().includes(searchString))){
                searchResults.push(allRecords[i]);
            }
           
            
        }
        this.searchedAccountData = searchResults;
    }


    handleClick() {
        this.searchTerm ='';
        this.inputClass = 'slds-has-focus';
        this.boxClass = 'slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click slds-has-focus slds-is-open';
    }
    onBlur() {
        this.blurTimeout = setTimeout(() =>  {this.boxClass = 'slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click slds-has-focus'}, 300);
    }
    onSelect(event) {
        let selectedId = event.currentTarget.dataset.id;
        let selectedName = event.currentTarget.dataset.name;
        const valueSelectedEvent = new CustomEvent('lookupselected', {detail:  selectedId });
        console.log(selectedId);
        this.dispatchEvent(valueSelectedEvent);
        this.isValueSelected = true;
        this.selectedName = selectedName;
        if(this.blurTimeout) {
            clearTimeout(this.blurTimeout);
        }
        this.boxClass = 'slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click slds-has-focus';
        this.searchedAccountData=[];
    }

    handleRemovePill() {
        this.isValueSelected = false;
        this.searchedAccountData=[];
    }

    onChange(event) {
        this.searchTerm = event.target.value;
    }

 
    

}