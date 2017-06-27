/**
 * Created by n.vasileiadis on 6/21/2017.
 */

Ext.define('EW20.view.testDataController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.contracts',


    onShow: function () {
        debugger;
        var viewModel = this.getViewModel();
        var store = viewModel.getStore('dataTests');
        store.load();
    }
});