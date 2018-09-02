Ext.define('LearningAnalytics.model.dashboard.Course', {
    extend: 'LearningAnalytics.model.Base',

    fields: [
        { name: 'id', type: 'int' },
        { name: 'fullname', type: 'string' },
        { name: 'shortname', type: 'string' }
    ]
});
