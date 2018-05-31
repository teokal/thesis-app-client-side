/**
 *  Created by n.vasileiadis on 25.02.18
 */

Ext.define('LearningAnalytics.view.courses.RiskAnalysisWindow', {
    extend: 'Ext.form.Panel',
    xtype: 'riskAnalysisWindow',
    requires: [
        'Ext.button.Button',
        'Ext.form.field.Text',
        'Ext.form.field.File',
        'Ext.form.field.HtmlEditor'
    ],


    layout: {
        type:'vbox',
        align:'stretch'
    },

    bodyPadding: 10,
    scrollable: true,

    defaults: {
        labelWidth: 60,
        labelSeparator: ''
    },

    items: [
        {
            xtype: 'gridpanel',
            reference: 'riskAnalysisGridPanel',
            plugins: 'gridfilters',
            header: false,
            hideHeaders: false,
            readOnly : false,
            disableSelection: false,
            scrollable: {
                x: false,
                y: true
            },
            viewConfig:{
                markDirty:false
            },
            bind: {
                store: '{riskAnalysisScorms}'
            },
            columns: [
                {
                    dataIndex: 'title',
                    text: 'Activity',
                    flex: 1
                },
                {
                    dataIndex: 'page',
                    text: 'Page',
                    selType: 'checkboxmodel',
                    width: 130,
                    renderer: function(value) {
                        return '<span class="x-fa fa-'+ (value ? 'check-square-o' : 'square-o') +'"></span>';
                    }
                },
                {
                    dataIndex: 'quiz',
                    text: 'Quiz',
                    width: 130,
                    renderer: function(value) {
                        return '<span class="x-fa fa-'+ (value ? 'check-square-o' : 'square-o') +'"></span>';
                    }
                },
                {
                    dataIndex: 'none',
                    text: 'None',
                    width: 130,
                    renderer: function(value) {
                        return '<span class="x-fa fa-'+ (value ? 'check-square-o' : 'square-o') +'"></span>';
                    }
                }

            ],
            listeners: {
                'cellclick': 'onRiskAnalysisGridCellItemClick'

            }

        }
    ]

});
