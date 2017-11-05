Ext.define('LearningAnalytics.view.dashboard.Dashboard', {
    extend: 'Ext.container.Container',
    xtype: 'admindashboard',

    requires: [
        'Ext.ux.layout.ResponsiveColumn',
        'Ext.chart.interactions.ItemHighlight'
    ],

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
            style: {
                'box-shadow': '0 0 5px rgba(0, 0, 0, 0.3)'
            },
            cls: 'big-33 small-100'
        },
        {
            xtype: 'viewStudentsChart',
            style: {
                'box-shadow': '0 0 5px rgba(0, 0, 0, 0.3)'
            },
            cls: 'big-60 small-100'
        },
        {
            xtype: 'studentsWidget',
            userCls: 'big-50 small-50'
        },
        {
            xtype: 'gradesWidget',
            userCls: 'big-50 small-50'
        }
    ]
});
