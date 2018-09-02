Ext.define('LearningAnalytics.Application', {
    extend: 'Ext.app.Application',

    name: 'LearningAnalytics',

    stores: [
        'NavigationTree'
    ],

    // defaultToken : 'login',

    // The name of the initial view to create. This class will gain a "viewport" plugin
    // if it does not extend Ext.Viewport.
    //
    // mainView: 'LearningAnalytics.view.main.Main',

    onAppUpdate: function () {
        Ext.Msg.confirm('Application Update', 'This application has an update, reload?',
            function (choice) {
                if (choice === 'yes') {
                    window.location.reload();
                }
            }
        );
    },

    launch: function () {
        var me = this;
        me.setDefaultToken('dashboard');
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
                if(statusMessage === true){
                    me.setDefaultToken('dashboard');
                    me.setMainView('LearningAnalytics.view.main.Main');
                } else {
                    me.setDefaultToken('login');
                    me.setMainView('LearningAnalytics.view.authentication.Login');
                }
            }
        });
    }

});
