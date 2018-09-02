/**
 *  Created by n.vasileiadis on 25.03.18
 */

Ext.define('LearningAnalytics.store.courses.CourseRiskAnalysisSummary', {
    extend: 'Ext.data.Store',

    storeId: 'CourseRiskAnalysisSummary',

    alias: 'store.courseRiskAnalysisSummary',

    constructor: function (config) {
        config = config || {};

        this.callParent([config]);
    },

    addData: function (data) {
        this.loadRawData(data);
    }

});

