/**
 * Created by n.vasileiadis on 7/29/2017.
 */

Ext.define('Thesis.Manager.view.main.courses.CourseView',{
    // extend: 'Ext.container.Container',
    extend: 'Ext.panel.Panel',
    xtype: 'courseView',

    requires: [
        'Thesis.Manager.store.Courses',
        'Thesis.Manager.store.CourseActions',
        'Ext.layout.container.Border',
        'Ext.chart.axis.Numeric',
        'Ext.chart.axis.Time',
        'Ext.chart.interactions.CrossZoom'

    ],

    controller: 'courseController',

    store: {
        type: 'courses',
        autoLoad: true
    },

    viewModel: {
        type: 'courseModel'
    },

    listeners: {
        render: 'onShow'
    },

    layout: {
        type : 'border',
        align : 'stretch'
    },
    flex: 1,

    height: Ext.getBody().getViewSize().height,

    items: [
        {
            xtype:'grid',
            region: 'center',
            flex: 1,
            width: 500,
            height: 400,

            minWidth: 290,
            layout: 'fit',
            store: {
                type: 'courses',
                autoLoad: true
            },

            columns: [
                { text: 'ID',  dataIndex: 'id', flex: 0.2 },
                { text: 'Fullname',  dataIndex: 'fullname', flex: 1 },
                { text: 'Shortname',  dataIndex: 'shortname', flex: 1 }

            ],

            listeners: {
                selectionchange: 'onEdit'
            }

        },
        {
            xtype: 'panel',
            reference: 'coursesActionPanel',

            region: 'east',
            width: 500,
            minWidth: 200,
            flex: 3,
            collapseDirection: 'left',
            collapsible: true,
            collapseMode: 'mini',
            hideCollapseTool: true,
            preventHeader: true,
            collapsed: true,
            //
            layout: 'fit',
            listeners: {
                afterrender: 'onAfterRender'
            },

            tbar: [
                '->',

                {
                    text: 'Reload Data',
                    handler: 'onReloadData'
                },
                {
                    text: 'Preview',
                    platformConfig: {
                        desktop: {
                            text: 'Download'
                        }
                    },
                    handler: 'onDownload'
                },
                {
                    text: 'Undo Zoom',
                    handler: 'onZoomUndo'
                }
            ],

            items: [
                {
                    xtype: 'panel',
                    layout: 'vbox',
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            items: [
                                {
                                    reference: 'dateFrom',
                                    xtype: 'datefield',
                                    format: 'Y-m-d',
                                    labelAlign: 'top',
                                    labelSeparator: '',
                                    name: 'dateFrom',
                                    itemId: 'dateFrom',
                                    // vtype: 'daterange',
                                    endDateField: 'dateTo',
                                    submitFormat: 'd-m-Y',
                                    padding: '0 0 0 30',
                                    fieldLabel: 'Date From',
                                    // width: 320,
                                    flex: 1

                                },
                                {
                                    reference: 'dateTo',
                                    xtype: 'datefield',
                                    format: 'Y-m-d',
                                    labelAlign: 'top',
                                    labelSeparator: '',
                                    name: 'dateTo',
                                    itemId: 'dateTo',
                                    // vtype: 'daterange',
                                    endDateField: 'dateFrom',
                                    submitFormat: 'd-m-Y',
                                    padding: '0 0 0 30',
                                    fieldLabel: 'Date To',
                                    // width: 320,
                                    flex: 1

                                }
                                // {
                                //     xtype: 'button',
                                //     text: 'Reload Data',
                                //     handler: 'onReloadData',
                                //     padding: '0 0 0 10',
                                //     flex: 1
                                //
                                // }
                            ]
                        },
                        {
                            xtype: 'cartesian',
                            reference: 'chart',
                            width: '100%',
                            height: 600,
                            insetPadding: '40 40 40 40',
                            bind: {
                                store: '{list}'
                            },
                            interactions: {
                                type: 'crosszoom',
                                zoomOnPanGesture: false
                            },
                            legend: {
                                docked: 'bottom'
                            },
                            axes: [{
                                type: 'numeric',
                                position: 'left',

                                fields: 'value',
                                title: 'LOGOUT',
                                grid: true,
                                majorTickSteps: 10,
                                renderer: 'onAxisLabelRender'
                            }, {
                                type: 'category',
                                // type: 'date',
                                dateFormat: 'Y-m-d',

                                position: 'bottom',
                                fields: 'date',
                                label: {
                                    rotate: {
                                        degrees: -45
                                    }
                                }
                            }]

                        }
                    ]
                // }

                // {
                // xtype: 'cartesian',
                // reference: 'chart',
                // width: '100%',
                // height: 600,
                // insetPadding: '40 40 40 40',
                // bind: {
                //     store: '{list}'
                // },
                //
                // legend: {
                //     docked: 'bottom'
                // },
                // axes: [{
                //     type: 'numeric',
                //     position: 'left',
                //     fields: 'value',
                //     title: 'LOGOUT',
                //     grid: true,
                //     majorTickSteps: 10,
                //     renderer: 'onAxisLabelRender'
                // }, {
                //     type: 'category',
                //     position: 'bottom',
                //     fields: 'date',
                //     label: {
                //         rotate: {
                //             degrees: -45
                //         }
                //     }
                // }]

                }]


        }

    ]
});
