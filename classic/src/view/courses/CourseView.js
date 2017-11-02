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
            userCls: 'big-60 small-100'
        },
        {
            xtype: 'enrolledStudents', //
            userCls: 'big-33 small-100'
        },
        {
            xtype: 'studentsWidget',
            userCls: 'big-50 small-50'
        }
    ]
});
