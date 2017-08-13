/**
 * Created by n.vasileiadis on 8/13/2017.
 */

Ext.define('Thesis.Manager.model.AdminUser', {
    extend: 'Ext.data.Model',

    fields: [
        { name: 'update', type: 'string' },
        { name: 'logout', type: 'string' },
        { name: 'view', type: 'string' },
        { name: 'login', type: 'string' },
        { name: 'add', type: 'string' }
    ]
});