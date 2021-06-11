public with sharing class contactList {
    public contactList() {

    }

    @AuraEnabled(cacheable=true)
    public static list<Contact> getConList() {
      return[SELECT Id, FirstName, LastName, Title, Phone, Email FROM Contact ORDER BY Name];
    
    }
}
