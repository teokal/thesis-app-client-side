Ext.define('LearningAnalytics.profile.Tablet', {
    extend: 'Ext.app.Profile',

    requires: [

    ],

    isActive: function () {
        return !Ext.platformTags.phone;
    }
});
