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
        // var viewModel = this.getViewModel();
        // viewModel.getStore('dataTests').load();

        var proxy = new Ext.data.proxy.Ajax({
            useDefaultXhrHeader: false,
            url: Thesis.Manager.GlobalVar.urlData + '/api/1/user/courses/logs?from_date=10-01-2015&to_date=now-1y&query=view&view=day&course=5',

            pageParam: 'pageNumber'
        });

        proxy.defaultHeaders = {
            'Authorization': 'Token token=tyPmHwzjeRfCkCSr47xgDv-VMTr9Fg'
        };
        //
        // var vara = 'test';
        var operation = proxy.createOperation('read', {
            // from_date: '10-01-2015',
            // to_date: 'now-1y',
            // query:'view',
            // view: 'day',
            // course: 5
            // pageParam: 'course'
        });

        proxy.read(operation);
        // proxy.read();

        // var form = this.lookupReference('typeForm');
        // form.expand(false);
    }




});