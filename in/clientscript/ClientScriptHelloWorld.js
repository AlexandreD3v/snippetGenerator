/**
 * @NApiVersion 2.0
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
define([], function () {
    function pageInit(context) {
        // Display "Hello World!" in an alert dialog when the page loads
        alert("Hello World!");
    }

    return {
        pageInit: pageInit
    };
});
