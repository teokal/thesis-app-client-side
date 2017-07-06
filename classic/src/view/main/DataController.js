/**
 * Created by n.vasileiadis on 6/27/2017.
 */
Ext.define('EW20.view.DataController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.dataController',
    //

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
        var viewModel = this.getViewModel();
        viewModel.getStore('dataTests').load();

        var proxy = new Ext.data.proxy.Ajax({
            url: 'http:\/\/83.212.105.139:3000/users'
        });

        var operation = proxy.createOperation('read', {
            start : 50,
            limit : 25
        });

        proxy.read(operation);
    }




});