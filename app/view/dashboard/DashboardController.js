Ext.define('LearningAnalytics.view.dashboard.DashboardController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.dashboard',

    requires: [
        'Ext.util.TaskRunner'
    ],

    onShow: function () {
        var viewModel = this.getViewModel();
        var store = viewModel.getStore('viewStudents');
        store.load({
            callback: function(records, operation, success) {
                if (success == true){
                    viewModel.setData({
                        recs: records,
                        enrolledusercount: records[0].data.enrolledusercount,
                        viewStudentsChart: store.first().viewed()

                    });
                }
            },
            scope: this
        });
    }
});
