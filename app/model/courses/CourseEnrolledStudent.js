/**
 *  Created by n.vasileiadis on 31.10.17
 */

Ext.define('LearningAnalytics.model.courses.CourseEnrolledStudent', {
    extend: 'LearningAnalytics.model.Base',

    fields: [
        { name: 'id', type: 'int' },
        { name: 'fullname', type: 'string' }
    ]
});
