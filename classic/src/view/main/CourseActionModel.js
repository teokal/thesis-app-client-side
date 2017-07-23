/**
 * Created by n.vasileiadis on 7/23/2017.
 */
Ext.define('EW20.view.CourseActionModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.courseActionModel',

    stores: {
        dataTests: {
            type: 'dataTests'
        }
    },
    data: {
        rec: null
    }
});