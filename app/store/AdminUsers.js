/**
 * Created by n.vasileiadis on 8/13/2017.
 */

Ext.define('Thesis.Manager.store.AdminUsers', {
    extend: 'Ext.data.Store',

    alias: 'store.adminUsers',

    model: 'Thesis.Manager.model.AdminUser',

    requires: [
        'Thesis.Manager.GlobalVar'
    ],

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
            read: Thesis.Manager.GlobalVar.urlData + '/api/1/admin/users/logs'
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