/**
 *  Created by n.vasileiadis on 31.10.17
 */

Ext.define('LearningAnalytics.view.courses.CourseView', {
    extend: 'Ext.container.Container',
    xtype: 'courses',

    requires: [
        'Ext.ux.layout.ResponsiveColumn'
    ],

    layout: 'responsivecolumn',


    items: [
        {
            xtype: 'courseStatisticsChartWidget',
            id: 'chartCourseLog',
            reference: 'chartCourseLog',
            style: {
                'box-shadow': '0 0 5px rgba(0, 0, 0, 0.3)'
            },
            userCls: 'big-60 small-100'
        },
        {
            xtype: 'enrolledStudents', //
            style: {
                'box-shadow': '0 0 5px rgba(0, 0, 0, 0.3)'
            },
            userCls: 'big-40 small-100'
        },
        {
            xtype: 'studentsWidget',
            userCls: 'big-20 small-50'
        }
    ]
});
