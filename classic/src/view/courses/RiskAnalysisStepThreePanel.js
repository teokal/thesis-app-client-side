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
            scrollable: {
                x: false,
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
                    text: 'id',
                    width: 130
                },
                {
                    dataIndex: 'name',
                    text: 'name',
                    flex: 1
                },
                {
                    dataIndex: 'status',
                    text: 'Status',
                    width: 130,
                    align: 'center',
                    renderer: function(value) {
                        return '<span class="x-fa '+ (value ? 'fa-exclamation-circle' : 'fa-check-circle') +'" style="color:'+ (value ? 'red' : 'green') + '"></span>';
                    }
                }
            ]
        }
    ]

});
