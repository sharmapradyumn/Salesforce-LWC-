public with sharing class createOpp {
    public createOpp() {

    }
  
        @AuraEnabled
        public static Opportunity createOpportunity(Opportunity oppObj) {
            system.debug('acc'+oppObj);
            insert oppObj;
            return oppObj;
        }
        
}
