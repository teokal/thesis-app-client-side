/**
 * Created by n.vasileiadis on 7/29/2017.
 */
Ext.define('Thesis.Manager.store.Courses', {
    extend: 'Ext.data.Store',

    alias: 'store.courses',

    model: 'Thesis.Manager.model.Course',

    requires: [
        'Thesis.Manager.GlobalVar'
    ],

    viewModel: {
        type: 'courseModel'
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
