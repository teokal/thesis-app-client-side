Ext.define('LearningAnalytics.view.dashboard.DashboardController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.dashboard',

    requires: [
        'Ext.util.TaskRunner',
        'LearningAnalytics.config.Runtime'
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
        debugger;
        var chartPanel = this.lookupReference('chart');
        var viewChart = chartPanel.getComponent('viewChartContainer').getComponent('viewChart');
        var filterContainer = chartPanel.getComponent('filterContainer');

        chartPanel.el.removeCls('big-33');

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
    },

    onCollapse: function(event, toolEl, panel) {
        var chartPanel = this.lookupReference('chart');
        var viewChart = chartPanel.getComponent('viewChartContainer').getComponent('viewChart');
        var filterContainer = chartPanel.getComponent('filterContainer');

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
    }

});
