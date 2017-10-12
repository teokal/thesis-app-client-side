Ext.define('LearningAnalytics.view.dashboard.Dashboard', {
    extend: 'Ext.Container',
    xtype: 'admindashboard',

    // requires: [
    //     'Ext.ux.layout.ResponsiveColumn'
    // ],

    controller: 'dashboard',
    viewModel: {
        type: 'dashboard'
    },

    layout: 'responsivecolumn',

    listeners: {
        beforerender: 'onShow'
    },

    items: [
        {
            xtype: 'course', //
            userCls: 'big-33 small-100'
        },
        {
            xtype: 'viewStudentsChart',
            userCls: 'big-60 small-100'
        },
        {
            xtype: 'studentsWidget',
            userCls: 'big-50 small-50'
        }
    ]
});
