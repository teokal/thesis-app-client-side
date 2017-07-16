/**
 * Created by n.vasileiadis on 6/21/2017.
 */
Ext.define('Thesis.Manager.store.DataTests', {
    extend: 'Ext.data.Store',

    alias: 'store.dataTests',

    model: 'Thesis.Manager.model.DataTest',

    requires: [
        'Thesis.Manager.GlobalVar'
    ],

    viewModel: {
        type: 'dataModel'
    },

    autoLoad: false,

    proxy: {
        type: 'ajax',
        actionMethods: {
            read: 'GET'
        },
        useDefaultXhrHeader: false,
        cors: true,
        headers: {
            'Authorization': 'Token token=' + Thesis.Manager.GlobalVar.token
        },
        url: Thesis.Manager.GlobalVar.urlData,
        api: {
            read: Thesis.Manager.GlobalVar.urlData +'/api/1/user/courses'
        },
        writer: {
            type: 'json',
            allowSingle: true,
            writeAllFields: true
        },
        reader: {
            type: 'json',
            rootProperty: 'response.data'
        }
    }

});
