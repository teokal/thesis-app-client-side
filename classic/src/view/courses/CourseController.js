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
        // var viewModel = this.getViewModel();
        // var store = viewModel.getStore('courseEnrolledStudents');
        // store.load({
        //     callback: function(records, operation, success) {
        //         if (success == true){
        //             debugger;
        //             // viewModel.setData({
        //             //     recs: records,
        //             //     enrolledusercount: records[0].data.enrolledusercount,
        //             //     viewStudentsChart: store.first().viewed()
        //             //
        //             // });
        //         }
        //     },
        //     scope: this
        // });
    }
});
