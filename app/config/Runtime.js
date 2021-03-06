/**
 *  Created by n.vasileiadis on 11.10.17
 */

Ext.define('LearningAnalytics.config.Runtime',{

    singleton : true,
    config : {
        baseUrl: 'http:\/\/localhost:3000'
    },

    constructor : function(config){
        this.initConfig(config);
        Ext.Ajax.on('requestexception', this.onRequest, this);
        Ext.Ajax.on('beforerequest', this.onBeforeRequest, this);
    },

    onBeforeRequest : function(connection, options, eOpts) {
        options.url = this.getBaseUrl() + options.url;
        if (options.url.indexOf('sign_in') === -1) {
            var object = Ext.util.Cookies.get('AccessToken');
            var cookies = JSON.parse(object);
            var token = null;
            if (cookies !== null) {
                token = cookies.access_token
            }
            options.headers.Authorization = "Token token=" + token;
        }
    },

    onRequest : function(conn, response, options, eOpts) {
        if (response){
            if (response.status === 401){
                Ext.Msg.alert({
                    title:'Session timeout',
                    message: 'Please login',
                    buttons: Ext.Msg.OK,
                    icon: Ext.Msg.INFO,
                    draggable: false,
                    fn: function(btn) {
                        Ext.create('LearningAnalytics.view.authentication.Login');
                        window.location.assign('');
                    }
                });
            }
        }
    },

    checkIfLogin: function (callback) {
        Ext.Ajax.request({
            url: '/api/1/test',
            method: 'GET',
            useDefaultXhrHeader: false,
            cors: true,
            headers: {
                'Authorization': ''
            },
            writer: {
                type: 'json',
                allowSingle: true,
                writeAllFields: true
            },
            reader: {
                type: 'json',
                rootProperty: 'response.data'
            },
            callback:function(records, operation, success){
                var jsonData = Ext.util.JSON.decode(success.responseText);
                var statusMessage = jsonData.response.data.authorized;
                callback(statusMessage);
            }
        });
    },

    getContainerViewWidth: function() {
        return document.getElementById('container-view').clientWidth;
    },

    // set width and height with animation.
    setViewWidthHeight: function(view, widthValue, heightValue) {
        var viewWidth = LearningAnalytics.config.Runtime.getContainerViewWidth();
        var viewHeight = view.getHeight();
        view.animate({dynamic: true, to: {
            width: viewWidth * widthValue - 40,
            height: viewHeight * heightValue
        }});
    }
});
