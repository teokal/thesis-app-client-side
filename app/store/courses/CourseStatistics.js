/**
 *  Created by n.vasileiadis on 01.11.17
 */

Ext.define('LearningAnalytics.store.courses.CourseStatistics', {
    extend: 'Ext.data.Store',

    storeId: 'CourseStatistics',

    alias: 'store.courseStatistics',

    model: 'LearningAnalytics.model.courses.CourseStatistic',

    // autoLoad: true,

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
            read: '/api/1/courses/logs'
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
