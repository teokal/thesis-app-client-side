/**
 *  Created by n.vasileiadis on 04.11.17
 */
Ext.define('LearningAnalytics.view.authentication.AuthenticationController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.authentication',

    requires: [
        'LearningAnalytics.config.Runtime',
        'LearningAnalytics.view.main.MainController'
    ],

    onLoginButton: function() {
        var me = this;
        var preparedData = {};
        preparedData.userid = this.lookupReference('userid').getSubmitValue();
        preparedData.password = this.lookupReference('password').getSubmitValue();
        // debugger;
        // var test = LearningAnalytics.config.Runtime.getToken();
        // LearningAnalytics.config.Runtime.setToken('asdad');
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
                    // jsonData.response.user.access_token;
                    LearningAnalytics.config.Runtime.setToken(jsonData.response.user.access_token);
                    debugger;
                    me.onShowNavigationTree();
                    me.redirectTo('dashboard', true);
                } else {
                    Ext.Msg.alert(jsonData.response.data);
                    // me.redirectTo('dashboard', true);
                }
            }
        });
    },

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