/**
 *  Created by n.vasileiadis on 06.10.17
 */

Ext.define('LearningAnalytics.view.dashboard.StudentsWidget', {
    extend: 'Ext.container.Container',
    xtype: 'studentsWidget',

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
            containerColor: 'orange',
            bind: {
                html: '<div><h2>{enrolledusercount}</h2><span class="x-fa fa-user"></span><div class="infodiv">Students</div></div>'
            }
        }
    ]
});
