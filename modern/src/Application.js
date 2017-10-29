/**
 * The main application class. An instance of this class is created by app.js when it
 * calls Ext.application(). This is the ideal place to handle application launch and
 * initialization details.
 */
Ext.define('LearningAnalytics.Application', {
    extend: 'Ext.app.Application',

    name: 'LearningAnalytics',

    defaultToken : 'dashboard',

    mainView: 'LearningAnalytics.view.main.Main',

    profiles: [
        'Phone',
        'Tablet'
    ],

    stores: [
        'NavigationTree'
    ]
});
