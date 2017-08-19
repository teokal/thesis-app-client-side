/**
 * Created by n.vasileiadis on 8/19/2017.
 */
Ext.define('Thesis.Manager.model.CourseResource', {
    extend: 'Ext.data.Model',

    fields: [
        { name: 'date', type: 'string' },
        { name: 'view', type: 'int' }
    ]
});