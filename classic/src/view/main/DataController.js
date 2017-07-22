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
    onEdit: function (sender, selected) {
        var record = selected[0];
        // debugger;
        var form = this.lookupReference('coursesActionPanel');
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
                course: record.id
            },

            success: function(response, opts) {
                // debugger;
                var obj = Ext.decode(response.responseText);
                // Extract keys and values for the first element
                console.dir(Object.keys(obj.response.data)[0]);
                console.dir(Object.values(obj.response.data)[0]);

                console.dir(obj);
                form.expand(false);
            },

            failure: function(response, opts) {
                console.log('server-side failure with status code ' + response.status);
            }

        });

        // Ext.toast({
        //     html: 'Data Saved',
        //     width: 200,
        //     align: 't'
        // });


    }




});