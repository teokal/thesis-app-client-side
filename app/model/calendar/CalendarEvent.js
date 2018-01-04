Ext.define('LearningAnalytics.model.calendar.CalendarEvent', {
    extend: 'LearningAnalytics.model.Base',

    fields: [
        { name: 'title', type: 'string' },
        { name: 'start', type: 'string' },
        { name: 'end', type: 'string' },
        { name: 'allDay', type: 'string' },
        { name: 'description', type: 'string' }
    ]
});
