/**
 *  Created by n.vasileiadis on 08.10.17
 */

Ext.define('LearningAnalytics.view.chart.ViewStudentsChart', {
    extend: 'Ext.chart.CartesianChart',
    xtype: 'viewChart',

    requires: [
        'Ext.chart.axis.Category',
        'Ext.chart.axis.Numeric',
        'Ext.chart.series.Line'
    ],

    animation : !Ext.isIE9m && Ext.os.is.Desktop,

    insetPadding: 0,

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
            fields: 'view',
            grid: {
                odd: {
                    fill: '#e8e8e8'
                }
            },

            majorTickSteps: 10,
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
            yField: 'view',
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
                    tooltip.setHtml(' (' + record.get('date') + '): ' + record.get('view'));
                }
            }
        }

    ]

});
