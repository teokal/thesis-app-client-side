/**
 *  Created by n.vasileiadis on 11.02.18
 */

Ext.define('LearningAnalytics.model.courses.CourseContentsData', {
    extend: 'LearningAnalytics.model.Base',

    fields: [
        { name: 'id', type: 'int' },
        { name: 'name', type: 'string'},
        { name: 'visible', type: 'int' },
        { name: 'summary', type: 'string' },
        { name: 'summaryformat', type: 'int' }
    ]
});
