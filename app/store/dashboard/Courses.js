Ext.define('LearningAnalytics.store.dashboard.Courses', {
    extend: 'Ext.data.Store',

    storeId: 'Courses',

    alias: 'store.courses',

    model: 'LearningAnalytics.model.dashboard.Course',

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
            read: '/api/1/courses'
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
