Ext.define('LearningAnalytics.store.courses.CourseCategoriesGraph', {
    extend: 'Ext.data.Store',

    storeId: 'CourseCategoriesGraph',

    alias: 'store.courseCategoriesGraph',

    model: 'LearningAnalytics.model.courses.CourseCategoriesGraph',

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
            read: '/api/1/courses/custom_categories_graph'
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
