/**
 *  Created by n.vasileiadis on 01.11.17
 */

Ext.define('LearningAnalytics.view.courses.CourseStatisticsChartWidget', {
    extend: 'Ext.panel.Panel',
    xtype: 'courseStatisticsChartWidget',

    id: 'chartCourseLog',
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
                    flex: 1,
                    value: new Date('1 Nov 2015')                    
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
                    flex: 1,
                    value: new Date()
                },
                {
                    reference: 'actionViewCourseLog',
                    xtype:'combo',
                    labelAlign: 'top',
                    fieldLabel:'View per',
                    name:'actionViewCourseLog',
                    queryMode:'local',
                    store:['year','quarter','month', 'week', 'day'],
                    displayField:'actionViewCourseLog',
                    padding: '0 0 0 30',
                    autoSelect:true,
                    forceSelection:true,
                    maxWidth: 200,
                    listeners:{
                        afterrender:function(rec){
                            this.setValue('month');
                        }
                    },
                    flex: 0.5
                },
                {
                    reference: 'courseModulesCombo',
                    name: 'courseModulesCombo',
                    xtype: 'combobox',
                    renderTo: document.body,
                    fieldLabel: 'Modules',
                    labelAlign: 'top',
                    displayField: 'title',
                    padding: '0 0 0 30',
                    multiSelect: true,
                    tpl: new Ext.XTemplate('<tpl for=".">', '<div class="x-boundlist-item">', '<input type="checkbox" />', '{title}', '</div>', '</tpl>'),
                    bind: {
                        store: '{courseModules}'
                    },
                    queryMode: 'local',
                
                    listeners: {
                        select: 'onModuleComboSelect',

                        beforedeselect: function (combo, rec) {
                            var node = combo.getPicker().getNode(rec);
                            Ext.get(node).down('input').dom.checked = false;
                        },

                        boxready:function(combo) {
                            var store = combo.getStore();
                            if(store.isLoaded()) {
                                 combo.select(store.getAt(0));
                             } else {
                                 store.on({
                                     load:function() {
                                         combo.select(store.getAt(0))
                                     }
                                 });
                             }
                         }
                         
                        
                    }
        
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