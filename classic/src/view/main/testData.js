/**
 * Created by user on 6/6/2017.
 */

Ext.define('Thesis.Manager.view.main.testList',{
    extend: 'Ext.grid.Panel',
    xtype: 'testListData',


    requires: [
        'Thesis.Manager.store.DataTest'
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
