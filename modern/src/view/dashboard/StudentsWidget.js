/**
 *  Created by n.vasileiadis on 06.10.17
 */
Ext.define('LearningAnalytics.view.dashboard.StudentsWidget', {
    extend: 'Ext.container.Container',
    xtype: 'studentsWidget',

    requires: [
        'LearningAnalytics.view.widgets.WidgetSmall'
    ],

    controller: 'dashboard',
    layout: 'responsivecolumn',

    defaults: {
        xtype: 'container'
    },

    store: {
        type: 'viewStudents'
    },

    items: [
        {
            xtype: 'widgetSmall',
            containerColor: 'orange',
            userCls: 'big-50 small-50',
            height: 170,

            bind: {
                html: '<div><h2>{enrolledusercount}</h2><span class="x-fa fa-user"></span><div class="infodiv">Students</div></div>'
            }
        }
    ]
});
