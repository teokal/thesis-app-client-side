/**
 *  Created by n.vasileiadis on 08.10.17
 */
Ext.define('LearningAnalytics.view.dashboard.ViewStudentsChartWidget', {
    extend: 'Ext.Panel',
    xtype: 'viewStudentsChart',

    requires: [
        'Ext.Progress',
        'Ext.chart.CartesianChart',
        'Ext.chart.axis.Category',
        'Ext.chart.axis.Numeric',
        'Ext.chart.series.Line',
        'Ext.chart.interactions.PanZoom'
    ],

    height: 380,

    platformConfig: {
        phone: {
            height: 300
        }
    },

    bodyPadding: 15,

    title: 'Views',
    layout: 'fit',

    items: [
        {
            xtype: 'viewChart',
            bind: '{viewStudentsChart}',
            flex:1
        }
    ]
});