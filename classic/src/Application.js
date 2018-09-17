Ext.define('LearningAnalytics.Application', {
    extend: 'Ext.app.Application',

    name: 'LearningAnalytics',

    stores: [
        'NavigationTree'
    ],

    requires: [
        'LearningAnalytics.config.Runtime'
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
        LearningAnalytics.config.Runtime.checkIfLogin( function(status) {
            if (status === true) {
                me.setDefaultToken('dashboard');
                me.setMainView('LearningAnalytics.view.main.Main');
            } else {
                me.setDefaultToken('login');
                me.setMainView('LearningAnalytics.view.authentication.Login');
            }
        })
    }

});
