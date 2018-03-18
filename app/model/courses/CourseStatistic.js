/**
 *  Created by n.vasileiadis on 01.11.17
 */

Ext.define('LearningAnalytics.model.courses.CourseStatistic', {
    extend: 'LearningAnalytics.model.Base',

    fields: [
        { name: 'date', type: 'string' },
        { name: 'quiz', type: 'string' },
        { name: 'viewed', type: 'string' },
        { name: 'enrol', type: 'string' },
        { name: 'unenrol', type: 'string' }
    ]
});
