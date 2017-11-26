/**
 *  Created by n.vasileiadis on 31.10.17
 */

Ext.define('LearningAnalytics.view.courses.CourseController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.courseController',

    requires: [
        'Ext.util.TaskRunner'
    ],

    onShow: function () {

    },

    onExpand: function(event, toolEl, panel) {
        debugger;
        var me = this;
        var chartPanel = me.view;
        var viewChart = me.lookupReference('viewCourseStatisticsChart');
        var filterContainer = me.lookupReference('filterContainerCourseLog');

        chartPanel.el.removeCls('big-60');

        var chartWidth = LearningAnalytics.config.Runtime.getContainerViewWidth();
        var chartHeight = chartPanel.getHeight();
        chartPanel.animate({dynamic: true, to: {
            width: chartWidth - 40,
            height: chartHeight * 1.5
        }
        });

        filterContainer.setHidden(false);
        viewChart.axes[0].setHidden(false);
        viewChart.axes[1].setHidden(false);

        panel.tools.expand.setHidden(true);
        panel.tools.collapse.setHidden(false);
        panel.tools.refresh.setHidden(false);
    },

    onCollapse: function(event, toolEl, panel) {
        var me = this;
        var chartPanel = me.view;
        var viewChart = me.lookupReference('viewCourseStatisticsChart');
        var filterContainer = me.lookupReference('filterContainerCourseLog');

        var chartWidth = LearningAnalytics.config.Runtime.getContainerViewWidth();
        var chartHeight = chartPanel.getHeight();
        chartPanel.animate({dynamic: true, to: {
            width: chartWidth / 3,
            height: chartHeight / 1.5
        }
        });


        filterContainer.setHidden(true);
        viewChart.axes[0].setHidden(true);
        viewChart.axes[1].setHidden(true);

        panel.tools.expand.setHidden(false);
        panel.tools.collapse.setHidden(true);
        panel.tools.refresh.setHidden(true);
    },

    onRefreshToggle: function(event, toolEl, panel) {
        debugger;
        //Actions
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
            // Ext.toast('Please select dates!', 5000);
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
        }

    }

});
