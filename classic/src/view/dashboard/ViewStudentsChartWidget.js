/**
 *  Created by n.vasileiadis on 08.10.17
 */
Ext.define('LearningAnalytics.view.dashboard.ViewStudentsChartWidget', {
    extend: 'Ext.panel.Panel',
    xtype: 'viewStudentsChart',

    requires: [
        'Ext.chart.CartesianChart',
        'Ext.chart.axis.Category',
        'Ext.chart.axis.Numeric',
        'Ext.chart.series.Line',
        'Ext.form.DateField',
        'Ext.chart.interactions.PanZoom',
        'Ext.ProgressBar'
    ],

    cls: 'dashboard-main-chart',
    height: 380,

    bodyPadding: 15,

    title: 'Views',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    tools: [
        {
            type: 'expand',
            toggleValue: true,
            listeners: {
                click: 'onExpand'
            }
        },
        {
            type: 'refresh',
            toggleValue: false,
            hidden: true,
            listeners: {
                click: 'onRefreshToggle'
            }
        },
        {
            itemId: 'collapse',
            type: 'collapse',
            hidden: true,
            listeners: {
                click: 'onCollapse'
            }
        }
    ],

    items: [
        {
            xtype: 'container',
            reference: 'filterContainer',
            id: 'filterContainer',
            hidden: true,
            // height: 100,
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'datefield',
                    reference: 'dateFrom',
                    id:'dateFrom',
                    name: 'dateFrom',
                    itemId: 'dateFrom',
                    format: 'Y-m-d',
                    labelAlign: 'top',
                    labelSeparator: '',
                    endDateField: 'dateTo',
                    submitFormat: 'd-m-Y',
                    padding: '0 0 0 30',
                    fieldLabel: 'Date From',
                    maxWidth: 200,
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
                    maxWidth: 200,
                    flex: 1
                },
                {
                    reference: 'actionView',
                    xtype:'combo',
                    labelAlign: 'top',
                    fieldLabel:'View per',
                    name:'actionView',
                    queryMode:'local',
                    store:['year','quarter','month', 'week', 'day'], //'hour', 'minute', 'second'],
                    displayField:'actionView',
                    padding: '0 0 0 30',
                    autoSelect:true,
                    forceSelection:true,
                    maxWidth: 200,
                    listeners:{
                        afterrender:function(rec){
                            this.setValue('day');
                        }
                    },
                    flex: 0.5
                }
                // {
                //     reference: 'actionsQuery',
                //     xtype:'combo',
                //     labelAlign: 'top',
                //     fieldLabel:'Actions',
                //     name:'actionsQuery',
                //     queryMode:'local',
                //     store:['all','view','quiz', 'enrol','unenrol'],
                //     displayField:'actionsQuery',
                //     padding: '0 0 0 30',
                //     autoSelect:true,
                //     forceSelection:true,
                //     maxWidth: 200,
                //     listeners:{
                //         afterrender:function(rec){
                //             this.setValue('all');
                //         }
                //     },
                //     flex: 0.5
                // }
            ]
        },
        {
            xtype: 'container',
            reference: 'viewChartContainer',
            id: 'viewChartContainer',
            flex: 1,
            layout: 'fit',
            hidden: false,
            items: [
                {
                    xtype: 'viewChart',
                    reference: 'viewChart',
                    id: 'viewChart',
                    bind: '{viewStudentsChart}',
                    flex:1
                }
            ]
        }
    ]
});