
Ext.define('LearningAnalytics.store.calendar.CalendarEvents', {
    extend: 'Ext.data.Store',

    storeId: 'CalendarEvents',

    alias: 'store.calendarEvents',

    model: 'LearningAnalytics.model.calendar.CalendarEvent',

    proxy: {
        type: 'ajax',
        actionMethods: {
            read: 'GET'
        },
        useDefaultXhrHeader: false,
        cors: true,
        headers: {
            'Authorization': ''
        },
        api: {
            read: '/api/1/events'
        },
        writer: {
            type: 'json',
            allowSingle: true,
            writeAllFields: true
        },
        reader: {
            type: 'json',
            rootProperty: 'response.events'
        }
    }
});
