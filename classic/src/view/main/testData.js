/**
 * Created by user on 6/6/2017.
 */

Ext.define('Thesis.Manager.view.main.testData',{
    // extend: 'Ext.Container',
    extend: 'Ext.grid.Panel',
    xtype: 'testListData',

    requires: [
        'Thesis.Manager.store.DataTests'

    ],

    controller: 'dataController',
    viewModel: {
        type: 'dataModel'
    },
    listeners: {
        show: 'onShow'
    },

    // title: 'dataTest',
    //
    store: {
        type: 'dataTests',
        autoLoad: true
    },

    bind: {
        store: '{rec.data}'
    },

    // items: [
    //     {
    //         xtype: 'panel',
    //         cls: 'form-separator',
    //         layout: 'vbox',
    //         title: 'Common Informations',
    //
    //         items: [
    //             {
    //                 xtype: 'fieldcontainer',
    //                 layout: 'hbox',
    //                 items: [
    //                     {
    //                         xtype: 'textfield',
    //                         padding: '0 0 0 10',
    //                         labelSeparator: '',
    //                         msgTarget: 'side',
    //                         labelAlign: 'top',
    //                         name: 'id',
    //                         fieldLabel: 'ID',
    //                         width: 60,
    //                         readOnly: true,
    //                         emptyText: ' ',
    //                         dataIndex: 'id'
    //                     }]
    //             }]
    //     }]
    //
    columns: [
        { text: 'ID',  dataIndex: 'id' },
        { text: 'Message',  dataIndex: 'message' },
        { text: 'ID',  dataIndex: 'status' }
        // { text: 'Email', dataIndex: 'email', flex: 1 },
        // { text: 'Phone', dataIndex: 'phone', flex: 1 }
    ]

});
