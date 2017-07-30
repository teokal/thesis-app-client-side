/**
 * Created by n.vasileiadis on 7/29/2017.
 */
Ext.define('EW20.view.Courses.CourseController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.courseController',
    //

    requires: [
        'Thesis.Manager.GlobalVar'
    ],

    onShow: function () {
        // debugger;
        var viewModel = this.getViewModel();
        var store = viewModel.getStore('courses');
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

        var form = this.lookupReference('coursesActionPanel');
        // var chart = this.lookup('chart');

        var viewModel = this.getViewModel();
        var store = viewModel.getStore('courseActions');
        store.load({
            params: {
                from_date: 'now-1y',
                to_date: 'now',
                query:'view',
                view: 'day',
                course: record.id
            },
            callback: function(records, operation, success) {
                // do something after the load finishes
                // debugger;
                if (success == true){
                    form.expand(false);
                    viewModel.setData({
                        recs: records,
                        firstRec: records[0],
                        list: store
                    });
                }
            },
            scope: this

        });

        console.dir(store);
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
    },

    onAxisLabelRender: function (axis, label, layoutContext) {
        // Custom renderer overrides the native axis label renderer.
        // Since we don't want to do anything fancy with the value
        // ourselves except appending a '%' sign, but at the same time
        // don't want to loose the formatting done by the native renderer,
        // we let the native renderer process the value first.
        var value = layoutContext.renderer(label);
        return value;
    },

    onPreview: function () {
        var chart = this.lookupReference('chart');
        chart.preview();
    },

    getSeriesConfig: function (field, title) {
        return {
            type: 'area',
            title: title,
            xField: 'date',
            yField: field,
            style: {
                opacity: 0.60
            },
            marker: {
                opacity: 0,
                scaling: 0.01,
                fx: {
                    duration: 200,
                    easing: 'easeOut'
                }
            },
            highlightCfg: {
                opacity: 1,
                scaling: 1.5
            },
            tooltip: {
                trackMouse: true,
                renderer: function (tooltip, record, item) {
                    tooltip.setHtml(title + ' (' + record.get('date') + '): ' + record.get(field));
                }
            }
        };
    },

    onAfterRender: function () {
        var me = this,
            chart = me.lookupReference('chart');

        chart.setSeries([
            me.getSeriesConfig('value', 'VALUE')
        ]);
    },


    onReloadData: function() {
        // debugger;
        var dateFrom = this.lookupReference('dateFrom');
        var date_From = dateFrom.getSubmitValue();
        var dateTo = this.lookupReference('dateTo');
        var date_To = dateTo.getSubmitValue();



        var viewModel = this.getViewModel();
        var store = viewModel.getStore('courseActions');
        store.load({
            params: {
                from_date: date_From,
                to_date: date_To,
                query:'view',
                view: 'day',
                course: 57
            },
            callback: function(records, operation, success) {
                // do something after the load finishes
                // debugger;
                if (success == true){
                    // form.expand(false);
                    viewModel.setData({
                        recs: records,
                        firstRec: records[0],
                        list: store
                    });
                } else {
                    Ext.toast({
                        html: 'Failure.!!',
                        width: 200,
                        align: 't'
                    });

                }
            },
            scope: this

        });

    },

    onDownload: function() {
        if (Ext.isIE8) {
            Ext.Msg.alert('Unsupported Operation', 'This operation requires a newer version of Internet Explorer.');
            return;
        }
        var chart = this.lookupReference('chart');
        if (Ext.os.is.Desktop) {
            chart.download({
                filename: 'Logout Values'
            });
        } else {
            chart.preview();
        }
    },


});