/**
 *  Created by n.vasileiadis on 20.03.18
 */
Ext.define('LearningAnalytics.view.courses.RiskAnalysisStepThreePanel', {
    extend: 'Ext.form.Panel',
    xtype: 'riskAnalysisStepThreePanel',
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

    items: [{
            html : '<p>Results </p>'
        },
        {
            xtype: 'gridpanel',
            reference: 'riskAnalysisResultsGridPanel',
            header: false,
            hideHeaders: false,
            readOnly : false,
            disableSelection: false,
            selModel: {
                selType: 'checkboxmodel',
                checkOnly: true,
                showHeaderCheckbox: true
            },
            plugins: 'gridfilters',

            scrollable: {
                x: true,
                y: true
            },
            viewConfig:{
                markDirty:false
            },
            bind: {
                store: '{courseRiskAnalysisResults}'
            },
            columns: [
                {
                    dataIndex: 'id',
                    text: 'ID',
                    width: 90
                },
                {
                    dataIndex: 'name',
                    text: 'Name',
                    width: 250,
                    flex: 1,
                    filter: {
                        type: 'string'
                    }
                },
                {
                    dataIndex: 'status',
                    text: 'Status',
                    width: 130,
                    align: 'center',
                    filter: {
                        type: 'boolean',
                        yesText: 'Success',
                        noText: 'Danger'
                    },
                    renderer: function(value) {
                        return '<span class="x-fa '+ (value ? 'fa-check-circle' : 'fa-exclamation-circle') +'" style="color:'+ (value ? 'green' : 'red') + '"></span>';
                    }
                }
            ]
        }
    ]

});
