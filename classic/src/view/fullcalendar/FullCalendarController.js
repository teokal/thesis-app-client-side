Ext.define('LearningAnalytics.view.fullcalendar.FullCalendarController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.fullcalendar',

    requires: [
        'Ext.util.TaskRunner',
        'LearningAnalytics.config.Runtime',
        'Ext.window.Toast'
    ],

    onShow: function () {
        var viewModel = this.getViewModel();
        var store = viewModel.getStore('calendarEvents');
        store.load({
            callback: function (records, operation, success) {
                debugger;
                if (success === true) {
                    viewModel.setData({
                        events: records[0].data
                    });
                }
            },
            scope: this
        });
    }
});
