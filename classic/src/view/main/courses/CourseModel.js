/**
 * Created by n.vasileiadis on 7/29/2017.
 */

Ext.define('EW20.view.Courses.CourseModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.courseModel',
    stores: {
        courses: {
            type: 'courses'
        },
        courseActions: {
            type: 'courseActions'
        },
        gdp: {
            type: 'gdp'
        }

    },
    data: {
        readOnly: false,
        recs: null,
        list: null,
        filterText: '',
        nestedList: null
        // date: '',
        // value: ''
    }
});