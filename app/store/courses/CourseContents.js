/**
 *  Created by n.vasileiadis on 11.02.18
 */

Ext.define('LearningAnalytics.store.courses.CourseContents', {
    extend: 'Ext.data.Store',

    storeId: 'CourseContents',

    alias: 'store.courseContents',

    model: 'LearningAnalytics.model.courses.CourseContent',

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
            read: '/api/1/courses/contents'
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
