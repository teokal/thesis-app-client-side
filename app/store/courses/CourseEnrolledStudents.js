/**
 *  Created by n.vasileiadis on 31.10.17
 */

Ext.define('LearningAnalytics.store.courses.CourseEnrolledStudents', {
    extend: 'Ext.data.Store',

    storeId: 'CourseEnrolledStudents',

    alias: 'store.courseEnrolledStudents',

    model: 'LearningAnalytics.model.courses.CourseEnrolledStudent',

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
            read: '/api/1/courses/enrolled_users'
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
