/**
 * Created by n.vasileiadis on 6/27/2017.
 */
Ext.define('Thesis.Manager.view.main.TestExample.DataModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.dataModel',
    stores: {
        dataTests: {
            type: 'dataTests'
        },
        courseActions: {
            type: 'courseActions'
        }

    },
    data: {
        readOnly: false,
        recs: null,
        list: null,
        filterText: '',
        nestedList: null
    }
});