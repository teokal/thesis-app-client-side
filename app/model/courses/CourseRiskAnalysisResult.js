/**
 *  Created by n.vasileiadis on 24.03.18
 */

Ext.define('LearningAnalytics.model.courses.CourseRiskAnalysisResult', {
    extend: 'LearningAnalytics.model.Base',

    fields: [
        { name: 'id', type: 'int' },
        { name: 'name', type: 'string' },
        { name: 'status', type: 'boolean' }
    ]


});
