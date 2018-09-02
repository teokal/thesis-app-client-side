Ext.define('LearningAnalytics.store.courses.CourseParameters', {
    extend: 'Ext.data.Store',

    storeId: 'CourseParameters',

    alias: 'store.courseParameters',

    model: 'LearningAnalytics.model.courses.CourseParameter',

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
            read: '/api/1/courses/categories_parameters'
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
