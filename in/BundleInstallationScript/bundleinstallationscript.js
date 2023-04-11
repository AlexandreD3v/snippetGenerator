/**
*@NApiVersion 2.0
*@NScriptType BundleInstallationScript
*/
define([], function () {

    function checkPrerequisites() {
        $0if(!runtime.isFeatureInEffect({ feature: 'TIMEOFFMANAGEMENT' }))
        throw 'The TIMEOFFMANAGEMENT feature must be enabled. Please enable the feature and try again.';
    }

    function beforeInstall(params) {
        checkPrerequisites();
    }

    function beforeUpdate(params) {
        checkPrerequisites();
    }

    return {
        beforeInstall: beforeInstall,
        beforeUpdate: beforeUpdate
    }
});
