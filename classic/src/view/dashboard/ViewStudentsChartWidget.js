/**
 *  Created by n.vasileiadis on 08.10.17
 */
Ext.define('LearningAnalytics.view.dashboard.ViewStudentsChartWidget', {
    extend: 'Ext.panel.Panel',
    xtype: 'viewStudentsChart',

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

    tools: [
        {
            type: 'expand',
            toggleValue: true,
            listeners: {
                click: 'onExpand'
            }
        },
        {
            itemId: 'collapse',
            type: 'collapse',
            hidden: true,
            listeners: {
                click: 'onCollapse'
            }
        }
    ],

    items: [
        {
            xtype: 'viewChart',
            bind: '{viewStudentsChart}',
            flex:1
        }
    ]
});