/**
 *  Created by n.vasileiadis on 25.02.18
 */

Ext.define('LearningAnalytics.store.courses.CourseRiskAnalysis', {
    extend: 'Ext.data.Store',

    storeId: 'CourseRiskAnalysis',

    alias: 'store.courseRiskAnalysis',

    model: 'LearningAnalytics.model.courses.CourseRiskAnalysisModel',

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
            read: '/api/1/courses/risk_analysis'
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
