/**
 *  Created by n.vasileiadis on 08.10.17
 */
Ext.define('LearningAnalytics.view.dashboard.ViewStudentsChartWidget', {
    extend: 'Ext.Panel',
    xtype: 'viewStudentsChart',

    requires: [
        'Ext.chart.CartesianChart',
        'Ext.chart.axis.Category',
        'Ext.chart.axis.Numeric',
        'Ext.chart.series.Line',
        'Ext.chart.interactions.PanZoom'
    ],

    cls: 'dashboard-main-chart shadow',
    height: 380,

    bodyPadding: 15,

    title: 'Views',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    items: [
        {
            xtype: 'container',
            flex: 1,
            layout: 'fit',
            items: [
                {
                    xtype: 'viewChart',
                    bind: '{viewStudentsChart}'
                }
            ]

        }
    ]
});