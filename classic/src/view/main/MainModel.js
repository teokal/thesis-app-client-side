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
            autoLoad: false
        },
        courseContents: {
            type: 'courseContents',
            autoLoad: false
        },
        courseCategoriesGraph: {
            type: 'courseCategoriesGraph',
            autoLoad: true
        },
        riskAnalysis: {
            autoLoad: false,
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
        courseCategoriesStore: null,
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
        riskParameterConstant1: -5.343,
        riskParameterConstant2: -0.788,
        courseActivityColumns: null
    }
});
