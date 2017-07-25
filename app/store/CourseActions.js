/**
 * Created by n.vasileiadis on 7/25/2017.
 */

Ext.define('Thesis.Manager.store.CourseActions', {
    extend: 'Ext.data.Store',

    alias: 'store.courseActions',

    model: 'Thesis.Manager.model.CourseAction',

    requires: [
        'Thesis.Manager.GlobalVar'
    ],

    viewModel: {
        type: 'CourseActionModel'
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
            read: Thesis.Manager.GlobalVar.urlData + '/api/1/user/courses/logs'
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