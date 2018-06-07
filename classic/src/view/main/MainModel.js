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
            autoLoad: false
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
        },
        courseModules: {
            autoLoad: false,
            type: 'courseModules'
        }

    },

    data: {
        enrolledStudentsList: null,
        courseStatisticsData: null,
        courseContentsFileTypes: null,
        composeEmailStudentsData: [],
        courseModulesId: [],
        // risk analysis
        riskAnalysisScorms: null,
        riskAnalysisUsers: null,
        riskAnalysisParameters: null,
        // risk form
        atBeginning: true,
        atEnd: false,
        atResultPage: false,
        riskParameterConstant1: -5.343,
        riskParameterConstant2: -0.788,
        courseActivityColumns: null
    }
});
