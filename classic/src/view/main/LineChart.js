/**
 * Created by n.vasileiadis on 7/6/2017.
 */

Ext.define('Thesis.Manager.view.main.LineChart', {
    extend: 'Ext.Panel',
    xtype: 'line-basic',
    controller: 'line-basic',

    width: 650,

    items: {
        xtype: 'cartesian',
        reference: 'chart',
        width: '100%',
        height: 500,
        interactions: {
            type: 'panzoom',
            zoomOnPanGesture: true
        },
        animation: {
            duration: 200
        },
        store: {
            type: 'browsers'
        },
        innerPadding: {
            left: 40,
            right: 40
        },
        captions: {
            title: 'Line Charts - Basic Line',
            credits: {
                text: 'Data: Browser Stats 2012\nSource: http://www.w3schools.com/',
                align: 'left'
            }
        },
        axes: [{
            type: 'numeric',
            position: 'left',
            grid: true,
            minimum: 0,
            maximum: 24,
            renderer: 'onAxisLabelRender'
        }, {
            type: 'category',
            position: 'bottom',
            grid: true,
            label: {
                rotate: {
                    degrees: -45
                }
            }
        }],
        series: [{
            type: 'line',
            xField: 'month',
            yField: 'data1',
            style: {
                lineWidth: 2
            },
            marker: {
                radius: 4,
                lineWidth: 2
            },
            label: {
                field: 'data1',
                display: 'over'
            },
            highlight: {
                fillStyle: '#000',
                radius: 5,
                lineWidth: 2,
                strokeStyle: '#fff'
            },
            tooltip: {
                trackMouse: true,
                showDelay: 0,
                dismissDelay: 0,
                hideDelay: 0,
                renderer: 'onSeriesTooltipRender'
            }
        }],
        listeners: {
            itemhighlight: 'onItemHighlight'
        }
    },

    tbar: ['->', {
        text: 'Preview',
        handler: 'onPreview'
    }]

});
