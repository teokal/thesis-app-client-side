/**
 *  Created by n.vasileiadis on 24.03.18
 */

Ext.define('LearningAnalytics.store.courses.CourseRiskAnalysisResults', {
    extend: 'Ext.data.Store',

    storeId: 'CourseRiskAnalysisResults',

    alias: 'store.courseRiskAnalysisResults',

    constructor: function (config) {
        config = config || {};

        this.callParent([config]);
    },

    addData: function (data) {
        this.loadRawData(data);
    }
});
