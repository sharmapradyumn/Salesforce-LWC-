public with sharing class accountList {
    public accountList() {

    }
    @AuraEnabled(cacheable=true)
    public static list<Account> getAccList() {
      return[SELECT id,Name FROM Account ORDER BY Name];
    
    }

  
         
    
}



//(cacheable=true)