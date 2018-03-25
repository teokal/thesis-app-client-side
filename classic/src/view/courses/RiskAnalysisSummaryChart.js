/**
 *  Created by n.vasileiadis on 25.03.18
 */
Ext.define('LearningAnalytics.view.courses.RiskAnalysisSummaryChart', {
    extend: 'Ext.form.Panel',
    xtype: 'riskAnalysisSummaryChart',
    requires: [
        'Ext.button.Button'
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

    items: {
        xtype: 'viewRiskAnalysisSummaryChart',
        reference: 'viewRiskAnalysisSummaryChart',
        id: 'viewRiskAnalysisSummaryChart',
        bind: '{courseRiskAnalysisSummary}',
        flex:1
    },

    tbar: [
        '->',
        {
            text: 'Download',
            handler: 'onRiskAnalysisChartDownload'
        }
    ],

    bbar: {
        overflowHandler: 'menu',
        items: [
            '->',
            {
                xtype: 'button',
                ui: 'soft-blue',
                text: 'Close',
                handler: 'onComposeDiscardClick'
            }
        ]
    }

});
