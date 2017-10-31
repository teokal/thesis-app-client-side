/**
 *  Created by n.vasileiadis on 31.10.17
 */

Ext.define('LearningAnalytics.view.about.AboutView', {
    extend: 'Ext.container.Container',
    xtype: 'about',

    bind: {
        html: '<h1>Learning Analytics</h1>' +
        '<h3>Development of a Web-based Application for the Analysis of e-Learning Data in Moodle Using Visualization Techniques.</h3>' +
        '<h4>Developed by: </h4>' +
        '<ul> ' +
        '<li>Kalatzis Theodoros</li>' +
        '<li>Vasileiadis Nikolaos</li> ' +
        '</ul>' +
        '<h4>Supervisor: </h4>' +
        '<ul> ' +
        '<li>Psaromiligkos Ioannis</li>' +
        '</ul>' +
        '<h4>Open Source (GPLv3) License</h4>'
    }

});
