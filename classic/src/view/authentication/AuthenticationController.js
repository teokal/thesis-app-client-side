/**
 *  Created by n.vasileiadis on 04.11.17
 */
Ext.define('LearningAnalytics.view.authentication.AuthenticationController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.authentication',

    requires: [
        'LearningAnalytics.config.Runtime'
    ],

    onLoginButton: function() {
        var preparedData = {};
        preparedData.userid = this.lookupReference('userid').getSubmitValue();
        preparedData.password = this.lookupReference('password').getSubmitValue();
        Ext.Ajax.request({
            url: '/api/1/sign_in',
            method: 'POST',
            // type: 'json',
            jsonData: {
                'username' : preparedData.userid,
                'password' : preparedData.password
            },
            callback:function(records, operation, success){
                var jsonData = Ext.util.JSON.decode(success.responseText);
                var statusMessage = jsonData.response.status;

                if(statusMessage === 'success'){
                    var object = {
                        'first_name' : jsonData.response.user.first_name,
                        'last_name' : jsonData.response.user.last_name,
                        'full_name' : jsonData.response.user.full_name,
                        'access_token' : jsonData.response.user.access_token,
                        'picture_url' : jsonData.response.user.picture_url,
                        'username' : jsonData.response.user.username
                    };
                    var cookies = JSON.stringify(object);
                    Ext.util.Cookies.set('AccessToken', cookies);
                    Ext.create('LearningAnalytics.view.main.Main');
                } else {
                    Ext.Msg.alert(jsonData.response.data);
                    // me.redirectTo('dashboard', true);
                }
            }
        });
    }
});