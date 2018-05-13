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
        courseRiskAnalysisSummary: {
            autoLoad: true,
            type: 'courseRiskAnalysisSummary'
        },
        courseCategories: {
            autoLoad: true,
            type: 'courseCategories'
        },
        courseActivities: {
            autoLoad: true,
            type: 'courseActivities'
        },        
        courseParameters: {
            autoLoad: true,
            type: 'courseParameters'
        }

    },

    data: {
        currentView: null,
        list: null,
        courseStatisticsData: null,
        courseContentsFileTypes: null,
        composeEmailStudentsData: [],
        // risk analysis
        riskAnalysisScorms: null,
        riskAnalysisUsers: null,
        riskAnalysisParameters: null,
        riskAnalysisUsersAnalysis: null,
        riskAnalysisResults: null,
        riskAnalysisResultsId: null,
        riskAnalysisResultsName: null,
        riskAnalysisResultsStatus: null,
        riskAnalysisResultChart: null,
        // risk form
        atBeginning: true,
        atEnd: false,
        atResultPage: false,
        // riskParameterA1: 11.803,
        // riskParameterB1: 13.385,
        riskParameterConstant1: -5.343,
        // riskParameterA2: -0.233,
        // riskParameterB2: 3.381,
        riskParameterConstant2: -0.788,
        courseActivityColumns: null
    }
});
