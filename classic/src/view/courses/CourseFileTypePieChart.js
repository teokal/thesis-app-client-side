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

    controller: 'courseController',

    title: 'File Types',

    layout: {
        type: 'vbox',
        align: 'stretch'
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
                store: {
                    fields: ['xvalue', 'yvalue'],
                    data: [{
                        xvalue: 'metric one',
                        yvalue: 14
                    }, {
                        xvalue: 'metric two',
                        yvalue: 16
                    }, {
                        xvalue: 'metric three',
                        yvalue: 14
                    }, {
                        xvalue: 'metric four',
                        yvalue: 6
                    }, {
                        xvalue: 'metric five',
                        yvalue: 36
                    }]
                },
                series: [
                    {
                        type: 'pie',
                        label: {
                            field: 'xField',
                            contrast: true,
                            font: '12px Arial'
                        },
                        useDarkerStrokeColor: false,
                        xField: 'yvalue',
                        donut: 50,
                        padding:0,
                        tooltip: {
                            trackMouse: true,
                            renderer: function (tooltip, record, item) {
                                tooltip.setHtml(item.field.toString() + ' (' + record.get('yvalue') + '): ' + record.get(item.field));
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
        }
    ]

});