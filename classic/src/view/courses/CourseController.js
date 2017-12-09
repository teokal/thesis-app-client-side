/**
 *  Created by n.vasileiadis on 31.10.17
 */

Ext.define('LearningAnalytics.view.courses.CourseController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.courseController',

    requires: [
        'Ext.util.TaskRunner',
        'Ext.window.Toast'
    ],

    onShow: function () {

    },

    onExpand: function(event, toolEl, panel) {
        var me = this;
        var chartPanel = me.view;
        var viewChart = me.lookupReference('viewCourseStatisticsChart');
        var filterContainer = me.lookupReference('filterContainerCourseLog');

        LearningAnalytics.config.Runtime.setViewWidthHeight(chartPanel, 1, 1.5);

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

        LearningAnalytics.config.Runtime.setViewWidthHeight(chartPanel, 0.6, 0.666666);

        filterContainer.setHidden(true);
        viewChart.axes[0].setHidden(true);
        viewChart.axes[1].setHidden(true);

        panel.tools.expand.setHidden(false);
        panel.tools.collapse.setHidden(true);
        panel.tools.refresh.setHidden(true);
    },

    onRefreshToggle: function(event, toolEl, panel) {
        var dateFrom = this.lookupReference('dateFrom');
        var dateTo = this.lookupReference('dateTo');
        var view = this.lookupReference('actionView');
        var actionQuery = this.lookupReference('actionsQuery');

        Ext.toast({
            html: 'Please select dates',
            width: 200,
            align: 't'
        });

        // if (dateFrom.getSubmitValue() === "" || dateTo.getSubmitValue() === "" ) {
        //     Ext.toast({
        //         html: 'Please select dates',
        //         width: 200,
        //         align: 't'
        //     });
        // } else {
        //     var viewModel = this.getViewModel();
        //     var store = viewModel.getStore('viewStudents');
        //     store.load({
        //         params: {
        //             from_date: dateFrom.getSubmitValue(),
        //             to_date: dateTo.getSubmitValue(),
        //             view: view.getSubmitValue()
        //         },
        //         callback: function(records, operation, success) {
        //             // do something after the load finishes
        //             if (success == true){
        //                 // form.expand(false);
        //                 viewModel.setData({
        //                     recs: records,
        //                     list: store
        //                 });
        //             } else {
        //                 Ext.toast({
        //                     html: 'Failure.!!',
        //                     width: 200,
        //                     align: 't'
        //                 });
        //
        //             }
        //         },
        //         scope: this
        //     });
        // }

    }

});
