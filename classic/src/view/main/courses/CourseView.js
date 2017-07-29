/**
 * Created by n.vasileiadis on 7/29/2017.
 */

Ext.define('Thesis.Manager.view.main.courses.CourseView',{
    // extend: 'Ext.container.Container',
    extend: 'Ext.panel.Panel',
    xtype: 'courseView',

    requires: [
        'Thesis.Manager.store.Courses',
        'Thesis.Manager.store.CourseActions',
        'Ext.layout.container.Border'
        // 'Ext.chart.Cartesian'
    ],

    controller: 'courseController',

    store: {
        // type: 'dataTests',
        type: 'courses',
        autoLoad: true
    },

    viewModel: {
        type: 'courseModel'
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
            // viewModel: {
            //     type: 'dataModel'
            // },
            store: {
                type: 'courses',
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
            // height: 800,
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
            listeners: {
                afterrender: 'onAfterRender'
            },

            tbar: [
                '->',
                {
                    text: 'Reload Data',
                    handler: 'onReloadData'
                }
            ],

            items: [{
                // xtype: 'area-basic'
                xtype: 'cartesian',
                reference: 'chart',
                width: '100%',
                height: 600,
                insetPadding: '40 40 40 40',
                // bind: {
                //     store: '{list}'
                // },

                store: {
                    // type: 'gdp',
                    type: 'courseActions',
                    autoLoad: true
                },
                legend: {
                    docked: 'bottom'
                },
                // sprites: [{
                //     type: 'text',
                //     text: 'Economic Development in the USA, Japan and China',
                //     fontSize: 22,
                //     width: 100,
                //     height: 30,
                //     x: 40, // the sprite x position
                //     y: 20  // the sprite y position
                // }, {
                //     type: 'text',
                //     text: 'Data: Gross domestic product based on purchasing-power-parity (PPP) valuation of country GDP. Figures for FY2014 are forecasts.',
                //     fontSize: 10,
                //     x: 12,
                //     y: 525
                // }, {
                //     type: 'text',
                //     text: 'Source: http://www.imf.org/ World Economic Outlook Database October 2014.',
                //     fontSize: 10,
                //     x: 12,
                //     y: 540
                // }],
                axes: [{
                    type: 'numeric',
                    position: 'left',
                    fields: '{list.value}',
                    // fields: ['china', 'japan', 'usa'],

                    title: 'GDP in billions of US Dollars',
                    grid: true,
                    minimum: 0,
                    maximum: 20000,
                    majorTickSteps: 10,
                    renderer: 'onAxisLabelRender'
                }, {
                    type: 'category',
                    position: 'bottom',
                    fields: '{list.date}',
                    // fields: 'year',
                    label: {
                        rotate: {
                            degrees: -45
                        }
                    }
                }]


                // bind: '{rec.value}',
                    // width: 60,
                    // heigth: 100,
                    // readOnly: true,
                    // xtype: 'fieldcontainer',
                    // layout: 'hbox',
                    // items: [
                    //     {
                    //         xtype: 'textfield',
                    //         padding: '0 0 0 10',
                    //         labelSeparator: '',
                    //         msgTarget: 'side',
                    //         labelAlign: 'top',
                    //         name: 'id',
                    //         fieldLabel: 'ID',
                    //         width: 600,
                    //         // readOnly: true,
                    //         emptyText: ' ',
                    //         bind: '{filterText}',
                    //         // dataIndex: 'value'
                    //
                    //             change: 'filterChanged'
                    //         },
                    //         bind: {
                    //             readOnly: '{readOnly}'
                    //         }
                    //     },
                    //     {
                    //         xtype: 'button',
                    //         text: 'FILTER',
                    //         handler: 'filter'
                    //     },
                    //     {
                    //         xtype: 'grid',
                    //         flex: 1,
                    //         height: 200,
                    //         bind: {
                    //             store: '{list}',
                    //         },
                    //         columns: [
                    //             { text: 'Date',  dataIndex: 'date', flex: 0.2 },
                    //             { text: 'Value',  dataIndex: 'value', flex: 1 }
                    //         ],
                    //         listeners: {
                    //             selectionchange: 'listCelChanged'
                    //         }
                    //     },
                    //     {
                    //         xtype: 'grid',
                    //         flex: 1,
                    //         height: 200,
                    //         bind: {
                    //             store: '{nestedList}',
                    //         },
                    //         columns: [
                    //             { text: 'Date',  dataIndex: 'date', flex: 0.2 },
                    //             { text: 'Value',  dataIndex: 'value', flex: 1 }
                    //         ],
                    //     }
                    //     /*
                    //      {
                    //      xtype: 'textfield',
                    //      padding: '0 0 0 10',
                    //      labelSeparator: '',
                    //      msgTarget: 'side',
                    //      labelAlign: 'top',
                    //      name: 'id',
                    //      fieldLabel: 'ID',
                    //      width: 600,
                    //      readOnly: true,
                    //      emptyText: ' ',
                    //      bind: '{firstRec.date}'
                    //      // dataIndex: 'value'
                    //      }
                    //      */
                    // ]
                }]


        }

    ]
});
