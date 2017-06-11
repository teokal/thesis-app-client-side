/**
 * Created by user on 11/6/2017.
 */
Ext.define('Thesis.Manager.model.DataTest', {
    extend: 'Ext.data.Model',
    // extend: 'Ext.grid.Panel',

    schema: {
        namespace: 'Thesis.Manager.model'
    },
    fields: [
        'name', 'email', 'phone'
    ]
});