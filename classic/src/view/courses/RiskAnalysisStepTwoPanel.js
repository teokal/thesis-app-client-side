/**
 *  Created by n.vasileiadis on 17.03.18
 */
Ext.define('LearningAnalytics.view.courses.RiskAnalysisStepTwoPanel', {
    extend: 'Ext.form.Panel',
    xtype: 'riskAnalysisStepTwoPanel',
    reference: 'riskAnalysisStepTwoPanel',

    requires: [
        'Ext.button.Button',
        'Ext.form.field.Text',
        'Ext.form.field.File',
        'Ext.form.field.HtmlEditor'
    ],


    layout: {
        type:'vbox'
        // align:'stretch'
    },

    bodyPadding: 10,
    scrollable: true,
    autoScroll: true,
    overflowY: 'scroll',

    defaults: {
        labelWidth: 60,
        labelSeparator: ''
    },
    // readOnly: true

    items: [{
            html : '<p>If you want, you can change the default parameter\'s value</p>'
        }, {
            layout: {
                type:'hbox',
                align:'stretch'
            },
            items: [{
                xtype: 'numberfield',
                name: 'riskAnalysisParameterA1',
                width: 300,
                bind: '{riskParameterA1}',
                margin: '0 30 5 0',
                forcePrecision: true,
                decimalPrecision: 10,
                fieldLabel: 'A1',
                labelAlign: 'top',
                allowBlank: false
            }, {
                xtype: 'numberfield',
                name: 'riskAnalysisParameterB1',
                width: 300,
                bind: '{riskParameterB1}',
                margin: '0 30 5 0',
                forcePrecision: true,
                decimalPrecision: 10,
                fieldLabel: 'B1',
                labelAlign: 'top',
                allowBlank: false
            },{
                xtype: 'numberfield',
                name: 'riskAnalysisParameterC1',
                width: 300,
                bind: '{riskParameterC1}',
                margin: '0 30 5 0',
                forcePrecision: true,
                decimalPrecision: 10,
                fieldLabel: 'C1',
                labelAlign: 'top',
                allowBlank: false
            }]

        },{
            layout: {
                type:'hbox',
                align:'stretch'
            },
            items: [{
                xtype: 'numberfield',
                name: 'riskAnalysisParameterA2',
                width: 300,
                bind: '{riskParameterA2}',
                margin: '0 30 5 0',
                forcePrecision: true,
                decimalPrecision: 10,
                fieldLabel: 'A2',
                labelAlign: 'top',
                allowBlank: false
            }, {
                xtype: 'numberfield',
                name: 'riskAnalysisParameterB2',
                width: 300,
                bind: '{riskParameterB2}',
                margin: '0 30 5 0',
                forcePrecision: true,
                decimalPrecision: 10,
                fieldLabel: 'B2',
                labelAlign: 'top',
                allowBlank: false
            },{
                xtype: 'numberfield',
                name: 'riskAnalysisParameterC2',
                width: 300,
                bind: '{riskParameterC2}',
                margin: '0 30 5 0',
                forcePrecision: true,
                decimalPrecision: 10,
                fieldLabel: 'C2',
                labelAlign: 'top',
                allowBlank: false
            }]
        },{
            html : '<p><b> Y1 = A1*P1 + B1*P2 + C1</b></br>' +
            '<b> Y2 = A2*P1 + B2*P2 + C2</b></p>'
        }
    ]

});
