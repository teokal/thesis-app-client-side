/**
 *  Created by n.vasileiadis on 05.10.17
 */

Ext.define('LearningAnalytics.store.dashboard.ViewAndStudents', {
    extend: 'Ext.data.Store',

    storeId: 'ViewStudents',

    alias: 'store.viewStudents',

    model: 'LearningAnalytics.model.dashboard.ViewAndStudent',

    autoLoad: true,

    proxy: {
        type: 'ajax',
        actionMethods: {
            read: 'GET'
        },
        useDefaultXhrHeader: false,
        cors: true,
        headers: {
            'Authorization': ''
        },
        api: {
            read: '/api/1/dashboard?userid=51'
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
