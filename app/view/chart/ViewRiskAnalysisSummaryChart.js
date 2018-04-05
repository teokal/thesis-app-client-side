/**
 *  Created by n.vasileiadis on 25.03.18
 */

Ext.define('LearningAnalytics.view.chart.ViewRiskAnalysisSummaryChart', {
    extend: 'Ext.chart.CartesianChart',
    xtype: 'viewRiskAnalysisSummaryChart',

    requires: [
        'Ext.chart.axis.Category',
        'Ext.chart.axis.Numeric',
        'Ext.chart.series.Line',
        'Ext.chart.series.Bar'
    ],

    animation : !Ext.isIE9m && Ext.os.is.Desktop,

    insetPadding: 0,

    innerPadding: {
        top: 20
    },

    axes: [
        {
            type: 'category',
            fields: 'title',
            hidden: false,
            position: 'bottom',
            label: {
                rotate: {
                    degrees: -45
                }
            },

            renderer: function(axis, data){
                return data.substring(0,30);
            }
        },
        {
            type: 'numeric',
            minimum: 0,
            fields: [
                'success',
                'failure'
            ],

            grid: true,
            hidden: false,
            position: 'left'
        }
    ],

    series: [
        {
            type: 'bar',
            colors: [
                'rgba(112, 191, 115, 0.6)',
                'rgba(103, 144, 199, 0.6)'
            ],
            style: {
                lineWidth: 3
            },

            useDarkerStrokeColor: false,
            xField: 'title',
            yField: [
                'success',
                'failure'
            ],
            fill: false,
            smooth: false,
            stacked: false,
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
                scaling: 1.05
            },
            tooltip: {
                trackMouse: true,
                renderer: function (tooltip, record, item) {
                    tooltip.setHtml(record.data.title + '<br>' + item.field.toString() + ': ' + record.get(item.field.toString()));
                }
            }
        }
    ],
    legend: {
        docked: 'bottom'
    }

});
