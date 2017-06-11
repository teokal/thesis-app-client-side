/**
 * Created by user on 6/6/2017.
 */
/**
 * This view is an example list of people.
 */

Ext.define('Thesis.Manager.view.main.testList',{
    extend: 'Ext.grid.Panel',
    xtype: 'testListData',


    requires: [
        'Thesis.Manager.store.DataTest',
    ],
    title: 'dataTest',

    store: {
        type: 'dataTest',
        autoLoad: true
    },

    columns: [
        { text: 'Name',  dataIndex: 'name' },
        { text: 'Email', dataIndex: 'email', flex: 1 },
        { text: 'Phone', dataIndex: 'phone', flex: 1 }
    ]


});
