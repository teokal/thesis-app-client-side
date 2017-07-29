/**
 * Created by n.vasileiadis on 7/23/2017.
 */
Ext.define('Thesis.Manager.view.main.TestExample.CourseActionModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.courseActionModel',

    stores: {
        courseActions: {
            type: 'courseActions'
        }

    },
    data: {
        rec: null
    }
});