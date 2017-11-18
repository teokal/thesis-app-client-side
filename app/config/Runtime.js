/**
 *  Created by n.vasileiadis on 11.10.17
 */

Ext.define('LearningAnalytics.config.Runtime',{

    singleton : true,
    config : {
        baseUrl: 'http:\/\/83.212.105.139:3000'
    },

    constructor : function(config){
        debugger;
        this.initConfig(config);
        Ext.Ajax.on('requestexception', this.onRequest, this);
        Ext.Ajax.on('beforerequest', this.onBeforeRequest, this);
    },

    onBeforeRequest : function(connection, options, eOpts) {
        options.url = this.getBaseUrl() + options.url;
        if (options.method === 'GET'){
            options.headers.Authorization = "Token token=" + Ext.util.Cookies.get('AccessToken');
        }
    },

    onRequest : function(conn, response, options, eOpts) {
        if (response){
            if (response.status === 401){
                Ext.Msg.alert("Session timeout", "", function()
                {
                    Ext.create('LearningAnalytics.view.authentication.Login');
                    window.location.assign('');
                });
            }
        }
    },

    checkIfLogin: function () {
        Ext.Ajax.request({
            url: '/api/1/test',
            method: 'GET',
            headers: {
                'Authorization': ''
            },
            callback:function(records, operation, success){
                var jsonData = Ext.util.JSON.decode(success.responseText);
                var statusMessage = jsonData.response.status;

                if(statusMessage === 'success'){
                    window.location.assign('#dashboard');
                    return true;
                } else {
                    debugger;
                    window.location.assign('#login');
                }
            }
        });
        return false;
    },

    getContainerViewWidth: function() {
        return document.getElementById('container-view').clientWidth;
    }

});