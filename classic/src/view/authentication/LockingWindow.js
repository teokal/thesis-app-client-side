/**
 *  Created by n.vasileiadis on 04.11.17
 */
Ext.define('LearningAnalytics.view.authentication.LockingWindow', {
    extend: 'Ext.window.Window',
    xtype: 'lockingwindow',

    requires: [
        'LearningAnalytics.view.authentication.AuthenticationController',
        'Ext.layout.container.VBox'
    ],

    cls: 'auth-locked-window',
    closable: false,
    resizable: false,
    autoShow: true,
    titleAlign: 'center',
    maximized: true,
    modal: true,

    layout: {
        type: 'vbox',
        align: 'center',
        pack: 'center'
    },

    controller: 'authentication'
});
