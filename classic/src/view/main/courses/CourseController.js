/**
 * Created by n.vasileiadis on 7/29/2017.
 */
Ext.define('EW20.view.Courses.CourseController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.courseController',
    //

    selectedId: 0,
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
        // debugger;
        var record = selected[0];
        selectedId = record;

        var form = this.lookupReference('coursesActionPanel');
        var date = new Date() ;
        date.setFullYear( date.getFullYear() - 1 );
        var dateFrom = this.lookupReference('dateFrom');
        dateFrom.setValue(date.toISOString().substr(0,10));
        var dateTo = this.lookupReference('dateTo');
        dateTo.setValue(new Date().toISOString().substr(0,10));
        var view = this.lookupReference('actionView');
        view.setValue('day');
        var actionQuery = this.lookupReference('actionsQuery');
        actionQuery.setValue('all');

        var viewModel = this.getViewModel();
        var store = viewModel.getStore('courseActions');
        store.load({
            params: {
                from_date: 'now-1y',
                to_date: 'now',
                query:'all',
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

    },

    onAxisLabelRender: function (axis, label, layoutContext) {
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
            me.getSeriesConfig('login', 'LOGIN'),
            me.getSeriesConfig('logout', 'LOGOUT'),
            me.getSeriesConfig('view', 'VIEW')

        ]);
    },


    onReloadData: function() {
        debugger;
        var dateFrom = this.lookupReference('dateFrom');
        var dateTo = this.lookupReference('dateTo');
        var view = this.lookupReference('actionView');
        var actionQuery = this.lookupReference('actionsQuery');

        if (dateFrom.getSubmitValue() == "" || dateTo.getSubmitValue() == "" ) {
            Ext.toast({
                html: 'Please select dates',
                width: 200,
                align: 't'
            });
        } else {

        var viewModel = this.getViewModel();
        var store = viewModel.getStore('courseActions');
        store.load({
            params: {
                from_date: dateFrom.getSubmitValue(),
                to_date: dateTo.getSubmitValue(),
                query: actionQuery.getSubmitValue(),
                view: view.getSubmitValue(),
                course: selectedId.id
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
        }
    },

    onDownload: function() {
        if (Ext.isIE8) {
            Ext.Msg.alert('Unsupported Operation', 'This operation requires a newer version of Internet Explorer.');
            return;
        }
        var chart = this.lookupReference('chart');
        if (Ext.os.is.Desktop) {
            chart.download({
                filename: 'Action Values'
            });
        } else {
            chart.preview();
        }
    },

    onZoomUndo: function() {
        var chart = this.lookupReference('chart'),
            interaction = chart && Ext.ComponentQuery.query('interaction', chart)[0],
            undoButton = interaction && interaction.getUndoButton(),
            handler = undoButton && undoButton.handler;
        if (handler) {
            handler();
        }
    }

});