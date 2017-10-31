/**
 *  Created by n.vasileiadis on 31.10.17
 */

Ext.define('LearningAnalytics.view.courses.CourseViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.courseViewModel',

    stores: {
        courseEnrolledStudents: {
            type: 'courseEnrolledStudents',
            autoLoad: true
        }
    },

    data: {
        courseid: '0987'
    }
});