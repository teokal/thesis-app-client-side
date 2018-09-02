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
    layout: 'fit',

    tools: [
        {
            type: 'refresh',
            toggleValue: false,
            hidden: false,
            tooltip:'refresh the chart with the selected students',
            listeners: {
                click: 'onRefreshToggle'
            }
        }
    ],

    items: [
        {
            xtype: 'gridpanel',
            reference: 'enrolledStudentsPanel',

            scrollable: {
                x: false,
                y: true
            },
            header: false,
            hideHeaders: false,
            readOnly : true,
            disableSelection: false,
            selModel: {
                selType: 'checkboxmodel',
                checkOnly: true,
                showHeaderCheckbox: true
            },
            plugins: 'gridfilters',

            bind: {
                store: '{enrolledStudentsList}'
            },
            columns: [
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'fullname',
                    text: 'Fullname',
                    flex: 1,
                    filter: {
                        type: 'string'
                    }
                }
            ]
        }
    ]
});
