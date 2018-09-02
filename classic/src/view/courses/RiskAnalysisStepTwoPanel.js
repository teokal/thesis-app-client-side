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
    },

    bodyPadding: 10,
    scrollable: true,
    autoScroll: true,
    overflowY: 'scroll',

    defaults: {
        labelWidth: 60,
        labelSeparator: ''
    },

    items: [ // is implemented on the controller
    ]

});
