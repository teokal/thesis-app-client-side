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
        selectedId = record;

        var form = this.lookupReference('coursesActionPanel');
        var date = new Date() ;
        date.setFullYear( date.getFullYear() - 1 );

        // Actions
        var dateFrom = this.lookupReference('dateFrom');
        dateFrom.setValue(date.toISOString().substr(0,10));
        var dateTo = this.lookupReference('dateTo');
        dateTo.setValue(new Date().toISOString().substr(0,10));
        var view = this.lookupReference('actionView');
        view.setValue('day');
        var actionQuery = this.lookupReference('actionsQuery');
        actionQuery.setValue('all');

        // Resources
        var dateFromResources = this.lookupReference('dateFromResources');
        dateFromResources.setValue(date.toISOString().substr(0,10));
        var dateToResources = this.lookupReference('dateToResources');
        dateToResources.setValue(new Date().toISOString().substr(0,10));

        var resourceQuery = this.lookupReference('resourceQuery');

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
                if (success == true){
                    form.expand(false);
                    viewModel.setData({
                        recs: records,
                        list: store
                    });
                }
            },
            scope: this

        });

        var storeResources = viewModel.getStore('courseResources');
        storeResources.load({
            params: {
                from_date: 'now-1y',
                to_date: 'now',
                query:'view',
                view: 'day',
                course: record.id,
                resource: -1
            },
            callback: function(records, operation, success) {
                // do something after the load finishes
                if (success == true){
                    form.expand(false);
                    viewModel.setData({
                        recsResources: records,
                        listResources: storeResources
                    });
                }
            },
            scope: this

        });

        var storeResourcesLists = viewModel.getStore('courseResourcesLists');
        storeResourcesLists.load({
            params: {
                from_date: 'now-1y',
                to_date: 'now',
                query:'view',
                view: 'day',
                course: record.id
            },
            callback: function(records, operation, success) {
                // do something after the load finishes
                if (success == true){
                    form.expand(false);
                    viewModel.setData({
                        recsResourcesLists: records,
                        listResourcesLists: storeResourcesLists
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
        var chartResource = this.lookupReference('chartResource');
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
            chart = me.lookupReference('chart'),
            chartResource = me.lookupReference('chartResource');

        chart.setSeries([
            me.getSeriesConfig('quiz', 'QUIZ'),
            me.getSeriesConfig('enrol', 'ENROL'),
            me.getSeriesConfig('view', 'VIEW'),
            me.getSeriesConfig('unenrol', 'UNENROL')
        ]);

        chartResource.setSeries([
            me.getSeriesConfig('view', 'VIEW')
        ]);

    },


    onReloadData: function() {
        //Actions
        var dateFrom = this.lookupReference('dateFrom');
        var dateTo = this.lookupReference('dateTo');
        var view = this.lookupReference('actionView');
        var actionQuery = this.lookupReference('actionsQuery');

        //Resources
        var dateFromResources = this.lookupReference('dateFromResources');
        var dateToResources = this.lookupReference('dateToResources');
        var viewResources = this.lookupReference('actionViewResources');
        var resourceQuery = this.lookupReference('resourceQuery');


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
                    if (success == true){
                        // form.expand(false);
                        viewModel.setData({
                            recs: records,
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

            var storeResources = viewModel.getStore('courseResources');
            storeResources.load({
                params: {
                    from_date: dateFromResources.getSubmitValue(),
                    to_date: dateToResources.getSubmitValue(),
                    query: 'view',
                    view: viewResources.getSubmitValue(),
                    course: selectedId.id,
                    resource: resourceQuery.getSubmitValue()
                },
                callback: function(records, operation, success) {
                    if (success == true){
                        viewModel.setData({
                            recsResources: records,
                            listResources: storeResources
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
        var chartResource = this.lookupReference('chartResource');
        Ext.Msg.show({
            title:'Download',
            msg:'Choose the chart you want to download on .png format',
            buttons:Ext.Msg.YESNO,
            buttonText:{
                yes: "Actions Chart",
                no: "Resources Chart"
            },
            callback:function(btn) {
                if('yes' === btn) {
                    if (Ext.os.is.Desktop) {
                        chart.download({
                            filename: 'Actions'
                        });
                    } else {
                        chart.preview();
                    }
                }else if('no' === btn){
                    if (Ext.os.is.Desktop) {
                        chartResource.download({
                            filename: 'Resources'
                        });
                    } else {
                        chartResource.preview();
                    }
                }
            }
        });
    },

    onZoomUndo: function() {
        var chart = this.lookupReference('chart'),
            interaction = chart && Ext.ComponentQuery.query('interaction', chart)[0],
            undoButton = interaction && interaction.getUndoButton(),
            handler = undoButton && undoButton.handler;

        var chartResources = this.lookupReference('chartResource'),
            interaction = chartResources && Ext.ComponentQuery.query('interaction', chartResources)[0],
            undoButton = interaction && interaction.getUndoButton(),
            handlerResources = undoButton && undoButton.handler;

        if (handler) {
            handler();
        }
        if (handlerResources) {
            handlerResources();
        }
    }

});