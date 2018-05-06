Ext.define('LearningAnalytics.store.courses.CourseActivities', {
    extend: 'Ext.data.Store',

    storeId: 'CourseActivities',

    alias: 'store.courseActivities',

    model: 'LearningAnalytics.model.courses.CourseActivity',

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
            read: '/api/1/courses/activities'
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
