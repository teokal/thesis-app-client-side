/**
 * Created by n.vasileiadis on 8/13/2017.
 */
Ext.define('Thesis.Manager.view.main.admin.users.AdminUserView',{
    // extend: 'Ext.container.Container',
    extend: 'Ext.panel.Panel',
    xtype: 'adminUserView',

    requires: [
        'Thesis.Manager.store.AdminUsers',
        'Ext.layout.container.Border',
        'Ext.chart.axis.Numeric',
        'Ext.chart.axis.Time',
        'Ext.chart.interactions.CrossZoom'
    ],

    controller: 'adminUserController',

    store: {
        type: 'adminUsers',
        autoLoad: true
    },

    viewModel: {
        type: 'adminUserModel'
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
            xtype: 'panel',
            reference: 'adminUserPanel',

            region: 'center',
            // width: 500,
            minWidth: 200,
            flex: 3,
            collapseDirection: 'left',
            collapsible: true,
            collapseMode: 'mini',
            hideCollapseTool: true,
            preventHeader: true,
            collapsed: false,
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
                                    startDateField: 'dateFrom',
                                    submitFormat: 'd-m-Y',
                                    padding: '0 0 0 30',
                                    fieldLabel: 'Date To',
                                    // width: 320,
                                    flex: 1

                                },
                                {
                                    reference: 'actionView',
                                    xtype:'combo',
                                    labelAlign: 'top',
                                    fieldLabel:'View per',
                                    name:'actionView',
                                    queryMode:'local',
                                    store:['year','quarter','month', 'week', 'day','hour', 'minute', 'second'],
                                    displayField:'actionView',
                                    padding: '0 0 0 30',
                                    autoSelect:true,
                                    forceSelection:true,
                                    listeners:{
                                        afterrender:function(rec){
                                            this.setValue('day');
                                        }
                                    },
                                    flex: 0.5


                                },
                                {
                                    reference: 'actionsQuery',
                                    xtype:'combo',
                                    labelAlign: 'top',
                                    fieldLabel:'Actions',
                                    name:'actionsQuery',
                                    queryMode:'local',
                                    store:['all','view','add', 'login','logout', 'update'],
                                    displayField:'actionsQuery',
                                    padding: '0 0 0 30',
                                    autoSelect:true,
                                    forceSelection:true,
                                    listeners:{
                                        afterrender:function(rec){
                                            this.setValue('all');
                                        }
                                    },
                                    flex: 0.5


                                }
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

                                fields: ['view','login', 'logout','add', 'update'],
                                title: 'Users Actions',

                                grid: true,
                                majorTickSteps: 10,
                                renderer: 'onAxisLabelRender'
                            }, {
                                type: 'category',
                                dateFormat: 'Y-m-d',

                                position: 'bottom',
                                fields: 'date',
                                renderer: function(axis, data){
                                    return data.substring(0, 10);
                                },

                                label: {
                                    rotate: {
                                        degrees: -45
                                    }
                                }
                            }]

                        }
                    ]

                }]


        }

    ]
});