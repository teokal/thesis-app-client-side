Ext.define('LearningAnalytics.view.dashboard.GradesWidget', {
    extend: 'Ext.container.Container',
    xtype: 'gradesWidget',

    requires: [
        'LearningAnalytics.view.widgets.WidgetSmall',
        'Ext.form.field.Display'
    ],

    defaults: {
        xtype: 'container'
    },

    items: [
        {
            xtype: 'widgetSmall',
            containerColor: 'green',
            bind: {
                html: '<div><h2>7.36/10</h2><span class="x-fa fa-bar-chart"></span><div class="infodiv">Grades</div></div>'
            }
        }
    ]
});