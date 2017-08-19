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
        courseResources: {
            type: 'courseResources'
        },
        courseResourcesLists: {
            type: 'courseResourcesLists'
        }
    },

    data: {
        recs: null,
        list: null,
        recsResources: null,
        listResources: null,
        recsResourcesList: null,
        listResourcesList: null

    }
});