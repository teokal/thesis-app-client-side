/**
 *  Created by n.vasileiadis on 04.11.17
 */
Ext.define('LearningAnalytics.view.authentication.AuthenticationController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.authentication',

    requires: [
        'LearningAnalytics.config.Runtime'
    ],

    onLoginButton: function() {
        var preparedData = {};
        preparedData.userid = this.lookupReference('userid').getSubmitValue();
        preparedData.password = this.lookupReference('password').getSubmitValue();
        Ext.Ajax.request({
            url: '/api/1/sign_in',
            method: 'POST',
            // type: 'json',
            jsonData: {
                'username' : preparedData.userid,
                'password' : preparedData.password
            },
            callback:function(records, operation, success){
                var jsonData = Ext.util.JSON.decode(success.responseText);
                var statusMessage = jsonData.response.status;

                if(statusMessage === 'success'){
                    // me.onShowNavigationTree();
                    Ext.util.Cookies.set('AccessToken', jsonData.response.user.access_token);
                    // me.redirectTo('dashboard', true);
                    Ext.create('LearningAnalytics.view.main.Main');
                } else {
                    Ext.Msg.alert(jsonData.response.data);
                    // me.redirectTo('dashboard', true);
                }
            }
        });
    }

    // onShowNavigationTree: function () {
    //     debugger;
    //     var viewModel = this.getViewModel();
    //     var store = viewModel.getStore('courses');
    //     var coursesTree = this.lookupReference('navigationTreeList').rootItem.getNode().getChildAt(1);
    //
    //     store.load({
    //         callback: function(records, operation, success) {
    //             store.each(function(record) {
    //                 var jsonObj = {
    //                     id: record.data.id,
    //                     text: record.data.fullname,
    //                     iconCls: 'x-fa fa-book',
    //                     viewType: 'courses',
    //                     leaf: true
    //                 };
    //                 coursesTree.appendChild(jsonObj);
    //             });
    //         },
    //         scope: this
    //
    //     });
    //
    // }

});