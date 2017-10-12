/**
 *  Created by n.vasileiadis on 11.10.17
 */

Ext.define('LearningAnalytics.config.Runtime',{

    singleton : true,
    config : {
        baseUrl: 'http:\/\/83.212.105.139:3000',
        token: 'tyPmHwzjeRfCkCSr47xgDv-VMTr9Fg'
    },

    constructor : function(config){
        this.initConfig(config);
        Ext.Ajax.on('beforerequest', this.onBeforeRequest, this);
    },

    onBeforeRequest : function(connection, options) {
        options.url = this.getBaseUrl() + options.url;
        options.headers.Authorization = "Token token=" + this.getToken();
    }
});