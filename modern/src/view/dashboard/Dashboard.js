Ext.define('LearningAnalytics.view.dashboard.Dashboard', {
    extend: 'Ext.Container',
    xtype: 'admindashboard',

    controller: 'dashboard',
    viewModel: {
        type: 'dashboard'
    },

    cls: 'dashboard',

    scrollable: true,
    listeners: {
        beforerender: 'onShow'
    },

    items: [
        {
            xtype: 'course', //
            userCls: 'big-60 small-100 dashboard-item shadow'
        },
        {
            xtype: 'viewStudentsChart',
            userCls: 'big-60 small-100 dashboard-item shadow'
        },
        {
            xtype: 'studentsWidget',
            userCls: 'big-20 small-50 dashboard-item shadow'
        }
    ]
});
