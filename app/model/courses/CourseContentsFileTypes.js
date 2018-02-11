/**
 *  Created by n.vasileiadis on 11.02.18
 */


Ext.define('LearningAnalytics.model.courses.CourseContentsFileTypes', {
    extend: 'LearningAnalytics.model.Base',

    fields: [
        { name: 'type', type: 'string'},
        { name: 'counter', type: 'int' }
    ]
});
