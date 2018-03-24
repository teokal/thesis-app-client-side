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
        },
        courseRiskAnalysisResults: {
            autoLoad: true,
            type: 'courseRiskAnalysisResults'
        },
        riskAnalysisResultsStore: {
            autoLoad: true
            // id: '{riskAnalysisResultsId}',
            // name: '{riskAnalysisResultsName}',
            // status: '{riskAnalysisResultsStatus}',
            // type: 'riskAnalysisResults'
        }


    },

    data: {
        currentView: null,
        list: null,
        courseStatisticsData: null,
        courseContentsFileTypes: null,
        composeEmailStudentsData: [],
        riskAnalysisScorms: null,
        riskAnalysisUsers: null,
        riskAnalysisUsersAnalysis: null,
        riskAnalysisResults: null,
        riskAnalysisResultsId: null,
        riskAnalysisResultsName: null,
        riskAnalysisResultsStatus: null,
        // risk form
        atBeginning: true,
        atEnd: false,
        riskParameterA1: 11.803,
        riskParameterB1: 13.385,
        riskParameterC1: 5.343,
        riskParameterA2: -0.233,
        riskParameterB2: 3.381,
        riskParameterC2: 0.788
    }
});
