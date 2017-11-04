/**
 *  Created by n.vasileiadis on 04.11.17
 */
Ext.define('LearningAnalytics.view.authentication.AuthenticationController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.authentication',

    onLoginButton: function() {
        var me = this;
        var preparedData = {};
        preparedData.userid = this.lookupReference('userid').getSubmitValue();
        preparedData.password = this.lookupReference('password').getSubmitValue();
        Ext.Ajax.request({
            url: '/api/1/sign_in',
            method: 'POST',
            // type: 'json',
            headers: {
                'Authorization': ''
            },
            jsonData: {
                'email' : preparedData.userid,
                'password' : preparedData.password
            },
            success: function(conn, response, options, eOpts) {
                debugger;
                Ext.Msg.alert('Success');
                me.redirectTo('dashboard', true);
            },
            failure: function(conn, response, options, eOpts) {
                Ext.Msg.alert('Failure');
                me.redirectTo('dashboard', true);
            }
        });
    }
});