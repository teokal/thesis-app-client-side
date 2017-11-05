Ext.define('LearningAnalytics.view.dashboard.GradesWidget', {
    extend: 'Ext.container.Container',
    xtype: 'gradesWidget',

    requires: [
        'LearningAnalytics.view.widgets.WidgetSmall',
        'Ext.slider.Single',
        'Ext.form.field.Display'
    ],

    layout: 'responsivecolumn',

    defaults: {
        xtype: 'container'
    },

    items: [
        {
            xtype: 'widgetSmall',
            containerColor: 'green',
            userCls: 'big-50 small-50',
            // height: 170,
            bind: {
                html: '<div><h2>7.36/10</h2><span class="x-fa fa-bar-chart"></span><div class="infodiv">Grades</div></div>'
            }
        }
    ]
});