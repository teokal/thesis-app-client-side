/**
 *  Created by n.vasileiadis on 28.11.17
 */

Ext.define('LearningAnalytics.view.dashboard.DashboardController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.dashboard',

    requires: [
        'Ext.util.TaskRunner',
        'LearningAnalytics.config.Runtime',
        'Ext.window.Toast'
    ],

    onShow: function () {
        var viewModel = this.getViewModel();
        var store = viewModel.getStore('viewStudents');
        store.load({
            callback: function(records, operation, success) {
                if (success === true){
                    viewModel.setData({
                        recs: records,
                        enrolledusercount: records[0].data.enrolledusercount,
                        viewStudentsChart: store.first().viewed()

                    });
                }
            },
            scope: this
        });
    },

    onExpand: function(event, toolEl, panel) {
        // var chartPanel = this.lookupReference('chart');
        var viewChart = panel.getComponent('viewChartContainer').getComponent('viewChart');
        var filterContainer = panel.getComponent('filterContainer');


        panel.el.removeCls('big-33');
        LearningAnalytics.config.Runtime.setViewWidthHeight(panel, 1, 1.5);

        filterContainer.setHidden(false);
        // viewChart.axes[0].setHidden(false);
        // viewChart.axes[1].setHidden(false);


        panel.tools.expand.setHidden(true);
        panel.tools.collapse.setHidden(false);
        panel.tools.refresh.setHidden(false);
    },

    onCollapse: function(event, toolEl, panel) {
        // var chartPanel = this.lookupReference('chart');
        var viewChart = panel.getComponent('viewChartContainer').getComponent('viewChart');
        var filterContainer = panel.getComponent('filterContainer');

        LearningAnalytics.config.Runtime.setViewWidthHeight(panel, 0.6, 0.666666);

        filterContainer.setHidden(true);
        // viewChart.axes[0].setHidden(true);
        // viewChart.axes[1].setHidden(true);


        panel.tools.expand.setHidden(false);
        panel.tools.collapse.setHidden(true);
        panel.tools.refresh.setHidden(true);
    },

    onRefreshToggle: function(event, toolEl, panel) {
        var dateFrom = this.lookupReference('dateFrom');
        var dateTo = this.lookupReference('dateTo');
        var view = this.lookupReference('actionView');
        var actionQuery = this.lookupReference('actionsQuery');
        if (dateFrom.getSubmitValue() === "" || dateTo.getSubmitValue() === "" ) {
            Ext.toast({
                html: 'Please select dates',
                width: 200,
                align: 't'
            });
        } else {
            var viewModel = this.getViewModel();
            var store = viewModel.getStore('viewStudents');
            store.load({
                params: {
                    from_date: dateFrom.getSubmitValue(),
                    to_date: dateTo.getSubmitValue(),
                    view: view.getSubmitValue()
                },
                callback: function(records, operation, success) {
                    if (success === true){
                        viewModel.setData({
                            recs: records,
                            viewStudentsChart: store.first().viewed(),
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

    }


});

