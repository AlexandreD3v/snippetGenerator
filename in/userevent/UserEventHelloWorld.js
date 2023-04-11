/**
* @NApiVersion 2.x
* @NScriptType UserEventScript
* @NModuleScope SameAccount
*/

define(['N/ui/message'], function (message) {

    function beforeLoad(context) {
        if (context.type === context.UserEventType.VIEW) {
            var msg = message.create({
                title: 'Hello World',
                message: 'This is a UserEvent script!',
                type: message.Type.CONFIRMATION
            });
            msg.show();
        }
    }

    return {
        beforeLoad: beforeLoad
    };
});
