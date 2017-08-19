/**
 * Created by n.vasileiadis on 8/19/2017.
 */
Ext.define('Thesis.Manager.model.CourseResourceList', {
    extend: 'Ext.data.Model',

    fields: [
        { name: 'id', type: 'int' },
        { name: 'title', type: 'string' }
    ]
});