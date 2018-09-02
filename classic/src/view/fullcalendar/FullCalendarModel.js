
Ext.define('LearningAnalytics.view.fullcalendar.FullCalendarModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.fullcalendar',

    requires: [
        'Ext.data.Store',
        'Ext.data.field.String'
    ],

    stores: {
        calendarEvents: {
            autoLoad: true,
            type: 'calendarEvents'
        }
    },

    data: {
        events: null
    }
});
