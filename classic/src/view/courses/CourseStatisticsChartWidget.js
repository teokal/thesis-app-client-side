/**
 *  Created by n.vasileiadis on 01.11.17
 */

Ext.define('LearningAnalytics.view.courses.CourseStatisticsChartWidget', {
    extend: 'Ext.panel.Panel',
    xtype: 'courseStatisticsChartWidget',

    requires: [
        'Ext.chart.CartesianChart',
        'Ext.chart.axis.Category',
        'Ext.chart.axis.Numeric',
        'Ext.chart.series.Line',
        'Ext.form.field.ComboBox',
        'Ext.form.DateField',
        'Ext.chart.interactions.PanZoom',
        'Ext.ProgressBar'
    ],

    cls: 'dashboard-main-chart',
    height: 380,

    bodyPadding: 15,

    controller: 'courseController',

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
            reference: 'filterContainerCourseLog',
            id: 'filterContainerCourseLog',
            hidden: true,
            // height: 100,
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'datefield',
                    reference: 'dateFromCourseLog',
                    id:'dateFromCourseLog',
                    name: 'dateFromCourseLog',
                    itemId: 'dateFromCourseLog',
                    format: 'Y-m-d',
                    labelAlign: 'top',
                    labelSeparator: '',
                    endDateField: 'dateToCourseLog',
                    submitFormat: 'd-m-Y',
                    padding: '0 0 0 30',
                    fieldLabel: 'Date From',
                    maxWidth: 200,
                    flex: 1
                },
                {
                    reference: 'dateToCourseLog',
                    xtype: 'datefield',
                    format: 'Y-m-d',
                    labelAlign: 'top',
                    labelSeparator: '',
                    name: 'dateToCourseLog',
                    itemId: 'dateToCourseLog',
                    startDateField: 'dateFromCourseLog',
                    submitFormat: 'd-m-Y',
                    padding: '0 0 0 30',
                    fieldLabel: 'Date To',
                    maxWidth: 200,
                    flex: 1
                },
                {
                    reference: 'actionViewCourseLog',
                    xtype:'combo',
                    labelAlign: 'top',
                    fieldLabel:'View per',
                    name:'actionViewCourseLog',
                    queryMode:'local',
                    store:['year','quarter','month', 'week', 'day'], //'hour', 'minute', 'second'],
                    displayField:'actionViewCourseLog',
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
                },
                {
                    reference: 'actionsQueryCourseLog',
                    xtype:'combo',
                    labelAlign: 'top',
                    fieldLabel:'Actions',
                    name:'actionsQueryCourseLog',
                    queryMode:'local',
                    store:['all','view','quiz', 'enrol','unenrol'],
                    displayField:'actionsQueryCourseLog',
                    padding: '0 0 0 30',
                    autoSelect:true,
                    forceSelection:true,
                    maxWidth: 200,
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
            xtype: 'container',
            reference: 'viewChartContainerCourseLog',
            id: 'viewChartContainerCourseLog',
            flex: 1,
            layout: 'fit',
            hidden: false,
            items: [
                {
                    xtype: 'viewCourseStatisticsChart',
                    reference: 'viewCourseStatisticsChart',
                    id: 'viewCourseStatisticsChart',
                    bind: '{courseStatisticsData}',
                    flex:1
                }
            ]
        }
    ]

});