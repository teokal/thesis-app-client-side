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
        Ext.Ajax.request({
            url: '/api/1/test',
            method: 'GET',
            headers: {
                'Authorization': ''
            },
            callback:function(records, operation, success){
                var jsonData = Ext.util.JSON.decode(success.responseText);
                var statusMessage = jsonData.response.data.authorized;

                if(statusMessage === true){
                    me.setDefaultToken('dashboard');
                    me.setMainView('LearningAnalytics.view.main.Main');
                    // window.location.assign('#dashboard');
                    // return true;
                } else {
                    me.setDefaultToken('login');
                    me.setMainView('LearningAnalytics.view.authentication.Login');
                }
            }
        });
    }

});
