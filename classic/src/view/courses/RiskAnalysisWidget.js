/**
 *  Created by n.vasileiadis on 21.01.18
 */

Ext.define('LearningAnalytics.view.courses.RiskAnalysisWidget', {
    extend: 'Ext.container.Container',
    xtype: 'riskAnalysisWidget',

    requires: [
        'LearningAnalytics.view.widgets.WidgetSmall',
        'Ext.form.field.Display'
    ],

    defaults: {
        xtype: 'container'
    },

    items: [
        {
            xtype: 'widgetSmall',
            containerColor: 'pink',
            bind: {
                html: '<div><h2>Risk Analysis</h2><span class="x-fa fa-exclamation-circle"></span><div class="infodiv">Grades</div></div>'
            },

            listeners : {
                element  : 'el',
                click    : 'onRiskAnalysisClick'
            },

            params: {
                openWindow: true, // Let the controller know that we want this component in the window,
                targetCfg: {
                    //put any extra configs for your view here
                },
                windowCfg: {
                    // Any configs that you would like to apply for window popup goes here
                    title: 'Test Title'
                }
            }


        }
    ]
});