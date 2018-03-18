/**
 *  Created by n.vasileiadis on 15.03.18
 */

Ext.define('LearningAnalytics.model.courses.CourseRiskAnalysisUsers', {
    extend: 'LearningAnalytics.model.Base',

    fields: [
        { name: 'id', type: 'int'},
        { name: 'name', type: 'string' }
    ],

    hasMany: [
        {
            model: 'LearningAnalytics.model.courses.CourseRiskAnalysisUsersAnalysis',
            name: 'analysis',
            associationKey: 'analysis'
        }
    ]


});
