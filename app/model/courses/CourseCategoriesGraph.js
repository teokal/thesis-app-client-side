Ext.define('LearningAnalytics.model.courses.CourseCategoriesGraph', {
    extend: 'LearningAnalytics.model.Base',

    fields: [
        { name: 'category_id', type: 'int' },
        { name: 'category_name', type: 'string' },
        { name: 'counter', type: 'int' }    
    ],

});
