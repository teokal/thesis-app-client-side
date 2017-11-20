/**
 *  Created by n.vasileiadis on 04.11.17
 */
Ext.define('LearningAnalytics.view.authentication.Dialog', {
    extend: 'Ext.form.Panel',
    xtype: 'authdialog',

    requires: [
        // 'LearningAnalytics.view.authentication.AuthenticationController',
        // 'LearningAnalytics.view.main.MainController',
        'Ext.form.Panel'
    ],

    controller: 'authentication',
    // controller: 'main',

    viewModel: {
        type: 'authentication'
    },

    /*
     * Seek out the first enabled, focusable, empty textfield when the form is focused
     */
    defaultFocus: 'textfield:focusable:not([hidden]):not([disabled]):not([value])',

    /**
     * @cfg  [autoComplete=false]
     * Enables browser (or Password Managers) support for autoCompletion of User Id and
     * password.
     */

    autoComplete : true,

    initComponent: function () {
        var me = this, listen;

        if (me.autoComplete) {
            // Use standard FORM tag for detection by browser or password tools
            me.autoEl = Ext.applyIf(
                me.autoEl || {},
                {
                    tag: 'form',
                    name: 'authdialog',
                    method: 'post'
                });
        }

        me.addCls('auth-dialog');
        me.callParent();

        if (me.autoComplete) {
            listen = {
                afterrender : 'doAutoComplete',
                scope : me,
                single : true
            };

            Ext.each(me.query('textfield'), function (field) {
                field.on(listen);
            });
        }
    },

    doAutoComplete : function(target) {
        if (target.inputEl && target.autoComplete !== false) {
            target.inputEl.set({ autocomplete: 'on' });
        }
    }
});
