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
                click    : function() {
                    Ext.toast({
                        html: 'Coming Soon!!!',
                        width: 200,
                        align: 't'
                    });
                }
            }

        }
    ]
});