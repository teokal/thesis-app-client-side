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
            id: 'riskAnalysisGridPanel',
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
            selModel: {
                selType: 'checkboxmodel',
                checkOnly: true,
                showHeaderCheckbox: true
            },
            bind: {
                store: '{riskAnalysis}'
            },
            columns: [
                {
                    dataIndex: 'fullname',
                    text: 'Fullname',
                    flex: 1,
                    filter: {
                        type: 'string'
                    }
                },
                {
                    dataIndex: 'in_danger',
                    text: 'Status',
                    width: 130,
                    align: 'center',
                    filter: {
                        type: 'boolean',
                        yesText: 'Danger',
                        noText: 'Success'
                    },
                    renderer: function(value) {
                        return '<span class="x-fa '+ (value ? 'fa-exclamation-circle' : 'fa-check-circle') +'" style="color:'+ (value ? 'red' : 'green') + '"></span>';
                    }
                }
            ]
        }
    ],

    bbar: {
        overflowHandler: 'menu',
        items: [
            '->',
            {
                xtype: 'button',
                ui: 'soft-green',
                text: 'Compose Message',
                disabled: false,
                handler: 'onComposeMessageClick'
            }
        ]
    }


});
