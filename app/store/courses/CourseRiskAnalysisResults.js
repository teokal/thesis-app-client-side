/**
 *  Created by n.vasileiadis on 24.03.18
 */

Ext.define('LearningAnalytics.store.courses.CourseRiskAnalysisResults', {
    extend: 'Ext.data.Store',

    storeId: 'CourseRiskAnalysisResults',

    alias: 'store.courseRiskAnalysisResults',

    model: 'LearningAnalytics.model.courses.CourseRiskAnalysisResult',

    // autoLoad: true,

    proxy: {
        type: 'ajax',
        actionMethods: {
            read: 'POST'
        },
        useDefaultXhrHeader: false,
        cors: true,
        headers: {
            'Authorization': ''
        },
        api: {
            read: '/api/1/courses/risk_analysis_transform'
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
