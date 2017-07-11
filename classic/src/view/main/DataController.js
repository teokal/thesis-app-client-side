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
        // debugger;
        var viewModel = this.getViewModel();
        // viewModel.getStore('dataTests').load();

        var proxy = new Ext.data.proxy.Ajax({
            actionMethods: {
                read: 'GET'
            },
            useDefaultXhrHeader: false,
            cors: true,
            url: Thesis.Manager.GlobalVar.urlData+'/api/1/user/courses/logs?from_date=10-01-2015&to_date=now-1y&query=view&view=day&course=5',

            // method: 'GET',
            headers: { 'Authorization': 'Toten token=tyPmHwzjeRfCkCSr47xgDv-VMTr9Fg',
                'Access-Control-Allow-Origin' : '*'
            }
        });

        var operation = proxy.createOperation('read', {
            start : 50,
            limit : 25
        });

        proxy.read(operation);
        // proxy.read();

        var form = this.lookupReference('typeForm');
        form.expand(false);
    }




});