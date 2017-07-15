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
        var proxy = new Ext.data.proxy.Ajax({
            useDefaultXhrHeader: false,
            url: Thesis.Manager.GlobalVar.urlData + '/api/1/user/courses/logs',

            headers: {
                'Authorization': 'Token token=' + Thesis.Manager.GlobalVar.token
            },

            extraParams: {
                from_date: '10-01-2015',
                to_date: 'now-1y',
                query:'view',
                view: 'day',
                course: 5
            }

        });

        var operation = proxy.createOperation('read', {});
        proxy.read(operation);
        debugger;

        Ext.toast({
            html: 'Data Saved',
            // title: 'My Title',
            width: 200,
            align: 't'
        });

    }




});