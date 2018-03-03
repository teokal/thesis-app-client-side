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
        },
        courseContents: {
            type: 'courseContents',
            autoLoad: true
        },
        riskAnalysis: {
            autoLoad: true,
            type: 'courseRiskAnalysis'
        }


    },

    data: {
        currentView: null,
        list: null,
        courseStatisticsData: null,
        courseContentsFileTypes: null,
        composeEmailStudentsData: []
    }
});
