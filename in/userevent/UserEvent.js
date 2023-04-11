/**
* @NApiVersion 2.x
* @NScriptType UserEventScript
* @NModuleScope SameAccount
*/

define(['N/record'], function(record) {

    function beforeLoad(context) {
      // Called before record is loaded.
    }
  
    function beforeSubmit(context) {
      // Called before record is submitted to the system.
    }
  
    function afterSubmit(context) {
      // Called after record is submitted to the system.
    }
  
    return {
      beforeLoad: beforeLoad,
      beforeSubmit: beforeSubmit,
      afterSubmit: afterSubmit
    };
  });
  