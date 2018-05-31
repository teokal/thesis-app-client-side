/**
 *  Created by n.vasileiadis on 09.12.17
 */
Ext.define('LearningAnalytics.view.fullcalendar.FullCalendarView', {
    extend: 'Ext.container.Container',
    xtype: 'fullcalendarView',

    requires: [
        'Ext.ux.FullCalendar',
        'Ext.ux.layout.ResponsiveColumn'
    ],

    defaults: {
        xtype: 'container'
    },

    layout: 'responsivecolumn',

    items: [
        {
            xtype: 'fullcalendar',
            id: 'calendar',
            style: {
                'box-shadow': '0 0 5px rgba(0, 0, 0, 0.3)'
            },
            padding: 5,
            cls: 'big-100 small-100'
        }
    ]
});
