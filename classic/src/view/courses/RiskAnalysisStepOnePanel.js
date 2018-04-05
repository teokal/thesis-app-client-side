/**
 *  Created by n.vasileiadis on 17.03.18
 */
Ext.define('LearningAnalytics.view.courses.RiskAnalysisStepOnePanel', {
    extend: 'Ext.form.Panel',
    xtype: 'riskAnalysisStepOnePanel',
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

    // listeners: {
    //     afterrender: 'onBeforeRenderRiskAnalysisStepOne'
    // },

    items: [{
            html : '<p>Please select the type of each activity. If you don\'t select a type for an activity, the default value will be "None". </p>'
        },
        {
            layout: {
                type:'hbox',
                align:'stretch'
            },
            items: [{
                xtype: 'button',
                text: 'Add Column',
                maxWidth: 200,
                ui: 'soft-green',
                margin: '0 30 5 0',
                flex: 1,
                listeners: {
                    click: 'onAddColumn'
                }
            },{
                xtype: 'button',
                text: 'Remove Column',
                ui: 'soft-red',
                maxWidth: 200,
                margin: '0 30 5 0',
                flex: 1
                // listeners: {
                //     click: 'onAddColumn'
                // }
            }
            ]
        },
        {
            xtype: 'gridpanel',
            reference: 'riskAnalysisGridPanel',
            plugins: 'gridfilters',
            header: false,
            hideHeaders: false,
            readOnly : false,
            disableSelection: false,
            scrollable: {
                x: true,
                y: true
            },
            viewConfig:{
                markDirty:false
            },
            bind: {
                store: '{riskAnalysisScorms}'
            },
            columns: [
                {
                    dataIndex: 'title',
                    text: 'Activity',
                    flex: 1
                },
                {
                    dataIndex: 'page',
                    text: 'Slides',
                    // selType: 'checkboxmodel',
                    width: 130,
                    renderer: function(value) {
                        return '<span class="x-fa fa-'+ (value ? 'check-square-o' : 'square-o') +'"></span>';
                    }
                },
                {
                    dataIndex: 'quiz',
                    text: 'Quiz',
                    width: 130,
                    renderer: function(value) {
                        return '<span class="x-fa fa-'+ (value ? 'check-square-o' : 'square-o') +'"></span>';
                    }
                },
                {
                    dataIndex: 'none',
                    text: 'None',
                    width: 130,
                    renderer: function(value) {
                        return '<span class="x-fa fa-'+ (value ? 'check-square-o' : 'square-o') +'"></span>';
                    }
                }

            ],
            listeners: {
                'cellclick': 'onRiskAnalysisGridCellItemClick'
                // afterlayout: function() {
                //     debugger;
                // }

            }

        }
    ]

});
