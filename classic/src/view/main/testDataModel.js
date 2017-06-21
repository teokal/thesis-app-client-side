/**
 * Created by n.vasileiadis on 6/21/2017.
 */
Ext.define('EW20.view.testDataModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.testDataModel',

    stores: {
        dataTest: {
            type: 'dataTest'
        }
    },

    data: {
        rec: null
    }
});