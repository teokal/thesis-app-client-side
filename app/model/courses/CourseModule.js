Ext.define('LearningAnalytics.model.courses.CourseModule', {
    extend: 'LearningAnalytics.model.Base',

    fields: [
        { name: 'id', type: 'int' },
        { name: 'type', type: 'string' },
        { name: 'category', type: 'string' },
        { name: 'title', type: 'string' }        
    ],

});
