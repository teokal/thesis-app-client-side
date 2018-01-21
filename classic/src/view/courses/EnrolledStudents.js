/**
 *  Created by n.vasileiadis on 31.10.17
 */


Ext.define('LearningAnalytics.view.courses.EnrolledStudents', {
    extend: 'Ext.panel.Panel',
    xtype: 'enrolledStudents',

    requires: [
        'Ext.grid.Panel',
        'Ext.grid.View',
        'Ext.form.field.Text'
    ],
    cls: 'shadow-panel',

    title: 'Enrolled Students',
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
                y: true
            },
            bind: {
                store: '{list}'
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
