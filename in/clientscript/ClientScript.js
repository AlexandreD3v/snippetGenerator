/**
 * @NApiVersion 2.0
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
define([], function() {

    function pageInit(context) {
      // Called when the page is initialized
    }
  
    function validateField(context) {
      // Called when a field is validated
    }
  
    function fieldChanged(context) {
      // Called when a field is changed
    }
  
    function postSourcing(context) {
      // Called after a field is sourced from a server response
    }
  
    function lineInit(context) {
      // Called when a new line is added to a sublist
    }
  
    function validateLine(context) {
      // Called when a sublist line is validated
    }
  
    function sublistChanged(context) {
      // Called when a sublist field is changed
    }
  
    function saveRecord(context) {
      // Called when a record is saved
    }
  
    return {
      pageInit: pageInit,
      validateField: validateField,
      fieldChanged: fieldChanged,
      postSourcing: postSourcing,
      lineInit: lineInit,
      validateLine: validateLine,
      sublistChanged: sublistChanged,
      saveRecord: saveRecord
    };
  });
  