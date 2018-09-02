Ext.define('LearningAnalytics.store.courses.CourseModules', {
    extend: 'Ext.data.Store',

    storeId: 'CourseModules',

    alias: 'store.courseModules',

    model: 'LearningAnalytics.model.courses.CourseModule',

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
            read: '/api/1/courses/modules'
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
