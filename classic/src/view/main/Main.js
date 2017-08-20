/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting automatically applies the "viewport"
 * plugin causing this view to become the body element (i.e., the viewport).
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('Thesis.Manager.view.main.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'app-main',

    requires: [
        'Ext.plugin.Viewport',
        'Ext.window.MessageBox',

        'Thesis.Manager.view.main.MainController',
        'Thesis.Manager.view.main.MainModel',
        'Thesis.Manager.view.main.List'
    ],

    controller: 'main',
    viewModel: 'main',

    ui: 'navigation',

    tabBarHeaderPosition: 1,
    titleRotation: 0,
    tabRotation: 0,

    header: {
        layout: {
            align: 'stretchmax'
        },
        title: {
            bind: {
                text: '{name}'
            },
            flex: 0
        },
        iconCls: 'fa-th-list'
    },

    tabBar: {
        flex: 1,
        layout: {
            align: 'stretch',
            overflowHandler: 'none'
        }
    },

    responsiveConfig: {
        tall: {
            headerPosition: 'top'
        },
        wide: {
            headerPosition: 'left'
        }
    },

    defaults: {
        bodyPadding: 20,
        tabConfig: {
            plugins: 'responsive',
            responsiveConfig: {
                wide: {
                    iconAlign: 'left',
                    textAlign: 'left'
                },
                tall: {
                    iconAlign: 'top',
                    textAlign: 'center',
                    width: 120
                }
            }
        }
    },

    items: [{
        title: 'Home',
        iconCls: 'fa-home',
        // The following grid shares a store with the classic version's grid as well!
        // items: [{
        //     xtype: 'mainlist'
        // }]
        bind: {
            html: '<h1>Learning Analytics</h1>' +
            '<h3>Development of a Web-based Application for the Analysis of e-Learning Data in Moodle Using Visualization Techniques.</h3>' +
            '<h4>Develop by: </h4>' +
            '<ul> ' +
            '<li>Kalatzis Theodoros</li>' +
            '<li>Vasileiadis Nikoloas</li> ' +
            '</ul>' +
            '<h4>Supervisor: </h4>' +
            '<ul> ' +
            '<li>Psaromiligkos Ioannis</li>' +
            '</ul>' +
            '<h4>Open Source (GPLv3) License</h4>'
        }
    }, {
        title: 'Admin',
        iconCls: 'fa-user',
        // adminUserView
        items: [{
            xtype: 'adminUserView'
        }]
    }, {
        title: 'Courses',
        iconCls: 'fa-book',
        items: [{
            xtype: 'courseView'
        }]
        //courseView
    }, {
        title: 'Settings',
        iconCls: 'fa-cog',
        bind: {
            html: '<h1>Under Development</h1>'
        }
    }]
});
