/**
 *  Created by n.vasileiadis on 11.02.18
 */

Ext.define('LearningAnalytics.model.courses.CourseContent', {
    extend: 'LearningAnalytics.model.Base',

    fields: [
        { name: 'total_files', type: 'int' }
    ],

    hasMany: [
        {
            model: 'LearningAnalytics.model.courses.CourseContentsData',
            name: 'contents',
            associationKey: 'contents'
        },
        {
            model: 'LearningAnalytics.model.courses.CourseContentsFileTypes',
            name: 'filetypes',
            associationKey: 'filetypes'
        }
    ]

});
