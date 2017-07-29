/**
 * Created by n.vasileiadis on 7/29/2017.
 */
Ext.define('Thesis.Manager.model.Course', {
    extend: 'Ext.data.Model',

    fields: [
        { name: 'id', type: 'int' },
        { name: 'fullname', type: 'string' },
        { name: 'shortname', type: 'string' }
    ]
});