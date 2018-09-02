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
        top: 20
    },

    axes: [
        {
            type: 'category',
            fields: 'date',
            hidden: false,
            position: 'bottom',
            label: {
                rotate: {
                    degrees: -45
                }
            },

            renderer: function(axis, data){
                return data.substring(0,10);
            }
        },
        {
            type: 'numeric',
            minimum: 0,
            fields: [
                'viewed'
            ],

            grid: false,
            majorTickSteps: 3,
            hidden: false,
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
                'viewed'
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
        }
    ]
});
