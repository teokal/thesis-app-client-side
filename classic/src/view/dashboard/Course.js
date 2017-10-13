/**
 *  Created by n.vasileiadis on 05.10.17
 */

Ext.define('LearningAnalytics.view.dashboard.Course', {
    extend: 'Ext.panel.Panel',
    xtype: 'course',

    requires: [
        'Ext.grid.Panel',
        'Ext.grid.View',
        'Ext.form.field.Text',
        'Ext.button.Button',
        'Ext.selection.CheckboxModel'
    ],
    cls: 'shadow-panel',

    controller: 'dashboard',

    title: 'Courses',
    height: 380,
    bodyPadding: 15,
    disableSelection:true,
    layout: 'fit',
    items: [
        {
            xtype: 'gridpanel',
            header: false,
            hideHeaders: true,
            scrollable: {
                x: false,
                y: false
            },
            bind: {
                store: '{courses}'
            },
            columns: [
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'fullname',
                    text: 'Fullname',
                    flex: 1
                }
            ]
        }
    ]
});
