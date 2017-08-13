/**
 * Created by n.vasileiadis on 7/25/2017.
 */

Ext.define('Thesis.Manager.model.CourseAction', {
    extend: 'Ext.data.Model',

    fields: [
        { name: 'date', type: 'string' },
        { name: 'quiz', type: 'string' },
        { name: 'view', type: 'string' },
        { name: 'enrol', type: 'string' },
        { name: 'unenrol', type: 'string' }
    ]
});