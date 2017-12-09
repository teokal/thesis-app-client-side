/**
 *  Created by n.vasileiadis on 09.12.17
 */
Ext.define('LearningAnalytics.view.fullcalendar.FullCalendarView', {
    extend: 'Ext.container.Container',
    xtype: 'fullcalendarView',

    requires: [
        'Ext.ux.FullCalendar'
    ],

    defaults: {
        xtype: 'container'
    },

    items: [
        {
            xtype: 'fullcalendar',
            id: 'calendar',
            flex: 1
        }
    ]
});
