/**
 *  Created by n.vasileiadis on 21.01.18
 */

Ext.define('LearningAnalytics.view.courses.CourseFileTypePieChart', {
    extend: 'Ext.panel.Panel',
    xtype: 'courseFileTypePieChart',

    requires: [
        'Ext.chart.CartesianChart',
        'Ext.chart.axis.Category',
        'Ext.chart.axis.Numeric',
        'Ext.chart.series.Pie',
        'Ext.chart.PolarChart',
        'Ext.chart.series.sprite.PieSlice',
        'Ext.chart.interactions.PanZoom'
    ],

    cls: 'dashboard-main-chart',
    height: 380,

    bodyPadding: 15,

    title: 'File Types',

    layout: {
        type: 'card'
    },

    items: [
        {
            xtype: 'container',
            reference: 'courseFileTypePieChartContainer',
            id: 'courseFileTypePieChartContainer',
            flex: 1,
            layout: 'fit',
            defaults: {
                background: 'rgba(255, 255, 255, 1)',
                bind: '{courseContentsFileTypes}',
                series: [
                    {
                        type: 'pie',
                        label: {
                            field: 'type',
                            contrast: true,
                            font: '12px Arial',
                            display: 'none'
                        },
                        useDarkerStrokeColor: false,
                        xField: 'counter',
                        donut: 50,
                        padding:0,
                        tooltip: {
                            trackMouse: true,
                            renderer: function (tooltip, record, item) {
                                tooltip.setHtml(record.data.type + ': ' + record.data.counter.toString());
                            }
                        }

                    }
                ],
                legend: {
                    docked: 'right'
                }
            },

            items: [
                {
                    xtype: 'polar'
                }
            ]
        },
        {
            xtype: 'panel',
            reference: 'courseFileTypeNoDataText',
            id: 'courseFileTypeNoDataText',
            bind: {
                html: '<div><h2>No Data for this Course</h2><div>'
            }
        }

    ]

});