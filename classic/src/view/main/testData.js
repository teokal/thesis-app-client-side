/**
 * Created by user on 6/6/2017.
 */

Ext.define('Thesis.Manager.view.main.testData',{
    // extend: 'Ext.container.Container',
    extend: 'Ext.panel.Panel',
    xtype: 'testListData',

    requires: [
        'Thesis.Manager.store.DataTests',
        'Ext.layout.container.Border'
    ],

    controller: 'dataController',

    store: {
        type: 'dataTests',
        autoLoad: true
    },

    viewModel: {
        type: 'dataModel'
    },

    listeners: {
        // rowdblclick: 'onEdit',
        render: 'onShow'
    },

    layout: {
        type : 'border',
        align : 'stretch'
    },
    flex: 1,

    height: Ext.getBody().getViewSize().height,

    items: [
        {
            xtype:'grid',
            region: 'center',
            flex: 1,
            width: 500,
            height: 400,

            minWidth: 290,
            layout: 'fit',
            viewModel: {
                type: 'dataModel'
            },
            store: {
                type: 'dataTests',
                autoLoad: true
            },

            columns: [
                { text: 'ID',  dataIndex: 'id', flex: 0.2 },
                { text: 'Fullname',  dataIndex: 'fullname', flex: 1 },
                { text: 'Shortname',  dataIndex: 'shortname', flex: 1 }

            ],

            listeners: {
                // rowdblclick: 'onEdit',
                selectionchange: 'onEdit'
            }

        },
        {
                xtype: 'panel',
                reference: 'coursesActionPanel',
                region: 'east',
                title: 'Common Informations',
                width: 500,
                height: 400,
                flex: 3,
                collapseDirection: 'left',
                collapsible: true,
                collapseMode: 'mini',
                hideCollapseTool: true,
                preventHeader: true,
                collapsed: true,
            //
                minWidth: 200,
                layout: 'fit',
                items: [
                    {
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        items: [
                            {
                                xtype: 'textfield',
                                padding: '0 0 0 10',
                                labelSeparator: '',
                                msgTarget: 'side',
                                labelAlign: 'top',
                                name: 'id',
                                fieldLabel: 'ID',
                                width: 60,
                                readOnly: true,
                                emptyText: ' ',
                                bind: '{rec.id}'
                                // dataIndex: 'id'
                            }]
                    }]
            }
    ]
});
