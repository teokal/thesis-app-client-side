/**
 *  Created by n.vasileiadis on 01.11.17
 */

Ext.define('LearningAnalytics.view.courses.CourseStatisticsChartWidget', {
    extend: 'Ext.panel.Panel',
    xtype: 'courseStatisticsChartWidget',

    requires: [
        'Ext.chart.CartesianChart',
        'Ext.chart.axis.Category',
        'Ext.chart.axis.Numeric',
        'Ext.chart.series.Line',
        'Ext.chart.interactions.PanZoom',
        'Ext.ProgressBar'
    ],

    cls: 'dashboard-main-chart',
    height: 380,

    bodyPadding: 15,

    title: 'Views',

    layout: 'fit',

    items: [
        {
            xtype: 'viewCourseStatisticsChart',
            bind: '{courseStatisticsData}',
            flex:1
        }
    ]
});