/**
 *  Created by n.vasileiadis on 05.10.17
 */

Ext.define('LearningAnalytics.view.dashboard.Course', {
    extend: 'Ext.panel.Panel',
    xtype: 'course',

    requires: [
        'Ext.grid.Grid',
        'Ext.field.Text'
    ],
    cls: 'shadow-panel',

    controller: 'dashboard',

    title: 'Courses',
    height: 320,
    bodyPadding: 15,
    layout: 'fit',
    items: [
        {
            xtype: 'grid',
            flex: 1,
            width: '100%',
            hideHeaders: true,
            header: false,
            disableSelection:true,
            bind: {
                store: '{courses}'
            },
            columns: [
                {
                    dataIndex: 'fullname',
                    text: 'Fullname',
                    flex: 1
                }
            ]
        }
    ]
});
