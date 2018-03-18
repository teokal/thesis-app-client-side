/**
 *  Created by n.vasileiadis on 17.03.18
 */
Ext.define('LearningAnalytics.view.courses.RiskAnalysisStepTwoPanel', {
    extend: 'Ext.form.Panel',
    xtype: 'riskAnalysisStepTwoPanel',
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

    defaults: {
        labelWidth: 60,
        labelSeparator: ''
    },
    // readOnly: true

    items: [{
            html : '<p>If you want, you can change the default parameter\'s value</p>'
        }, {
            xtype: 'numberfield',
            name: 'riskAnalysisParameterA1',
            width: 350,
            // value: 11.803,
            bind: '{riskParameterA1}',
            fieldLabel: 'A1',
            allowBlank: false  // requires a non-empty value
        }, {
            xtype: 'numberfield',
            name: 'riskAnalysisParameterB1',
            width: 350,
            // value: 13.385,
            bind: '{riskParameterB1}',
            fieldLabel: 'B1',
            allowBlank: false // requires value to be a valid email address format
        },{
            xtype: 'numberfield',
            name: 'riskAnalysisParameterC1',
            width: 350,
            // value: 5.343,
            bind: '{riskParameterC1}',
            fieldLabel: 'C1',
            allowBlank: false // requires value to be a valid email address format
        },{
            xtype: 'numberfield',
            name: 'riskAnalysisParameterA2',
            width: 350,
            // value: -0.233,
            bind: '{riskParameterA2}',
            fieldLabel: 'A2',
            allowBlank: false  // requires a non-empty value
        }, {
            xtype: 'numberfield',
            name: 'riskAnalysisParameterB2',
            width: 350,
            // value: 3.381,
            bind: '{riskParameterB2}',
            fieldLabel: 'B2',
            allowBlank: false // requires value to be a valid email address format
        },{
            xtype: 'numberfield',
            name: 'riskAnalysisParameterC2',
            width: 350,
            // value: 0.788,
            bind: '{riskParameterC2}',
            fieldLabel: 'C2',
            allowBlank: false // requires value to be a valid email address format
        },{
            html : '<p>These parameters are used to calculate the risk on the next step</br>' +
            'The Algorithms are:</br>' +
            'Discriminant Function for students not at risk: <b> Y1 = A1*P1 + B1*P2 - C1</b></br>' +
            'Discriminant Function for students at risk: <b> Y2 = A2*P1 + B2*P2 - C2</b></p>'
        }
    ]

});
