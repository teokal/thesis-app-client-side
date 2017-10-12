/**
 *  Created by n.vasileiadis on 05.10.17
 */

Ext.define('LearningAnalytics.view.dashboard.Course', {
    extend: 'Ext.panel.Panel',
    xtype: 'course',

    requires: [
        'Ext.grid.Grid',
        // 'Ext.grid.View',
        'Ext.field.Text',
        'Ext.Button',
        'Ext.grid.plugin.MultiSelection'
    ],
    cls: 'shadow-panel',

    controller: 'dashboard',

    title: 'Courses',
    height: 320,
    bodyPadding: 15,
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
