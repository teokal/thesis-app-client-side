/**
 *  Created by n.vasileiadis on 08.10.17
 */

Ext.define('LearningAnalytics.view.chart.ViewStudentsChart', {
    extend: 'Ext.chart.CartesianChart',
    xtype: 'viewChart',

    requires: [
        'Ext.chart.axis.Category',
        'Ext.chart.axis.Numeric',
        'Ext.chart.series.Line',
        'Ext.chart.interactions.PanZoom'
    ],

    animation : !Ext.isIE9m && Ext.os.is.Desktop,

    insetPadding: 0,

    axes: [
        {
            type: 'category',
            fields: [
                'date'
            ],
            hidden: true,
            position: 'bottom'
        },
        {
            type: 'numeric',
            fields: [
                'view'
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
            fill: true
            // smooth: true
        }

    ],

    interactions: [
        {
            type: 'panzoom'
        }
    ]
});
