/**
 * Created by user on 11/6/2017.
 */
Ext.define('Thesis.Manager.model.DataTest', {
    extend: 'Ext.data.Model',

    fields: [
        { name: 'id', type: 'int' },
        { name: 'fullname', type: 'string' },
        { name: 'shortname', type: 'string' }
    ]
});