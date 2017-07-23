/**
 * Created by n.vasileiadis on 7/23/2017.
 */
Ext.define('Thesis.Manager.model.CourseActions', {
    extend: 'Ext.data.Model',

    fields: [
        { name: 'dates', type: 'string' },
        { name: 'count', type: 'int' }
    ]
});