Ext.define('LearningAnalytics.store.courses.CourseCategories', {
    extend: 'Ext.data.Store',

    storeId: 'CourseCategories',

    alias: 'store.courseCategories',

    model: 'LearningAnalytics.model.courses.CourseCategory',

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
            read: '/api/1/courses/categories'
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
