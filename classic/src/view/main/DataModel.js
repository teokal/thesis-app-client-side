/**
 * Created by n.vasileiadis on 6/27/2017.
 */
Ext.define('EW20.view.DataModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.dataModel',
    stores: {
        dataTests: {
            type: 'dataTests'
        }
    },
    data: {
        rec: null
    }
});