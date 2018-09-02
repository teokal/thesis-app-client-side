/**
 *  Created by n.vasileiadis on 15.03.18
 */

Ext.define('LearningAnalytics.model.courses.CourseRiskAnalysisUsersAnalysis', {
    extend: 'LearningAnalytics.model.Base',

    fields: [
        { name: 'id', type: 'int'},
        { name: 'value', type: 'boolean'}
    ]
});
