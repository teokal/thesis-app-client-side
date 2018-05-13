Ext.define('LearningAnalytics.view.courses.CourseCategoriesGraphPieChart', {
    extend: 'Ext.panel.Panel',
    xtype: 'courseCategoriesGraphPieChart',

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

    title: 'Categories',

    layout: {
        type: 'card'
    },

    items: [
        {
            xtype: 'container',
            reference: 'courseCategoriesGraphPieChartContainer',
            id: 'courseCategoriesGraphPieChartContainer',
            flex: 1,
            layout: 'fit',
            defaults: {
                background: 'rgba(255, 255, 255, 1)',
                bind: '{courseCategoriesGraph}',
                series: [
                    {
                        type: 'pie',
                        label: {
                            field: 'category_name',
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
                                tooltip.setHtml(record.data.category_name + ': ' + record.data.counter.toString());
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
            reference: 'courseCategoriesGraphNoDataText',
            id: 'courseCategoriesGraphNoDataText',
            bind: {
                html: '<div><h2>No Data for this Course</h2><div>'
            }
        }

    ]

});