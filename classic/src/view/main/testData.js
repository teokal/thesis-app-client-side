/**
 * Created by user on 6/6/2017.
 */

Ext.define('Thesis.Manager.view.main.testData',{
    extend: 'Ext.grid.Panel',
    xtype: 'testListData',

    listeners: {
        show: 'onShow'
    },

    requires: [
        'Thesis.Manager.store.DataTests'
    ],
    title: 'dataTest',

    store: {
        type: 'dataTests',
        autoLoad: true
    },


    columns: [
        { text: 'ID',  dataIndex: 'id' }
        // { text: 'Email', dataIndex: 'email', flex: 1 },
        // { text: 'Phone', dataIndex: 'phone', flex: 1 }
    ]

});
