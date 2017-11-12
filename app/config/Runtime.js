/**
 *  Created by n.vasileiadis on 11.10.17
 */

Ext.define('LearningAnalytics.config.Runtime',{

    singleton : true,
    config : {
        baseUrl: 'http:\/\/83.212.105.139:3000',
        token: ''
    },

    constructor : function(config){
        this.initConfig(config);
        Ext.Ajax.on('beforerequest', this.onBeforeRequest, this);
    },

    onBeforeRequest : function(connection, options) {
        // debugger;
        options.url = this.getBaseUrl() + options.url;
        if (options.method === 'GET'){
            options.headers.Authorization = "Token token=" + this.getToken();
        }
    }
});