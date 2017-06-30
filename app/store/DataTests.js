/**
 * Created by n.vasileiadis on 6/21/2017.
 */
Ext.define('Thesis.Manager.store.DataTests', {
    extend: 'Ext.data.Store',

    alias: 'store.dataTests',

    model: 'Thesis.Manager.model.DataTest',

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
        url: 'http:\/\/83.212.105.139:3000',
        api: {
            read: 'http:\/\/83.212.105.139:3000/api/1/test'
        },
        writer: {
            type: 'json',
            allowSingle: true,
            writeAllFields: true
        },
        reader: {
            type: 'json',
            rootProperty: 'response'
        }
    }

});
