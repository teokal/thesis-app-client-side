/**
 *  Created by n.vasileiadis on 17.03.18
 */
Ext.define('LearningAnalytics.view.courses.RiskAnalysisWindowForms', {
    extend: 'Ext.panel.Panel',
    xtype: 'riskAnalysisWindowForm',
    requires: [
        'Ext.button.Button',
        'Ext.form.field.Text',
        'Ext.form.field.File',
        'Ext.form.field.HtmlEditor'
    ],

    layout: 'card',

    bodyPadding: 15,

    height: 340,

    listeners: {
        beforerender: 'initForRiskForm'
    },
    scrollable: true,

    items: [
        {
            xtype: 'form',
            scrollable: true,
            items:[
                {
                    xtype: 'riskAnalysisStepTwoPanel'
                }

            ]
        },
        {
            xtype: 'form',
            scrollable: true,
            items:[
                {
                    xtype: 'riskAnalysisStepOnePanel'
                }

            ]
        },
        {
            xtype: 'form',
            scrollable: true,
            items:[
                {
                    xtype: 'riskAnalysisStepThreePanel'
                }

            ]
        }
        // {
        //     xtype: 'form',
        //     items:[
        //         {
        //             html : '<h2>Thank You</h2><p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.</p>'
        //         }
        //     ]
        // }
    ],



    tbar: {
        reference: 'progress',
        defaultButtonUI: 'wizard-soft-purple',
        cls: 'wizardprogressbar',
        defaults: {
            disabled: true,
            iconAlign:'top'
        },
        layout: {
            pack: 'center'
        },
        items: [
            {
                step: 0,
                pressed: true,
                enableToggle: true,
                text: 'Step 1'
            },
            {
                step: 1,
                enableToggle: true,
                text: 'Step 2'
            },
            {
                step: 2,
                enableToggle: true,
                text: 'Results'
            }
            // {
            //     step: 3,
            //     enableToggle: true,
            //     text: 'Results'
            // }
        ]
    },

    bbar: {
        overflowHandler: 'menu',
        reference: 'navigation-toolbar',
        margin: 8,
        items: [
            '->',
            {
                text: 'Compare',
                ui: 'soft-purple',
                formBind: true,
                bind: {
                    hidden: '{!atResultPage}'
                },
                listeners: {
                    click: 'onCompareButtonClick'
                }
            },
            {
                text: 'Compose Message',
                ui: 'soft-purple',
                formBind: true,
                bind: {
                    hidden: '{!atResultPage}'
                },
                listeners: {
                    click: 'onComposeMessageClick'
                }
            },
            {
                text: 'Previous',
                ui: 'soft-purple',
                formBind: true,
                bind: {
                    disabled: '{atBeginning}'
                },
                listeners: {
                    click: 'onPreviousClick'
                }
            },
            {
                text: 'Next',
                ui: 'soft-purple',
                formBind: true,
                reference : 'nextbutton',
                bind: {
                    disabled: '{atEnd}'
                },
                listeners: {
                    click: 'onNextClick'
                }
            }
        ]
    }


});
