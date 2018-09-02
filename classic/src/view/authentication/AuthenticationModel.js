/**
 *  Created by n.vasileiadis on 04.11.17
 */

Ext.define('LearningAnalytics.view.AuthenticationModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.authentication',

    data: {
        userid : '',
        fullName : '',
        password : '',
        email    : '',
        persist: false,
        agrees : false
    }
});