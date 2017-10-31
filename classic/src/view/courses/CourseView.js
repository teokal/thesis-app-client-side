/**
 *  Created by n.vasileiadis on 31.10.17
 */

Ext.define('LearningAnalytics.view.courses.CourseView', {
    extend: 'Ext.container.Container',
    xtype: 'courseView',

    requires: [
        'Ext.ux.layout.ResponsiveColumn'
    ],

    controller: 'courseController',
    viewModel: {
        type: 'courseViewModel'
    },

    layout: 'responsivecolumn',

    listeners: {
        beforerender: 'onShow'
    },

    items: [
        {
            xtype: 'enrolledStudents', //
            userCls: 'big-33 small-100'
        },
        // {
        //     xtype: 'viewStudentsChart',
        //     userCls: 'big-60 small-100'
        // },
        {
            xtype: 'studentsWidget',
            userCls: 'big-50 small-50'
        }
    ]
});
