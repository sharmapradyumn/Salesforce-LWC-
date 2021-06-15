public with sharing class contactList {
    public contactList() {

    }

    @AuraEnabled
    public static list<Contact> getConList() {
    return[SELECT Id, FirstName, LastName, Title, Phone, Email, AccountId, Account.Name FROM Contact ORDER BY Name];
    
    }

    @AuraEnabled
    public static void deleteContacts(list<Id> lstConIds){
        try {
            list<Contact> lstConsToDelete = new list<Contact>();
            System.debug('lstConIds ====> '+lstConIds);
            for(Id idCon : lstConIds) {
                lstConsToDelete.add(new Contact(Id = idCon));
            }
            if(!lstConsToDelete.isEmpty()) {
                delete lstConsToDelete;
            }
        }
        catch(Exception ex) {
            throw new AuraHandledException(ex.getMessage());
        }
    }
}
