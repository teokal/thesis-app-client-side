Ext.define('LearningAnalytics.view.main.MainModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.main',

    stores: {
        courses: {
            type: 'courses'
        },
        navigationTree: {
            type: 'navigationTree'
        },
        courseEnrolledStudents: {
            type: 'courseEnrolledStudents',
            autoLoad: true
        },
        courseStatistics: {
            type: 'courseStatistics',
            autoLoad: true
        }


    },

    data: {
        currentView: null,
        list: null,
        courseStatisticsData: null
    }
});
