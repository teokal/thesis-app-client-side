/**
 * Created by user on 6/6/2017.
 */

Ext.define('Thesis.Manager.view.main.testData',{
    // extend: 'Ext.Container',
    extend: 'Ext.grid.Panel',
    xtype: 'testListData',

    requires: [
        'Thesis.Manager.store.DataTests',
        'Ext.layout.container.Border'
    ],

    controller: 'dataController',
    viewModel: {
        type: 'dataModel'
    },

    // listeners: {
    //     show: 'onShow'
    // },
    listeners: {
        rowdblclick: 'onEdit'
    },

    store: {
        type: 'dataTests',
        autoLoad: true
    },

    bind: {
        store: '{rec.data}'
    },
    layout: 'border',
    width: 500,
    height: 400,

    // items: [
    //     {
    //         cls: 'middlecolumn',
    //         bodyCls: 'transparent',
    //         // xtype: 'panel',
    //         // layout: 'fit',
    //         // region: 'west',
    //         xtype: 'panel',
    //         // xtype: 'array-grid',
    //         layout: 'fit',
    //         region: 'west',
    //         flex: 1,
    //         minWidth: 500,
    //         items: [{
    //
    //             xtype: 'grid',
    //             // layout: {
    //             //     type: 'vbox',
    //             //     align: 'stretch'
    //             // },
    //             // items: [{
    //                 columns: [
    //                     { text: 'ID',  dataIndex: 'id' },
    //                     { text: 'Message',  dataIndex: 'message' },
    //                     { text: 'Status',  dataIndex: 'status' }
    //                 ]
    //
    //         // }]
    //         }]
    //
    //
    //     },
    //     {
    //         xtype: 'form',
    //         reference: 'typeForm',
    //         region: 'center',
    //         collapseDirection: 'left',
    //         collapsible: true,
    //         collapseMode: 'mini',
    //         hideCollapseTool: true,
    //         preventHeader: true,
    //         collapsed: true,
    //         layout: 'fit',
    //         flex: 6
    //         // items: [
    //         //     {
    //         //         xtype: 'lineChart',
    //         //         layout: 'fit'
    //         //     }
    //         //     ]
    //
    //     }
    // ],
    //
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
    //                         bind: '{rec.id}'
    //                         // dataIndex: 'id'
    //                     }]
    //             }]
    //     }]

    columns: [
        { text: 'ID',  dataIndex: 'id', flex: 0.2 },
        { text: 'Fullname',  dataIndex: 'fullname', flex: 1 },
        { text: 'Shortname',  dataIndex: 'shortname', flex: 1 }
        // { text: 'Email', dataIndex: 'email', flex: 1 },
        // { text: 'Phone', dataIndex: 'phone', flex: 1 }
    ]

});
