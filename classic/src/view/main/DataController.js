/**
 * Created by n.vasileiadis on 6/27/2017.
 */
Ext.define('EW20.view.DataController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.dataController',
    //

    requires: [
        'Thesis.Manager.GlobalVar'
    ],

    onShow: function () {
        debugger;
        var viewModel = this.getViewModel();
        var store = viewModel.getStore('dataTests');
        store.load();
    },

    /**
     *
     * @param record
     */
    onEdit: function (sender, record) {

        debugger;
        Ext.Ajax.request({
            useDefaultXhrHeader: false,
            url: Thesis.Manager.GlobalVar.urlData + '/api/1/user/courses/logs',
            method: 'GET',
            headers: {
                'Authorization': 'Token token=' + Thesis.Manager.GlobalVar.token
            },

            params: {
                from_date: '10-01-2015',
                to_date: 'now-1y',
                query:'view',
                view: 'day',
                course: 1
            },

            success: function(response, opts) {
                var obj = Ext.decode(response.responseText);
                // Extract keys and values for the first element
                Object.keys(obj.response.data)[0];
                Object.values(obj.response.data)[0];

                console.dir(obj);
            },

            failure: function(response, opts) {
                console.log('server-side failure with status code ' + response.status);
            }

        });

        Ext.toast({
            html: 'Data Saved',
            width: 200,
            align: 't'
        });

    }




});