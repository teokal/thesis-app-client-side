/**
 * Created by n.vasileiadis on 6/27/2017.
 */
Ext.define('Thesis.Manager.view.main.TestExample.DataController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.dataController',
    //

    requires: [
        'Thesis.Manager.GlobalVar'
    ],

    onShow: function () {
        // debugger;
        var viewModel = this.getViewModel();
        var store = viewModel.getStore('dataTests');
        store.load({
            params: {
                group: 3,
                type: 'user',
                from_date: '10-01-2015'
            },
            callback: function(records, operation, success) {
                // do something after the load finishes
                // debugger;
            },
            scope: this

        });
    },

    /**
     *
     * @param record
     */
    onEdit: function (sender, selected) {
        var record = selected[0];
        // debugger;
        var form = this.lookupReference('coursesActionPanel');
        // var store = Ext.Ajax.request({
        //     useDefaultXhrHeader: false,
        //     url: Thesis.Manager.GlobalVar.urlData + '/api/1/user/courses/logs',
        //     method: 'GET',
        //     headers: {
        //         'Authorization': 'Token token=' + Thesis.Manager.GlobalVar.token
        //     },
        //     model: 'Thesis.Manager.model.CourseActions',
        //
        //     viewModel: {
        //         type: 'courseActionModel'
        //     },
        //
        //     params: {
        //         from_date: '10-01-2015',
        //         to_date: 'now-1y',
        //         query:'view',
        //         view: 'day',
        //         course: record.id
        //     },
        //
        //     success: function(response, opts) {
        //         // debugger;
        //         var obj = Ext.decode(response.responseText);
        //         // Extract keys and values for the first element
        //         console.dir(Object.keys(obj.response.data));
        //         console.dir(Object.values(obj.response.data));
        //
        //         console.dir(obj);
        //         form.expand(false);
        //     },
        //
        //     failure: function(response, opts) {
        //         console.log('server-side failure with status code ' + response.status);
        //     }
        //
        // });
        // console.dir("TEST");

        // store.load();

        var viewModel = this.getViewModel();
        var store = viewModel.getStore('courseActions');
        store.load({
            params: {
                from_date: '10-01-2015',
                to_date: 'now-1y',
                query:'view',
                view: 'day',
                course: record.id
            },
            callback: function(records, operation, success) {
                // do something after the load finishes
                debugger;
                if (success == true){
                    form.expand(false);
                    viewModel.setData({
                        recs: records,
                        firstRec: records[0],
                        list: store
                    });
                }
            },
            // rec: records,
            scope: this

        });

        console.dir(store);
        // Ext.toast({
        //     html: 'Data Saved',
        //     width: 200,
        //     align: 't'
        // });


    },

    filterChanged: function(sender) {
        var viewModel = this.getViewModel();
        viewModel.data.filterText = sender.getValue();
        this.filter();
    },

    filter: function() {
        var viewModel = this.getViewModel();
        var filterText = viewModel.data.filterText;
        viewModel.data.list.clearFilter();
        viewModel.data.list.filterBy(function(record){
            if (filterText == '') {
                return true;
            }
            return record.get('value') == filterText;
        });
    },

    listCelChanged: function() {
        debugger;
        var viewModel = this.getViewModel();
        viewModel.setData({ nestedList: viewModel.data.list, readOnly: true });
    }



});