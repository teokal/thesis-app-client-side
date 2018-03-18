/**
 *  Created by n.vasileiadis on 25.02.18
 */

Ext.define('LearningAnalytics.model.courses.CourseRiskAnalysisModel', {
    extend: 'LearningAnalytics.model.Base',

    fields: [
    ],

    hasMany: [
        {
            model: 'LearningAnalytics.model.courses.CourseRiskAnalysisScorms',
            name: 'scorms',
            associationKey: 'scorms'
        },
        {
            model: 'LearningAnalytics.model.courses.CourseRiskAnalysisUsers',
            name: 'users',
            associationKey: 'users'
        }
    ]

});
