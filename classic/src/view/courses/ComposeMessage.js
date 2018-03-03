/**
 *  Created by n.vasileiadis on 03.03.18
 */

Ext.define('LearningAnalytics.view.courses.ComposeMessage', {
    extend: 'Ext.form.Panel',
    xtype: 'composeMessage',
    requires: [
        'Ext.button.Button',
        'Ext.form.field.Text',
        'Ext.form.field.File',
        'Ext.form.field.HtmlEditor'
    ],

    cls: 'email-compose',

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
        // {
        //     xtype: 'textfield',
        //     fieldLabel: 'To'
        // },
        {
            xtype: 'htmleditor',
            id: 'composeMessageEditor',
            reference: 'composeMessageEditor',

            // Make tips align neatly below buttons.
            buttonDefaults: {
                tooltip: {
                    align: 't-b',
                    anchor: true
                }
            },
            flex: 1,
            minHeight: 100,
            labelAlign: 'top',
            fieldLabel: 'Message'
        }
    ],

    bbar: {
        overflowHandler: 'menu',
        items: [
            '->',
            {
                xtype: 'button',
                ui: 'soft-red',
                text: 'Discard',
                handler: 'onComposeDiscardClick'
            },
            {
                xtype: 'button',
                ui: 'soft-green',
                text: 'Send',
                handler: 'onComposeSendClick'

            }
        ]
    }
});
