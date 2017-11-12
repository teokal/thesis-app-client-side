/**
 *  Created by n.vasileiadis on 01.11.17
 */

Ext.define('LearningAnalytics.view.chart.ViewCourseStatisticsChart', {
    extend: 'Ext.chart.CartesianChart',
    xtype: 'viewCourseStatisticsChart',

    requires: [
        'Ext.chart.axis.Category',
        'Ext.chart.axis.Numeric',
        'Ext.chart.series.Line'
    ],

    animation : !Ext.isIE9m && Ext.os.is.Desktop,

    insetPadding: 0,

    innerPadding: {
        top: 5
    },

    axes: [
        {
            type: 'category',
            fields: 'date',
            hidden: true,
            position: 'bottom'
        },
        {
            type: 'numeric',
            minimum: 0,
            fields: [
                'view',
                'quiz',
                'enrol',
                'unenrol'
            ],

            grid: {
                odd: {
                    fill: '#e8e8e8'
                }
            },

            hidden: true,
            position: 'left'
        }
    ],

    series: [
        {
            type: 'line',
            colors: [
                'rgba(103, 144, 199, 0.6)'
            ],
            useDarkerStrokeColor: false,
            xField: 'date',
            yField: [
                'view'
            ],
            fill: true,
            smooth: true,
            marker: {
                opacity: 0,
                scaling: 0.01,
                fx: {
                    duration: 200,
                    easing: 'easeOut'
                }
            },
            highlightCfg: {
                opacity: 1,
                scaling: 1.5
            },
            tooltip: {
                trackMouse: true,
                renderer: function (tooltip, record, item) {
                    tooltip.setHtml(item.field.toString() + ' (' + record.get('date').substring(0,10) + '): ' + record.get(item.field));
                }
            }
        },
        {
            type: 'line',
            colors: [
                'rgba(112, 191, 115, 0.6)'
            ],
            useDarkerStrokeColor: false,
            xField: 'date',
            yField: [
                'quiz'
            ],
            fill: true,
            smooth: true,
            marker: {
                opacity: 0,
                scaling: 0.01,
                fx: {
                    duration: 200,
                    easing: 'easeOut'
                }
            },
            highlightCfg: {
                opacity: 1,
                scaling: 1.5
            },
            tooltip: {
                trackMouse: true,
                renderer: function (tooltip, record, item) {
                    tooltip.setHtml(item.field.toString() + ' (' + record.get('date').substring(0,10) + '): ' + record.get(item.field));
                }
            }
        },
        {
            type: 'line',
            colors: [
                'rgba(238, 146, 156, 0.6)'
            ],
            useDarkerStrokeColor: false,
            xField: 'date',
            yField: [
                'enrol'
            ],
            fill: true,
            smooth: true,
            marker: {
                opacity: 0,
                scaling: 0.01,
                fx: {
                    duration: 200,
                    easing: 'easeOut'
                }
            },
            highlightCfg: {
                opacity: 1,
                scaling: 1.5
            },
            tooltip: {
                trackMouse: true,
                renderer: function (tooltip, record, item) {
                    tooltip.setHtml(item.field.toString() + ' (' + record.get('date').substring(0,10) + '): ' + record.get(item.field));
                }
            }
        },
        {
            type: 'line',
            colors: [
                'rgba(133, 97, 197, 0.6)'
            ],
            useDarkerStrokeColor: false,
            xField: 'date',
            yField: [
                'unenrol'
            ],
            fill: true,
            smooth: true,
            marker: {
                opacity: 0,
                scaling: 0.01,
                fx: {
                    duration: 200,
                    easing: 'easeOut'
                }
            },
            highlightCfg: {
                opacity: 1,
                scaling: 1.5
            },
            tooltip: {
                trackMouse: true,
                renderer: function (tooltip, record, item) {
                    tooltip.setHtml(item.field.toString() + ' (' + record.get('date').substring(0,10) + '): ' + record.get(item.field));
                }
            }
        },

    ]

});
