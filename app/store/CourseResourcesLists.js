/**
 * Created by n.vasileiadis on 8/19/2017.
 */
Ext.define('Thesis.Manager.store.CourseResourcesLists', {
    extend: 'Ext.data.Store',

    alias: 'store.courseResourcesLists',

    model: 'Thesis.Manager.model.CourseResourceList',

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
            read: Thesis.Manager.GlobalVar.urlData + '/api/1/user/courses/modules/resources'
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