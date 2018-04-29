Ext.define('LearningAnalytics.view.courses.InitActivitiesTypeWidget', {
    extend: 'Ext.container.Container',
    xtype: 'initActivitiesTypeWidget',

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
                html: '<div><h2>Activities</h2><span class="x-fa fa-plus-circle"></span><div class="infodiv">Initialize Activities Type</div></div>'
            },

            listeners : {
                element  : 'el',
                click    : 'onInitActivitiesClick'
            }
        }
    ]
});